
import { View, Text, StyleSheet } from 'react-native';
import { Badge } from '../types';
import { colors, typography } from '../styles/commonStyles';

interface Props {
  badge: Badge;
}

export default function BadgeCard({ badge }: Props) {
  return (
    <View style={[styles.card, { borderColor: badge.color, backgroundColor: badge.bgColor }]}>
      <Text style={[styles.title, { color: badge.color }]}>{badge.title}</Text>
      <Text style={styles.desc}>{badge.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minWidth: 160,
    maxWidth: 220,
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    boxShadow: '0px 2px 8px rgba(0,0,0,0.12)',
  },
  title: {
    fontSize: 16,
    ...typography.subtitle,
  },
  desc: {
    marginTop: 6,
    fontSize: 13,
    color: colors.mutedText,
    ...typography.text,
  },
});
