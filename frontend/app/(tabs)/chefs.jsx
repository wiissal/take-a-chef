import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";
import { useChefs } from "../../src/hooks/useChefs";

export default function ChefsListScreen() {
  const router = useRouter();
  const { data, isLoading, error } = useChefs();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [favorites, setFavorites] = useState([]);

  const chefs = data?.chefs || [];

  // Get unique specialties for filters
  const specialties = [
    "All",
    ...new Set(chefs.map((chef) => chef.specialty).filter(Boolean)),
  ];

  // Filter chefs based on selected specialty
  const filteredChefs =
    selectedFilter === "All"
      ? chefs
      : chefs.filter((chef) => chef.specialty === selectedFilter);

  const toggleFavorite = (chefId) => {
    setFavorites((prev) =>
      prev.includes(chefId)
        ? prev.filter((id) => id !== chefId)
        : [...prev, chefId],
    );
  };

  const renderChefCard = ({ item }) => {
    const isFavorite = favorites.includes(item.id);

    return (
      <TouchableOpacity
        style={styles.chefCard}
        onPress={() => router.push(`/chef/${item.id}`)}
      >
        {/* Food Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                item.food_photo ||
                item.photo ||
                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
            }}
            style={styles.foodImage}
          />

          {/* Favorite Button */}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(item.id)}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={20}
              color={isFavorite ? "#FF4444" : "#FFF"}
            />
          </TouchableOpacity>

          {/* Chef Photo Overlay */}
          <View style={styles.chefPhotoContainer}>
            <Image
              source={{ uri: item.photo || "https://i.pravatar.cc/100" }}
              style={styles.chefPhoto}
            />
          </View>
        </View>

        {/* Chef Info */}
        <View style={styles.chefInfo}>
          <Text style={styles.chefName}>{item.User?.name || "Chef"}</Text>
          <Text style={styles.chefTitle}>{item.title || "Food master"}</Text>

          {/* Specialty Tags */}
          {item.specialty && (
            <View style={styles.tagsContainer}>
              {item.specialty.split(",").map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag.trim()}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Price and Rating Row */}
          <View style={styles.bottomRow}>
            <Text style={styles.price}>
              Menus from / ${item.price_per_person || 75}
            </Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={14} color="#FFB800" />
              <Text style={styles.rating}>{item.rating || "4.8"}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chefs</Text>
      </View>

      {/* Filter Chips */}
      <View style={styles.filtersWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          {specialties.map((specialty, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterChip,
                selectedFilter === specialty && styles.filterChipActive,
              ]}
              onPress={() => setSelectedFilter(specialty)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === specialty && styles.filterTextActive,
                ]}
              >
                {specialty}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Chefs List */}
      <FlatList
        data={filteredChefs}
        renderItem={renderChefCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1A1A1A",
  },
 filtersWrapper: {
  backgroundColor: COLORS.white,
  paddingVertical: 1,
  paddingBottom: 15,
},
filtersContent: {
  paddingHorizontal: 15,
  flexDirection: 'row',
  alignItems: 'center',
},
filterChip: {
  paddingVertical: 9,
  paddingHorizontal: 20,
  borderRadius: 20,
  backgroundColor: '#F5F5F5',
  marginRight: 10,
},
filterChipActive: {
  backgroundColor: COLORS.primary,
},
filterText: {
  fontSize: 14,
  fontWeight: '500',
  color: '#666666',
},
filterTextActive: {
  color: '#1A1A1A',
  fontWeight: '600',
},
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  chefCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
    paddingTop: 15,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 200,
  },
  foodImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E0E0E0",
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    left: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  chefPhotoContainer: {
    position: "absolute",
    bottom: -30,
    right: 16,
    borderWidth: 3,
    borderColor: COLORS.white,
    borderRadius: 35,
  },
  chefPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E0E0E0",
  },
  chefInfo: {
    padding: 16,
    paddingTop: 40,
  },
  chefName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: 2,
  },
  chefTitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: "#666666",
    fontWeight: "500",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
  },
});
