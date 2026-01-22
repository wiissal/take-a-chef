import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants/theme';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      // Wait 2 seconds to show splash
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Check if user has seen onboarding
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');

      if (hasSeenOnboarding === 'true') {
        // Go directly to login
        router.replace('/(auth)/login');
      } else {
        // Show onboarding
        router.replace('/onboarding');
      }
    } catch (error) {
      console.log('Error checking onboarding:', error);
      router.replace('/(auth)/login');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="restaurant" size={80} color={COLORS.secondary} />
      </View>
      <Text style={styles.title}>Take A Chef</Text>
      <Text style={styles.subtitle}>Hire a Private Chef at Home Today</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.xl,
  },
  iconContainer: {
    marginBottom: SIZES.xl,
  },
  title: {
    fontSize: SIZES.title,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: SIZES.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: SIZES.regular,
    color: COLORS.secondary,
    textAlign: 'center',
  },
});