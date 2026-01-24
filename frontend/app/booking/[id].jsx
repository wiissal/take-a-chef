import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';

export default function BookingScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // chef_id

  const [occasion, setOccasion] = useState('');
  const [chefType, setChefType] = useState('');
  const [address, setAddress] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [guests, setGuests] = useState('');
  const [specialties, setSpecialties] = useState([]);

  const occasions = ['Dinner Party', 'Date Night', 'Brunch'];
  const chefTypes = ['Personal Chef', 'Private Chef'];
  const specialtyOptions = ['Italian', 'Vegan', 'Pastry', 'Mexican', 'Japanese', 'French'];

  const toggleSpecialty = (specialty) => {
    if (specialties.includes(specialty)) {
      setSpecialties(specialties.filter((s) => s !== specialty));
    } else {
      setSpecialties([...specialties, specialty]);
    }
  };

  const handleContinue = () => {
    console.log({
      chef_id: id,
      occasion,
      chefType,
      address,
      booking_date: selectedDate,
      guests: parseInt(guests),
      specialties,
    });
    // TODO: Navigate to confirmation or create booking
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Occasion */}
        <View style={styles.section}>
          <Text style={styles.label}>What is the occasion?</Text>
          <View style={styles.chipsRow}>
            {occasions.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.chip,
                  occasion === item && styles.chipActive,
                ]}
                onPress={() => setOccasion(item)}
              >
                <Text
                  style={[
                    styles.chipText,
                    occasion === item && styles.chipTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Type of Chef */}
        <View style={styles.section}>
          <Text style={styles.label}>Type of Chef</Text>
          <View style={styles.chipsRow}>
            {chefTypes.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.chip,
                  chefType === item && styles.chipActive,
                ]}
                onPress={() => setChefType(item)}
              >
                <Text
                  style={[
                    styles.chipText,
                    chefType === item && styles.chipTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Address */}
        <View style={styles.section}>
          <Text style={styles.label}>What is the address?</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 123 Main Street"
            placeholderTextColor={COLORS.gray}
            value={address}
            onChangeText={setAddress}
          />
        </View>

        {/* Date Picker */}
        <View style={styles.section}>
          <Text style={styles.label}>Select A Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>
              {selectedDate ? new Date(selectedDate).toLocaleDateString() : 'Choose a date'}
            </Text>
            <Ionicons name="calendar-outline" size={20} color={COLORS.gray} />
          </TouchableOpacity>
          
          {showDatePicker && (
            <DateTimePicker
              value={selectedDate ? new Date(selectedDate) : new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, date) => {
                setShowDatePicker(Platform.OS === 'ios');
                if (date) {
                  setSelectedDate(date.toISOString().split('T')[0]);
                }
              }}
              minimumDate={new Date()}
            />
          )}
        </View>

        {/* Guests */}
        <View style={styles.section}>
          <Text style={styles.label}>How many guests?</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 4"
            placeholderTextColor={COLORS.gray}
            value={guests}
            onChangeText={setGuests}
            keyboardType="numeric"
          />
        </View>

        {/* Specialties */}
        <View style={styles.section}>
          <Text style={styles.label}>What specialties are you looking for?</Text>
          <View style={styles.chipsWrap}>
            {specialtyOptions.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.chip,
                  specialties.includes(item) && styles.chipActive,
                ]}
                onPress={() => toggleSpecialty(item)}
              >
                <Text
                  style={[
                    styles.chipText,
                    specialties.includes(item) && styles.chipTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  section: {
    marginBottom: 28,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  chipTextActive: {
    color: '#1A1A1A',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#1A1A1A',
  },
  dateButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dateButtonText: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
});
