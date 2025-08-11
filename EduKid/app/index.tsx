
import { Text, View, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useEffect } from 'react';
import Button from '../components/Button';
import { commonStyles, colors } from '../styles/commonStyles';
import TopicCard from '../components/TopicCard';
import { topics } from '../data/topics';
import Icon from '../components/Icon';

export default function MainScreen() {
  useEffect(() => {
    console.log('MainScreen mounted');
  }, []);

  return (
    <View style={[commonStyles.container, { paddingHorizontal: 16 }]}>
      <ScrollView contentContainerStyle={{ paddingVertical: 24, alignItems: 'center', width: '100%', gap: 12 }}>
        <Image
          source={require('../assets/images/final_quest_240x240.png')}
          style={{ width: 160, height: 160, marginBottom: 8 }}
          resizeMode="contain"
        />
        <Text style={commonStyles.title}>Math Quest Kids</Text>
        <Text style={commonStyles.subtitle}>Learn and play with colorful mini-games!</Text>

        <View style={{ width: '100%', maxWidth: 800, gap: 12 }}>
          {topics.map((t) => (
            <TopicCard
              key={t.id}
              topic={t}
              onPress={() => router.push(`/topic/${t.id}`)}
            />
          ))}
        </View>

        <View style={{ width: '100%', maxWidth: 800, marginTop: 16 }}>
          <Button
            text="View Badges and Progress"
            onPress={() => router.push('/progress')}
            style={{ backgroundColor: colors.accentGreen }}
          />
        </View>

        <View style={{ marginTop: 12, alignItems: 'center', gap: 6 }}>
          <Icon name="happy-outline" size={28} />
          <Text style={[commonStyles.text, { maxWidth: 700 }]}>
            Choose a topic to start. Earn badges as you complete levels!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
