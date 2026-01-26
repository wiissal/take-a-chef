import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';
import { useBooking } from '../../src/hooks/useBookings';
import api from '../../src/config/api';

export default function BookingDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const { data: booking, isLoading, refetch } = useBooking(id);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#4CAF50';
      case 'pending': return '#FF9800';
      case 'completed': return '#2196F3';
      case 'cancelled': return '#E63946';
      default: return COLORS.gray;
    }
  };

  const submitReview = async () => {
    try {
      if (rating === 0) {
        alert('Please select a rating');
        return;
      }

      setSubmittingReview(true);

      await api.post('/reviews', {
        booking_id: booking.id,
        chef_id: booking.chef_id,
        rating,
        comment,
      });

      alert('Review submitted successfully!');
      setRating(0);
      setComment('');
      refetch();
      router.back();
    } catch (error) {
      console.log('Error submitting review:', error.response?.data);
      alert(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!booking) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Booking not found</Text>
      </View>
    );
  }

 return (
  <KeyboardAvoidingView 
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={0}
  >
    {/* Header */}
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Booking Details</Text>
      <View style={{ width: 40 }} />
    </View>

    <ScrollView 
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Chef Info Card */}
      <View style={styles.chefCard}>
        <Image
          source={{ uri: booking.Chef?.photo || 'https://i.pravatar.cc/100' }}
          style={styles.chefPhoto}
        />
        <View style={styles.chefInfo}>
          <Text style={styles.sessionText}>Session with</Text>
          <Text style={styles.chefName}>{booking.Chef?.User?.name || 'Chef'}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color={COLORS.primary} />
            <Text style={styles.chefRating}>{booking.Chef?.rating || '5.0'}</Text>
          </View>
        </View>
      </View>

      {/* Booking Details */}
      <View style={styles.detailsCard}>
        <Text style={styles.sectionTitle}>Booking Information</Text>
        
        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={20} color="#666" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>
              {new Date(booking.booking_date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="people-outline" size={20} color="#666" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>Guests</Text>
            <Text style={styles.detailValue}>{booking.guests} people</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="cash-outline" size={20} color="#666" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>Total Price</Text>
            <Text style={styles.detailValue}>{booking.total_price}DH</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="information-circle-outline" size={20} color="#666" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>Status</Text>
            <View style={styles.statusBadge}>
              <View style={[styles.statusDot, { backgroundColor: getStatusColor(booking.status) }]} />
              <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
                {booking.status}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Review Section */}
      <View style={styles.reviewCard}>
        <Text style={styles.sectionTitle}>Rate your experience</Text>
        <Text style={styles.sectionSubtitle}>Tap to rate</Text>

        {/* Star Rating */}
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setRating(star)}
            >
              <Ionicons
                name={star <= rating ? 'star' : 'star-outline'}
                size={40}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Comment Input */}
        <Text style={styles.inputLabel}>Tell us more (optional)</Text>
        <TextInput
          style={styles.commentInput}
          placeholder="Why this rating?"
          placeholderTextColor="#999"
          multiline
          numberOfLines={4}
          value={comment}
          onChangeText={setComment}
        />

        {/* Submit Button */}
        <TouchableOpacity 
          style={[styles.submitButton, submittingReview && styles.submitButtonDisabled]} 
          onPress={submitReview}
          disabled={submittingReview}
        >
          {submittingReview ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.submitButtonText}>Submit Review</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#E63946',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: COLORS.white,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  chefCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    margin: 20,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  chefPhoto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#E0E0E0',
  },
  chefInfo: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  sessionText: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 4,
  },
  chefName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  chefRating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  detailsCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  detailLabel: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  reviewCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    marginBottom: 40,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  commentInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1A1A1A',
    textAlignVertical: 'top',
    marginBottom: 20,
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
});