import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../config/api";

// Fetch all chefs
export const useChefs = (params = {}) => {
  return useQuery({
    queryKey: ["chefs", params],
    queryFn: async () => {
      console.log("🔍 Fetching chefs from API...");
      try {
        const response = await api.get("/chefs", { params });
        console.log("✅ API Response:", response.data);
        return response.data.data;
      } catch (error) {
        console.log("❌ API Error:", error);
        throw error;
      }
    },
  });
};

//fetch chef by id
export const useChef = (id) => {
  return useQuery({
    queryKey: ["chef", id],
    queryFn: async () => {
      const response = await api.get(`/chefs/${id}`);
      return response.data.data.chef;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
  });
};

//fetch chef dishes
export const useChefDishes = (chefId) => {
  return useQuery({
    queryKey: ["chef-dishes", chefId],
    queryFn: async () => {
      const response = await api.get(`/chefs/${chefId}/dishes`);
      return response.data.data.dishes;
    },
    enabled: !!chefId,
    staleTime: 5 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
  });
};

//Fetch chef's reviews
export const useChefReviews = (chefId) => {
  return useQuery({
    queryKey: ["chef-reviews", chefId],
    queryFn: async () => {
      const response = await api.get(`/chefs/${chefId}/reviews`);

      return response.data.data;
    },
    enabled: !!chefId,
    staleTime: 5 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
  });
};
