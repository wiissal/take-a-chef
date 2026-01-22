import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../config/api';

// Fetch all bookings
export const useBookings = (params = {}) => {
  return useQuery({
    queryKey: ['bookings', params],
    queryFn: async () => {
      const response = await api.get('/bookings', { params });
      return response.data.data;
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