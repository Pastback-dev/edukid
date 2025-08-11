
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Topic } from '../types';
import { colors, typography } from '../styles/commonStyles';
import Icon from './Icon';

interface Props {
  topic: Topic;
  onPress: () => void;
}

export default function TopicCard({ topic, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card]} activeOpacity={0.9}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <View style={[styles.iconWrap, { backgroundColor: topic.color }]}>
          <Icon name={topic.icon as any} size={32} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{topic.title}</Text>
          <Text style={styles.description}>{topic.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    padding: 14,
    boxShadow: '0px 4px 10px rgba(0,0,0,0.12)',
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 6px rgba(0,0,0,0.12)',
  },
  title: {
    fontSize: 20,
    color: colors.primary,
    ...typography.title,
  },
  description: {
    fontSize: 14,
    color: colors.mutedText,
    ...typography.text,
  },
});
