
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography } from '../styles/commonStyles';

interface Props {
  text: string;
  onPress: () => void;
  variant?: 'default' | 'correct' | 'wrong';
  style?: ViewStyle | ViewStyle[];
}

export default function GameOptionButton({ text, onPress, variant = 'default', style }: Props) {
  const background =
    variant === 'correct' ? colors.pastelGreen :
    variant === 'wrong' ? '#FFD1D9' :
    colors.card;
  const border =
    variant === 'correct' ? colors.accentGreen :
    variant === 'wrong' ? colors.danger :
    colors.cardBorder;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: background, borderColor: border }, style]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    boxShadow: '0px 4px 10px rgba(0,0,0,0.10)',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.text,
    ...typography.subtitle,
  },
});
