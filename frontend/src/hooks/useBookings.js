import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../config/api';

// Fetch all bookings
export const useBookings = (params = {}) => {
  return useQuery({
    queryKey: ['bookings', params],
    queryFn: async () => {
      console.log('🔍 Fetching bookings from /bookings');
      console.log('🔍 Full URL:', api.defaults.baseURL + '/bookings');
      try {
        const response = await api.get('/bookings', { params });
        console.log('✅ Full API Response:', JSON.stringify(response.data, null, 2));
        return response.data.data;
      } catch (error) {
        console.log('❌ Bookings Error:', error.message);
        console.log('❌ Request URL:', error.config?.url);
        console.log('❌ Base URL:', error.config?.baseURL);
        console.log('❌ Full URL:', error.config?.baseURL + error.config?.url);
        console.log('❌ Error response:', error.response?.data);
        throw error;
      }
    },
  });
};

// Fetch booking by ID
export const useBooking = (id) => {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: async () => {
      const response = await api.get(`/bookings/${id}`);
      return response.data.data.booking;
    },
    enabled: !!id,
  });
};

// Create booking mutation
export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData) => {
      const response = await api.post('/bookings', bookingData);
      return response.data.data.booking;
    },
    onSuccess: () => {
      // Invalidate bookings list to refetch
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};

// Update booking status mutation
export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }) => {
      const response = await api.put(`/bookings/${id}/status`, { status });
      return response.data.data.booking;
    },
    onSuccess: (data) => {
      // Invalidate both list and single booking
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['booking', data.id] });
    },
  });
};

// Cancel booking mutation
export const useCancelBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await api.delete(`/bookings/${id}`);
      return response.data.data.booking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};