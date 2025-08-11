
import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { topics } from '../../../data/topics';
import { commonStyles, colors, typography } from '../../../styles/commonStyles';
import { useProgress } from '../../../hooks/useProgress';

export default function TopicLevels() {
  const { topic } = useLocalSearchParams<{ topic: string }>();
  const t = topics.find((x) => x.id === topic);
  const { progress } = useProgress();
  const highest = t ? (progress[t.id]?.highestLevel || 0) : 0;

  if (!t) {
    return (
      <View style={[commonStyles.container, { padding: 16 }]}>
        <Text style={commonStyles.title}>Topic not found</Text>
      </View>
    );
  }

  return (
    <View style={[commonStyles.container, { paddingHorizontal: 16 }]}>
      <ScrollView contentContainerStyle={{ paddingVertical: 24, alignItems: 'center', width: '100%' }}>
        <Text style={commonStyles.title}>{t.title} Levels</Text>
        <Text style={commonStyles.subtitle}>Choose a level to play (1 - 500)</Text>
        <View style={styles.grid}>
          {Array.from({ length: 500 }).map((_, i) => {
            const level = i + 1;
            const unlocked = level <= highest + 1 || highest >= 500;
            const completed = level <= highest;
            return (
              <TouchableOpacity
                key={level}
                style={[
                  styles.levelButton,
                  completed && styles.levelCompleted,
                  unlocked && !completed && styles.levelUnlocked,
                  !unlocked && styles.levelLocked,
                ]}
                onPress={() => unlocked && router.push(`/topic/${t.id}/play?level=${level}`)}
                activeOpacity={0.8}
              >
                <Text style={styles.levelText}>{level}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{ width: '100%', maxWidth: 900, marginTop: 16 }}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={[styles.backButton]}
            activeOpacity={0.8}
          >
            <Text style={[styles.backText]}>Back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 900,
    marginTop: 16,
  },
  levelButton: {
    width: 54,
    height: 54,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 6px rgba(0,0,0,0.10)',
    borderWidth: 1,
    borderColor: colors.cardBorder,
    backgroundColor: colors.card,
  },
  levelText: {
    fontSize: 16,
    color: colors.text,
    ...typography.text,
  },
  levelCompleted: {
    backgroundColor: colors.pastelGreen,
    borderColor: colors.accentGreen,
  },
  levelUnlocked: {
    backgroundColor: colors.pastelYellow,
    borderColor: colors.accentYellow,
  },
  levelLocked: {
    backgroundColor: '#F1F1F1',
    borderColor: '#E0E0E0',
  },
  backButton: {
    backgroundColor: colors.accentBlue,
    padding: 14,
    borderRadius: 10,
    boxShadow: '0px 2px 6px rgba(0,0,0,0.12)',
    alignItems: 'center',
  },
  backText: {
    color: colors.white,
    fontSize: 16,
    ...typography.button,
  },
});
