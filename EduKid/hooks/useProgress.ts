
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ProgressState, TopicID } from '../types';
import { topics } from '../data/topics';
import { buildBadges } from '../data/badges';

const STORAGE_KEY = 'math_kids_progress_v1';

const defaultState: ProgressState = {
  addition: { highestLevel: 0, badges: [] },
  subtraction: { highestLevel: 0, badges: [] },
  multiplication: { highestLevel: 0, badges: [] },
  division: { highestLevel: 0, badges: [] },
};

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(defaultState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setProgress({ ...defaultState, ...JSON.parse(raw) });
        }
      } catch (e) {
        console.log('Failed to load progress', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const persist = useCallback(async (state: ProgressState) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.log('Failed to save progress', e);
    }
  }, []);

  const markLevelCompleted = useCallback((topic: TopicID, level: number) => {
    setProgress((prev) => {
      const current = prev[topic] || { highestLevel: 0, badges: [] };
      const highest = Math.max(current.highestLevel, level);
      const newBadges = new Set(current.badges);
      const tDef = topics.find((t) => t.id === topic);
      if (tDef) {
        const all = buildBadges(tDef.title);
        for (const b of all) {
          if (highest >= b.threshold) newBadges.add(b.id);
        }
      }
      const next = { ...prev, [topic]: { highestLevel: highest, badges: Array.from(newBadges) } };
      persist(next);
      return next;
    });
  }, [persist]);

  const resetAllProgress = useCallback(() => {
    setProgress(defaultState);
    persist(defaultState);
  }, [persist]);

  const badgesByTopic = useMemo(() => {
    const map: Record<TopicID, ReturnType<typeof buildBadges>> = {
      addition: [],
      subtraction: [],
      multiplication: [],
      division: [],
    } as any;
    for (const t of topics) {
      const earned = progress[t.id].badges;
      const all = buildBadges(t.title);
      map[t.id] = all.filter((b) => earned.includes(b.id));
    }
    return map;
  }, [progress]);

  return {
    loading,
    progress,
    badgesByTopic,
    markLevelCompleted,
    resetAllProgress,
  };
}
