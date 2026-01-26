import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { COLORS, SIZES } from "../../constants/theme";
import { useAuthStore } from "../../src/stores";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  const [role, setRole] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert('Error', 'Please fill in all fields');
    return;
  }

  const result = await login(email, password);
  if (result.success) {
    // Check if user has seen onboarding
    const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
    
    if (hasSeenOnboarding === 'true') {
      router.replace('/(tabs)');
    } else {
      router.replace('/onboarding');
    }
  } else {
    Alert.alert('Login Failed', result.error);
  }
};
  // Background images based on role
  const backgroundImage =
    role === "customer"
      ? "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800" // Food plate
      : "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800"; // Chef in kitchen

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.85)", "rgba(0,0,0,0.95)"]}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {/* Logo */}
              <Text style={styles.logo}> TAC</Text>

              {/* Title */}
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Find your perfect chef.</Text>

              {/* Role Toggle */}
              <Text style={styles.label}>I am a:</Text>
              <View style={styles.roleContainer}>
                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    role === "customer" && styles.roleActive,
                  ]}
                  onPress={() => setRole("customer")}
                >
                  <Text
                    style={[
                      styles.roleText,
                      role === "customer" && styles.roleTextActive,
                    ]}
                  >
                    Client
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    role === "chef" && styles.roleActive,
                  ]}
                  onPress={() => setRole("chef")}
                >
                  <Text
                    style={[
                      styles.roleText,
                      role === "chef" && styles.roleTextActive,
                    ]}
                  >
                    Chef
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Email Input */}
              <Text style={styles.label}>Email Address</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                />
              </View>

              {/* Password Input */}
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor="#999"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                />
              </View>

              {/* Forgot Password */}
              <TouchableOpacity
                style={styles.forgotButton}
                onPress={() =>
                  Alert.alert(
                    "Forgot Password",
                    "Please contact  our support at support@takeachef.com to reset your password.",
                    [{ text: "OK" }],
                  )
                }
              >
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Error Message */}
              {error && <Text style={styles.error}>{error}</Text>}

              {/* Login Button */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#1A1A1A" />
                ) : (
                  <Text style={styles.loginButtonText}>Login</Text>
                )}
              </TouchableOpacity>

              {/* Create Account Button */}
              <Link href="/(auth)/register" asChild>
                <TouchableOpacity style={styles.createButton}>
                  <Text style={styles.createButtonText}>Create Account</Text>
                </TouchableOpacity>
              </Link>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SIZES.lg,
    paddingTop: 80,
    paddingBottom: 40,
  },
  logo: {
    fontSize: SIZES.xLarge,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
    marginBottom: SIZES.lg,
  },
  title: {
    fontSize: SIZES.xxLarge,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
  },
  subtitle: {
    fontSize: SIZES.regular,
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    marginBottom: SIZES.xl,
  },
  label: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    marginBottom: SIZES.sm,
    marginTop: SIZES.md,
  },
  roleContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: SIZES.radiusLg,
    padding: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  roleButton: {
    flex: 1,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusLg,
    alignItems: "center",
  },
  roleActive: {
    backgroundColor: COLORS.primary,
  },
  roleText: {
    fontSize: SIZES.regular,
    color: "rgba(255,255,255,0.6)",
    fontWeight: "500",
  },
  roleTextActive: {
    color: "#1A1A1A",
    fontWeight: "600",
  },
  inputContainer: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  input: {
    padding: SIZES.md,
    fontSize: SIZES.regular,
    color: "#1A1A1A",
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginTop: SIZES.sm,
  },
  forgotText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: SIZES.medium,
  },
  error: {
    color: COLORS.cancelled,
    textAlign: "center",
    marginTop: SIZES.sm,
    backgroundColor: "rgba(230, 57, 70, 0.2)",
    padding: SIZES.sm,
    borderRadius: SIZES.radius,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusLg,
    paddingVertical: SIZES.md,
    alignItems: "center",
    marginTop: SIZES.lg,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginButtonText: {
    color: "#1A1A1A",
    fontSize: SIZES.large,
    fontWeight: "700",
  },
  createButton: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: SIZES.radiusLg,
    paddingVertical: SIZES.md,
    alignItems: "center",
    marginTop: SIZES.sm,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  createButtonText: {
    color: COLORS.white,
    fontSize: SIZES.large,
    fontWeight: "600",
  },
});
