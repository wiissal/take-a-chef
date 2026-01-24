import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/theme";
import { useChef, useChefDishes } from "../../src/hooks/useChefs";

export default function ChefProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("MENU");

  const { data: chef, isLoading: chefLoading } = useChef(id);
  const { data: dishes, isLoading: dishesLoading } = useChefDishes(id);

  // Show loading ONLY if chef data hasn't loaded yet
  if (chefLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading chef profile...</Text>
      </View>
    );
  }

  if (!chef) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Chef not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CHEF PROFILE</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons
            name="ellipsis-vertical"
            size={24}
            color={COLORS.secondary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Chef Info Section */}
        <View style={styles.profileSection}>
          {/* Chef Photo */}
          <Image
            source={{ uri: chef.photo || "https://i.pravatar.cc/200" }}
            style={styles.chefPhoto}
          />

          {/* Chef Name */}
          <Text style={styles.chefName}>{chef.User?.name}</Text>

          {/* Rating */}
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color={COLORS.primary} />
            <Text style={styles.rating}>{chef.rating || "5.0"}</Text>
            <Text style={styles.reviews}>
              ({chef.total_reviews || 0} reviews)
            </Text>
          </View>

          {/* Bio */}
          <Text style={styles.bio}>{chef.bio}</Text>

          {/* Action Buttons */}
          <View style={styles.buttonsRow}>
            <TouchableOpacity
  style={styles.bookingButton}
  onPress={() => {
    console.log('🔍 Trying to navigate to booking, chef id:', id);
    router.push('/booking/' + id);
  }}
>
  <Text style={styles.bookingButtonText}>REQUEST A BOOKING</Text>
</TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "MENU" && styles.activeTab]}
            onPress={() => setActiveTab("MENU")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "MENU" && styles.activeTabText,
              ]}
            >
              MENU
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "REVIEWS" && styles.activeTab]}
            onPress={() => setActiveTab("REVIEWS")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "REVIEWS" && styles.activeTabText,
              ]}
            >
              REVIEWS
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === "MENU" && (
          <View style={styles.menuSection}>
            {dishesLoading ? (
              <View style={{ paddingVertical: 32, alignItems: "center" }}>
                <ActivityIndicator size="small" color={COLORS.primary} />
                <Text style={{ marginTop: 8, color: COLORS.gray }}>
                  Loading menu...
                </Text>
              </View>
            ) : dishes && dishes.length > 0 ? (
              dishes.map((dish) => (
                <View key={dish.id} style={styles.dishCard}>
                  <Image
                    source={{ uri: dish.image }}
                    style={styles.dishImage}
                  />
                  <View style={styles.dishInfo}>
                    <Text style={styles.dishName}>{dish.name}</Text>
                    <Text style={styles.dishDescription} numberOfLines={2}>
                      {dish.description}
                    </Text>
                    <Text style={styles.dishPrice}>${dish.price}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.emptyText}>No dishes available</Text>
            )}
          </View>
        )}

        {activeTab === "REVIEWS" && (
          <View style={styles.reviewsSection}>
            <Text style={styles.emptyText}>Reviews coming soon</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 8,
    backgroundColor: COLORS.white,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    letterSpacing: 0.5,
    fontStyle: "serif",
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  profileSection: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 24,
    alignItems: "center",
  },
  chefPhoto: {
    width: 120,
    height: 120,
    borderRadius: 50,
    backgroundColor: "#F5F5F5",
    marginBottom: 12,
  },
  chefName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginLeft: 4,
  },
  reviews: {
    fontSize: 14,
    color: "#666666",
    marginLeft: 4,
  },
  bio: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  bookingButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  bookingButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#1A1A1A",
    letterSpacing: 0.5,
  },

  tabsContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    marginTop: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666666",
    letterSpacing: 0.5,
  },
  activeTabText: {
    color: "#1A1A1A",
  },
  menuSection: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  dishCard: {
    flexDirection: "row",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  dishImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
  },
  dishInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },
  dishName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  dishDescription: {
    fontSize: 13,
    color: "#666666",
    lineHeight: 18,
    marginBottom: 6,
  },
  dishPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  reviewsSection: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 32,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#666666",
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: COLORS.cancelled,
  },
});
