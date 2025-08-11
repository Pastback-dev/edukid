
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, SafeAreaView, View } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { useEffect, useState } from 'react';
import { setupErrorLogging } from '../utils/errorLogger';
import { useFonts, Fredoka_400Regular, Fredoka_600SemiBold, Fredoka_700Bold } from '@expo-google-fonts/fredoka';

const STORAGE_KEY = 'emulated_device';

function RootLayoutInner() {
  const actualInsets = useSafeAreaInsets();
  const [storedEmulate, setStoredEmulate] = useState<string | null>(null);

  useEffect(() => {
    setupErrorLogging();
    if (Platform.OS === 'web') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setStoredEmulate(stored);
    }
  }, []);

  let insetsToUse = actualInsets;

  if (Platform.OS === 'web') {
    const simulatedInsets = {
      ios: { top: 47, bottom: 20, left: 0, right: 0 },
      android: { top: 40, bottom: 0, left: 0, right: 0 },
    } as const;

    const deviceToEmulate = storedEmulate;
    insetsToUse = deviceToEmulate ? (simulatedInsets as any)[deviceToEmulate] || actualInsets : actualInsets;
  }

  return (
    <SafeAreaView style={[commonStyles.wrapper, {
      paddingTop: insetsToUse.top,
      paddingBottom: insetsToUse.bottom,
      paddingLeft: insetsToUse.left,
      paddingRight: insetsToUse.right,
    }]}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'default',
        }}
      />
    </SafeAreaView>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  // Simple splash-like placeholder while fonts load
  if (!fontsLoaded) {
    return (
      <SafeAreaProvider>
        <View style={[commonStyles.wrapper, { justifyContent: 'center', alignItems: 'center' }]}>
          <StatusBar style="dark" />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <RootLayoutInner />
    </SafeAreaProvider>
  );
}
