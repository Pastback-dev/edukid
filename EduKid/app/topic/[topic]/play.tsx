
import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { topics } from '../../../data/topics';
import { commonStyles, colors, typography } from '../../../styles/commonStyles';
import { useEffect, useMemo, useRef, useState } from 'react';
import { generateQuestion } from '../../../data/levels';
import { useProgress } from '../../../hooks/useProgress';
import * as Haptics from 'expo-haptics';
import GameOptionButton from '../../../components/GameOptionButton';

export default function PlayScreen() {
  const { topic, level } = useLocalSearchParams<{ topic: string, level?: string }>();
  const t = topics.find((x) => x.id === topic);
  const parsedLevel = Math.max(1, Math.min(500, Number(level) || 1));
  const { markLevelCompleted, progress } = useProgress();

  const [currentLevel, setCurrentLevel] = useState(parsedLevel);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const q = useMemo(() => {
    if (!t) return null;
    return generateQuestion(t.id, currentLevel);
  }, [t, currentLevel]);

  useEffect(() => {
    console.log('PlayScreen mounted for topic', topic, 'level', currentLevel);
  }, []);

  if (!t || !q) {
    return (
      <View style={[commonStyles.container, { padding: 16 }]}>
        <Text style={commonStyles.title}>Something went wrong</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.navButton} activeOpacity={0.85}>
          <Text style={styles.navButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const onSelectOption = (index: number) => {
    if (feedback) return;
    const isCorrect = index === q.correctIndex;

    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.03, duration: 90, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();

    if (isCorrect) {
      setFeedback('correct');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setTimeout(() => {
        markLevelCompleted(t.id, currentLevel);
        const next = Math.min(currentLevel + 1, 500);
        setCurrentLevel(next);
        setFeedback(null);
      }, 700);
    } else {
      setFeedback('wrong');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      setTimeout(() => setFeedback(null), 700);
    }
  };

  const highest = progress[t.id]?.highestLevel || 0;

  return (
    <View style={[commonStyles.container, { padding: 16 }]}>
      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <Text style={styles.levelText}>{t.title}</Text>
          <Text style={styles.levelText}>Level {currentLevel}/500</Text>
        </View>

        <Text style={styles.questionText}>{q.question}</Text>

        <View style={styles.options}>
          {q.options.map((opt, i) => (
            <GameOptionButton
              key={i}
              text={String(opt)}
              onPress={() => onSelectOption(i)}
              variant={feedback && i === q.correctIndex ? 'correct' : feedback && i !== q.correctIndex ? 'wrong' : 'default'}
            />
          ))}
        </View>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
          <TouchableOpacity onPress={() => router.back()} style={[styles.navButton, { backgroundColor: colors.accentBlue }]} activeOpacity={0.85}>
            <Text style={styles.navButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCurrentLevel(Math.min(currentLevel + 1, 500))}
            style={[styles.navButton, { backgroundColor: colors.accentYellow }]}
            activeOpacity={0.85}
          >
            <Text style={styles.navButtonText}>Skip</Text>
          </TouchableOpacity>
        </View>

        <Text style={[commonStyles.text, { marginTop: 12 }]}>Best: Level {highest}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    maxWidth: 800,
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    boxShadow: '0px 6px 12px rgba(0,0,0,0.12)',
  },
  levelText: {
    fontSize: 16,
    color: colors.mutedText,
    ...typography.subtitle,
  },
  questionText: {
    fontSize: 28,
    color: colors.primary,
    textAlign: 'center',
    marginVertical: 12,
    ...typography.title,
  },
  options: {
    marginTop: 6,
    gap: 10,
  },
  navButton: {
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 6px rgba(0,0,0,0.12)',
  },
  navButtonText: {
    color: colors.white,
    fontSize: 16,
    ...typography.button,
  },
});
