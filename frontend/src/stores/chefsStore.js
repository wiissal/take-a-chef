import { create } from 'zustand';
import api from "../config/api";

const useChefsStore = create((set) => ({
  chefs: [],
  selectedChef: null ,
  isLoading: false,
  error: null,

  getChefs: async (params ={}) => {
    set ({ isLoading: true, error: null});
    try{
      const response = await api.get('/chefs', {params});
      set ({ chefs: response.data.data.chefs, isLoading: false});
      return { success: true };
    } catch (error){
      set({ isLoading : false, error: error.message?.data?.message });
      return {success : false};
    }
  },
  getChefById: async (id) => {
    set({ isLoading: true, error: null});
    try{
      const  response = await api.get (`/chefs/${id}`);
      set ({selectedChef: response.data.data.chef, isLoading: false });
      return { success: true };
    } catch (error) {
      set ({ isLoading: false, error: error.response?.data?.message });
      return { success: false};
    }
  },
  clearSelectedChef: () => set({ selectedChef: null }),
}));
export default useChefsStore;