import { create } from 'zustand';
import api from '../config/api';

const useBookingsStore = create((set) => ({
  bookings: [],
  isLoading: false,
  error: null,

   getBookings: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/bookings');
      set({ bookings: response.data.data.bookings, isLoading: false });
      return { success: true };
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.message });
      return { success: false };
    }
  },

  createBooking: async (bookingData) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/bookings', bookingData);
      set((state) => ({
        bookings: [response.data.data.booking, ...state.bookings],
        isLoading: false,
      }));
      return { success: true };
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.message });
      return { success: false, error: error.response?.data?.message };
    }
  },

  cancelBooking: async (id) => {
    set({ isLoading: true });
    try {
      await api.delete(`/bookings/${id}`);
      set((state) => ({
        bookings: state.bookings.map((b) =>
          b.id === id ? { ...b, status: 'cancelled' } : b
        ),
        isLoading: false,
      }));
      return { success: true };
    } catch (error) {
      set({ isLoading: false });
      return { success: false };
    }
  },
}));

export default useBookingsStore;