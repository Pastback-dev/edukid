
import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, ScrollView, Image } from 'react-native';
import { topics } from '../../../data/topics';
import { commonStyles, colors } from '../../../styles/commonStyles';
import Button from '../../../components/Button';
import { useProgress } from '../../../hooks/useProgress';

export default function TopicHome() {
  const { topic } = useLocalSearchParams<{ topic: string }>();
  const t = topics.find((x) => x.id === topic);
  const { progress } = useProgress();

  if (!t) {
    return (
      <View style={[commonStyles.container, { padding: 16 }]}>
        <Text style={commonStyles.title}>Topic not found</Text>
        <Button text="Back" onPress={() => router.back()} style={{ backgroundColor: colors.accentBlue }} />
      </View>
    );
  }

  const highest = progress[t.id]?.highestLevel || 0;
  const nextLevel = Math.min(highest + 1, 500);

  return (
    <View style={[commonStyles.container, { paddingHorizontal: 16 }]}>
      <ScrollView contentContainerStyle={{ paddingVertical: 24, alignItems: 'center', width: '100%', gap: 16 }}>
        <Image
          source={t.image}
          style={{ width: 140, height: 140 }}
          resizeMode="contain"
        />
        <Text style={commonStyles.title}>{t.title}</Text>
        <Text style={commonStyles.subtitle}>{t.description}</Text>

        <View style={{ width: '100%', maxWidth: 800, gap: 12 }}>
          <Button
            text={`Play Next Level (Level ${nextLevel})`}
            onPress={() => router.push(`/topic/${t.id}/play?level=${nextLevel}`)}
            style={{ backgroundColor: colors.accentGreen }}
          />
          <Button
            text="Choose Level"
            onPress={() => router.push(`/topic/${t.id}/levels`)}
            style={{ backgroundColor: colors.accentYellow }}
          />
          <Button
            text="Back to Home"
            onPress={() => router.push('/')}
            style={{ backgroundColor: colors.accentBlue }}
          />
        </View>

        <Text style={commonStyles.text}>Completed: {highest}/500 levels</Text>
      </ScrollView>
    </View>
  );
}
