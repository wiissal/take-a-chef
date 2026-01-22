import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../config/api";

//fetch all chefs
export const useChefs = (params = {}) => {
  return useQuery({
    queryKey: ['chefs', params],
    queryFn: async () => {
      const response = await api.get("/chefs", { params });
      return response.data.data;
    },
  });
};
//fetch chef by id
export const useChef = (id) => {
  return useQuery({
    queryKey: ['chef', id],
    queryFn: async () => {
      const response = await api.get(`/chefs/${id}`);
      return response.data.data.chef;
    },
    enabled: !!id,
  });
};

//fetch chef dishes 
export const useChefDishes = (chefId) => {
  return useQuery({
    queryKey: ['chef-dishes', chefId],
    queryFn: async () => {
      const response = await api.get(`/chefs/${chefId}/dishes`);
      return response.data.data.dishes;
    },
    enabled: !!chefId,
  });
};

//Fetch chef's reviews
export const useChefReviews = (chefId) => {
  return useQuery({
    queryKey: ['chef-reviews', chefId],
    queryFn: async () => {
      const response = await api.get(`/chefs/${chefId}/reviews`);
      return response.data.data;
    },
    enabled: !!chefId,
  });
};
