import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Take-a-Chef Privacy Policy</Text>
        <Text style={styles.date}>Last updated: January 25, 2026</Text>

        <Text style={styles.sectionTitle}>1. Information Collection</Text>
        <Text style={styles.text}>
          We collect information you provide when creating an account, including your name, 
          email address, and booking preferences.
        </Text>

        <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
        <Text style={styles.text}>
          We use your information to process bookings, communicate with chefs, and improve 
          our services.
        </Text>

        <Text style={styles.sectionTitle}>3. Data Security</Text>
        <Text style={styles.text}>
          We implement security measures to protect your personal information. Your password 
          is encrypted using industry-standard methods.
        </Text>

        <Text style={styles.sectionTitle}>4. Contact Us</Text>
        <Text style={styles.text}>
          If you have questions about this Privacy Policy, please contact us at:{'\n\n'}
          Email: privacy@takeachef.com{'\n'}
          Phone: +212 123-456-789
        </Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: COLORS.white,
  },
  backButton: {
    width: 24,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  content: {
    backgroundColor: COLORS.white,
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#444',
    lineHeight: 22,
  },
});