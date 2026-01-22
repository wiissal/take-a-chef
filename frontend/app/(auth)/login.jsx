import { useState } from 'react';
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
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { COLORS, SIZES } from '../../constants/theme';
import { useAuthStore } from '../../src/stores';

export default function LoginScreen() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  const [role, setRole] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Login Failed', result.error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
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
              style={[styles.roleButton, role === 'customer' && styles.roleActive]}
              onPress={() => setRole('customer')}
            >
              <Text style={[styles.roleText, role === 'customer' && styles.roleTextActive]}>
                Client
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleButton, role === 'chef' && styles.roleActive]}
              onPress={() => setRole('chef')}
            >
              <Text style={[styles.roleText, role === 'chef' && styles.roleTextActive]}>
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
              placeholderTextColor={COLORS.gray}
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
              placeholderTextColor={COLORS.gray}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotButton}>
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
              <ActivityIndicator color={COLORS.secondary} />
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

          {/* Or continue with */}
          <Text style={styles.orText}>Or continue with</Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialIcon}>✉️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialIcon}>💬</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SIZES.lg,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logo: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: SIZES.lg,
  },
  title: {
    fontSize: SIZES.xxLarge,
    fontWeight: 'bold',
    color: COLORS.secondary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: SIZES.regular,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: SIZES.xl,
  },
  label: {
    fontSize: SIZES.medium,
    color: COLORS.secondary,
    marginBottom: SIZES.sm,
    marginTop: SIZES.md,
  },
  roleContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radiusLg,
    padding: 4,
  },
  roleButton: {
    flex: 1,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radiusLg,
    alignItems: 'center',
  },
  roleActive: {
    backgroundColor: COLORS.primary,
  },
  roleText: {
    fontSize: SIZES.regular,
    color: COLORS.gray,
    fontWeight: '500',
  },
  roleTextActive: {
    color: COLORS.secondary,
    fontWeight: '600',
  },
  inputContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  input: {
    padding: SIZES.md,
    fontSize: SIZES.regular,
    color: COLORS.secondary,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: SIZES.sm,
  },
  forgotText: {
    color: COLORS.gray,
    fontSize: SIZES.medium,
  },
  error: {
    color: COLORS.cancelled,
    textAlign: 'center',
    marginTop: SIZES.sm,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusLg,
    paddingVertical: SIZES.md,
    alignItems: 'center',
    marginTop: SIZES.lg,
  },
  loginButtonText: {
    color: COLORS.secondary,
    fontSize: SIZES.large,
    fontWeight: '600',
  },
  createButton: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLg,
    paddingVertical: SIZES.md,
    alignItems: 'center',
    marginTop: SIZES.sm,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  createButtonText: {
    color: COLORS.secondary,
    fontSize: SIZES.large,
    fontWeight: '600',
  },
  orText: {
    textAlign: 'center',
    color: COLORS.gray,
    marginTop: SIZES.lg,
    marginBottom: SIZES.md,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SIZES.md,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    fontSize: 20,
  },
});