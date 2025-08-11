
import { StyleSheet } from 'react-native';

export const colors = {
  // Design Colors
  base: '#D6EEFF',           // Light blue background
  primary: '#5B2A86',        // Dark purple text / primary
  accentYellow: '#FFD166',   // Accent yellow
  accentGreen: '#06D6A0',    // Accent green
  accentBlue: '#4CC9F0',     // Bright blue
  accentPink: '#FF70A6',     // Fun pink
  pastelYellow: '#FFF2CC',
  pastelGreen: '#C6F8E5',
  pastelPurple: '#E8D4FF',
  pastelBlue: '#D8F3FF',
  white: '#FFFFFF',
  black: '#000000',

  // Semantic
  text: '#2D1B4E',           // Dark purple variant for text
  mutedText: '#4A3C6B',
  card: '#FFFFFF',           // White cards
  cardBorder: '#EAE2FF',     // Light border
  danger: '#EF476F',
};

export const typography = {
  title: {
    fontFamily: 'Fredoka_700Bold',
    color: colors.primary,
  },
  subtitle: {
    fontFamily: 'Fredoka_600SemiBold',
    color: colors.text,
  },
  text: {
    fontFamily: 'Fredoka_400Regular',
    color: colors.text,
  },
  button: {
    fontFamily: 'Fredoka_600SemiBold',
    color: colors.white,
  },
};

export const shadows = {
  small: '0px 2px 6px rgba(0, 0, 0, 0.12)',
  medium: '0px 6px 12px rgba(0, 0, 0, 0.15)',
};

export const buttonStyles = StyleSheet.create({
  instructionsButton: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: colors.accentBlue,
    alignSelf: 'center',
    width: '100%',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.base,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.base,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    color: colors.primary,
    marginBottom: 8,
    ...typography.title,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.mutedText,
    marginBottom: 16,
    ...typography.subtitle,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
    textAlign: 'center',
    ...typography.text,
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    width: '100%',
    boxShadow: shadows.small,
  },
  icon: {
    width: 60,
    height: 60,
    tintColor: colors.primary,
  },
});
