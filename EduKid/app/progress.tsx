
import { View, Text, ScrollView } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { topics } from '../data/topics';
import BadgeCard from '../components/BadgeCard';
import Button from '../components/Button';
import { router } from 'expo-router';
import { useProgress } from '../hooks/useProgress';

export default function ProgressScreen() {
  const { badgesByTopic, progress, resetAllProgress } = useProgress();

  return (
    <View style={[commonStyles.container, { paddingHorizontal: 16 }]}>
      <ScrollView contentContainerStyle={{ paddingVertical: 24, alignItems: 'center', width: '100%', gap: 12 }}>
        <Text style={commonStyles.title}>Your Badges</Text>
        <Text style={commonStyles.subtitle}>Great job! Keep going to earn more.</Text>

        <View style={{ width: '100%', maxWidth: 900, gap: 16 }}>
          {topics.map((topic) => {
            const topicBadges = badgesByTopic[topic.id] || [];
            const completed = progress[topic.id]?.highestLevel || 0;
            return (
              <View key={topic.id} style={{ width: '100%', gap: 8 }}>
                <Text style={[commonStyles.subtitle, { textAlign: 'left' }]}>{topic.title} - Level {completed}/500</Text>
                <ScrollView horizontal contentContainerStyle={{ gap: 12, paddingBottom: 6 }}>
                  {topicBadges.length === 0 ? (
                    <Text style={commonStyles.text}>No badges yet. Play to earn some!</Text>
                  ) : topicBadges.map((b) => (
                    <BadgeCard key={`${topic.id}-${b.id}`} badge={b} />
                  ))}
                </ScrollView>
              </View>
            );
          })}
        </View>

        <View style={{ width: '100%', maxWidth: 900, marginTop: 16, gap: 12 }}>
          <Button text="Back to Home" onPress={() => router.back()} style={{ backgroundColor: colors.accentBlue }} />
          <Button text="Reset Progress" onPress={resetAllProgress} style={{ backgroundColor: colors.danger }} />
        </View>
      </ScrollView>
    </View>
  );
}
