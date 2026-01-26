import { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator } from "react-native";
import { QueryClientProvider } from "@tanstack/react-query";
import { COLORS } from "../constants/theme";
import { useAuthStore } from "../src/stores";
import { queryClient } from "../src/config/queryClient";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      await checkAuth();
      setIsReady(true);
    };
    initApp();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";
    const onSplash = segments[0] === "splash";
    const onOnboarding = segments[0] === "onboarding";
    const onChefProfile = segments[0] === "chef";
    const onBooking = segments[0] === "booking";
    const onBookingDetails = segments[0] === "booking-details";
    const onPersonalInfo = segments[0] === "personal-information";
    const onChangePassword = segments[0] === "change-password";
    const onPrivacyPolicy = segments[0] === "privacy-policy";

    // If authenticated, go to tabs (unless on allowed routes)
    if (
      isAuthenticated && 
      !inTabsGroup && 
            !onOnboarding &&              
      !onChefProfile && 
      !onBooking && 
      !onBookingDetails &&
      !onPersonalInfo &&
      !onChangePassword &&
      !onPrivacyPolicy
    ) {
      router.replace("/(tabs)");
    }
    // If not authenticated and not already on splash/onboarding/auth
    else if (
      !isAuthenticated &&
      !inAuthGroup &&
      !onSplash &&
      !onOnboarding &&
      !onBookingDetails
    ) {
      router.replace("/splash");
    }
  }, [isAuthenticated, segments, isReady]);

  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.primary,
        }}
      >
        <ActivityIndicator size="large" color={COLORS.secondary} />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="splash">
        <Stack.Screen name="splash" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="chef/[id]" />
        <Stack.Screen name="booking/[id]" />
        <Stack.Screen name="booking-details/[id]" />
        <Stack.Screen name="personal-information" />
        <Stack.Screen name="change-password" />
        <Stack.Screen name="privacy-policy" />
      </Stack>
      <StatusBar style="dark" />
    </QueryClientProvider>
  );
}