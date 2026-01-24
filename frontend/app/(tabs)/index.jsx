import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/theme";
import { useChefs } from "../../src/hooks/useChefs";

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, error } = useChefs();
  
  const chefs = data?.chefs || [];

  const filteredChefs = chefs.filter((chef) => {
    const searchLower = searchQuery.toLowerCase();
    const nameMatch = chef.User?.name?.toLowerCase().includes(searchLower);
    const specialtyMatch = chef.specialty?.toLowerCase().includes(searchLower);
    return nameMatch || specialtyMatch;
  });

  const renderChefCard = ({ item }) => (
    <TouchableOpacity
      style={styles.chefCard}
      onPress={() => router.push(`/chef/${item.id}`)}
    >
      <Image
        source={{ uri: item.photo || "https://via.placeholder.com/400x200" }}
        style={styles.chefImage}
      />
      <View style={styles.chefInfo}>
        <Text style={styles.chefName}>{item.User?.name || 'Chef'}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color={COLORS.primary} />
          <Text style={styles.rating}>{item.rating || "5.0"}</Text>
          <Text style={styles.reviews}>({item.total_reviews || 0} reviews)</Text>
        </View>
        <Text style={styles.specialties} numberOfLines={2}>
          {item.bio || "Passionate chef specializing in delicious cuisine"}
        </Text>
        <Text style={styles.specialty}>🍳 {item.specialty || "International Cuisine"}</Text>
      </View>
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => router.push(`/chef/${item.id}`)}
      >
        <Text style={styles.bookButtonText}>View Profile</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading chefs...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle" size={60} color={COLORS.cancelled} />
        <Text style={styles.errorText}>Failed to load chefs</Text>
        <Text style={styles.errorSubtext}>Please check your connection</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello 👋</Text>
          <Text style={styles.headerTitle}>Find Your Chef</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons
            name="notifications-outline"
            size={28}
            color={COLORS.secondary}
          />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={COLORS.gray}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search chefs or cuisines..."
          placeholderTextColor={COLORS.gray}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        )}
      </View>

      {/* Section header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Chefs</Text>
        <Text style={styles.chefCount}>{filteredChefs.length} available</Text>
      </View>

      {/* Chef list */}
      {filteredChefs.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="restaurant-outline" size={60} color={COLORS.gray} />
          <Text style={styles.emptyText}>No chefs found</Text>
          <Text style={styles.emptySubtext}>Try adjusting your search</Text>
        </View>
      ) : (
        <FlatList
          data={filteredChefs}
          renderItem={renderChefCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: SIZES.md,
    fontSize: SIZES.regular,
    color: COLORS.gray,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.lg,
    paddingTop: 60,
    paddingBottom: SIZES.lg,
    backgroundColor: COLORS.white,
  },
  greeting: {
    fontSize: SIZES.regular,
    color: COLORS.gray,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.cancelled,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.lg,
    marginVertical: SIZES.md,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: SIZES.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: SIZES.regular,
    color: COLORS.secondary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: SIZES.lg,
    marginBottom: SIZES.md,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: '600',
    color: COLORS.secondary,
  },
  chefCount: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  listContent: {
    paddingHorizontal: SIZES.lg,
    paddingBottom: SIZES.xl,
  },
  chefCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    padding: SIZES.md,
    marginBottom: SIZES.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chefImage: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray,
    marginBottom: SIZES.md,
  },
  chefInfo: {
    marginBottom: SIZES.md,
  },
  chefName: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    fontSize: SIZES.medium,
    color: COLORS.secondary,
    marginLeft: 4,
    fontWeight: '600',
  },
  reviews: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginLeft: 4,
  },
  specialties: {
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginBottom: 4,
  },
  specialty: {
    fontSize: SIZES.medium,
    color: COLORS.secondary,
    fontWeight: '500',
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.sm,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: SIZES.regular,
    fontWeight: '600',
    color: COLORS.secondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyText: {
    fontSize: SIZES.large,
    fontWeight: '600',
    color: COLORS.secondary,
    marginTop: SIZES.md,
  },
  emptySubtext: {
    fontSize: SIZES.regular,
    color: COLORS.gray,
    marginTop: SIZES.sm,
  },
  errorText: {
    fontSize: SIZES.large,
    fontWeight: '600',
    color: COLORS.cancelled,
    marginTop: SIZES.md,
  },
  errorSubtext: {
    fontSize: SIZES.regular,
    color: COLORS.gray,
    marginTop: SIZES.sm,
  },
});