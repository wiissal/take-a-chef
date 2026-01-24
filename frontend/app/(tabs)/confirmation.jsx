import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS} from '../../constants/theme';

export default function ConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams ();

  //data from booking creation 
   const bookingData = {
    chefName: params.chefName ,
    chefPhoto: params.chefPhoto ,
    occasion: params.occasion ,
    date: params.date ,
    time: params.time ,
    eventType: params.eventType ,
  };
  return(
    <View style={styles.container}>
{/* Close Button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.push('/(tabs)')}
      >
        <Ionicons name="close" size={24} color={COLORS.secondary} />
      </TouchableOpacity>
       {/* Success Icon */}
      <View style={styles.successIcon}>
        <Ionicons name="checkmark" size={60} color={COLORS.secondary} />
      </View>
      {/* Title */}
      <Text style={styles.title}>Booking Confirmed!</Text>
      <Text style={styles.subtitle}>
        Get ready for an unforgettable culinary experience.
      </Text>
       {/* Chef Info Card */}
      <View style={styles.chefCard}>
        <Image
          source={{ uri: bookingData.chefPhoto }}
          style={styles.chefPhoto}
        />
        <View style={styles.chefInfo}>
          <Text style={styles.chefName}>{bookingData.chefName}</Text>
          <Text style={styles.occasionText}>{bookingData.occasion}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={COLORS.gray} />
      </View>
       {/* Booking Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={20} color={COLORS.gray} />
          <Text style={styles.detailLabel}>Date & Time</Text>
          <Text style={styles.detailValue}>
            {bookingData.date} at {bookingData.time}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="restaurant-outline" size={20} color={COLORS.gray} />
          <Text style={styles.detailLabel}>Occasion</Text>
          <Text style={styles.detailValue}>{bookingData.eventType}</Text>
        </View>
      </View>
      {/* View History Button */}
      <TouchableOpacity
        style={styles.historyButton}
        onPress={() => router.push('/(tabs)/history')}
      >
        <Text style={styles.historyButtonText}>View Booking History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
  },
  chefCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  chefPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E0E0E0',
  },
  chefInfo: {
    flex: 1,
    marginLeft: 12,
  },
  chefName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  occasionText: {
    fontSize: 13,
    color: '#666666',
  },
  detailsContainer: {
    marginBottom: 40,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabel: {
    flex: 1,
    fontSize: 14,
    color: '#666666',
    marginLeft: 12,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  historyButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 100, // Above the tab bar
    left: 20,
    right: 20,
  },
  historyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
});
