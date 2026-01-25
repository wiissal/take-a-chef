import { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
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

  // Featured dishes for horizontal scroll
  const featuredDishes = [
    {
      id: 1,
      name: 'Moroccan Chicken Tagine',
      chef: 'Najat Kaanache',
      image: 'https://media.istockphoto.com/id/1161748748/photo/traditional-moroccan-chicken-tagine-with-olives-and-salted-lemons.webp?a=1&b=1&s=612x612&w=0&k=20&c=70HMLUWBBP2GryP5__vnJBz8zkXkD22rLA6CJATSVtQ=',
    },
    {
      id: 2,
      name: 'Asian Fusion Delights',
      chef: 'Susur Lee',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500',
    },
    {
      id: 3,
      name: 'Moroccan Beef Tagine',
      chef: 'Najat Kaanache',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT_41gwIGdKGzZJpoXcKaH0E6fvKZiNUt23A&s',
    },
    {
      id: 4,
      name: 'Roast scallops, bacon and malt vinegar',
      chef: 'Ashley Palmer-Watts',
      image: 'https://media-cdn2.greatbritishchefs.com/media/hqjjahtg/gbc_devonshire_edit-1.whqc_520x347q80.webp',
    },

  ];

  const filteredChefs = useMemo (()=> {
  return chefs.filter((chef) => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    const nameMatch = chef.User?.name?.toLowerCase().includes(searchLower);
    const specialtyMatch = chef.specialty?.toLowerCase().includes(searchLower);
    return nameMatch || specialtyMatch;
  });
}, [chefs, searchQuery]);

  const renderFeaturedItem = ({ item }) => (
    <TouchableOpacity style={styles.featuredCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.featuredImage}
      />
      <View style={styles.featuredInfo}>
      <Text style={styles.featuredName}>{item.name}</Text>
      <Text style={styles.featuredChef}>{item.chef}</Text>
    </View>
    </TouchableOpacity>
  );

  const renderChefCard = useCallback(({ item }) => (
    <TouchableOpacity
    key={item.id}
      style={styles.chefCard}
      onPress={() => router.push(`/chef/${item.id}`)}
    >
      {/* Chef Image */}
      <Image
        source={{ uri: item.photo || "https://i.pravatar.cc/400" }}
        style={styles.chefImage}
      />

      {/* Chef Info */}
      <View style={styles.chefInfo}>
        <Text style={styles.chefName}>{item.User?.name || 'Chef'}</Text>
        
        {/* Rating */}
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color={COLORS.primary} />
          <Text style={styles.rating}>{item.rating || "5.0"}</Text>
          <Text style={styles.reviews}>• {item.total_reviews || 0} reviews</Text>
        </View>

        {/* Bio */}
        <Text style={styles.bio} numberOfLines={3}>
          {item.bio || "Passionate chef creating delicious experiences"}
        </Text>
      </View>

      {/* View Profile Button */}
      <TouchableOpacity 
        style={styles.viewButton}
        onPress={() =>{
      console.log('🔍 Clicking VIEW PROFILE for chef:', item.id);
    console.log('🔍 Navigating to:', `/chef/${item.id}`);
          router.push(`/chef/${item.id}`)}}
      >
        <Text style={styles.viewButtonText}>VIEW PROFILE</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  ), [router]);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>chefs...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle" size={60} color={COLORS.cancelled} />
        <Text style={styles.errorText}>Failed to load chefs</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Picked Just For YOU</Text>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={32} color={COLORS.secondary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar with Filter */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search chefs or experiences..."
            placeholderTextColor={COLORS.gray}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="search" size={20} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Featured Experiences with See All */}
        <View style={styles.featuredSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Experiences</Text>
          </View>
          <FlatList
            data={featuredDishes}
            renderItem={renderFeaturedItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          />
        </View>

        {/* Discover Our Chefs */}
        <View style={styles.chefsSection}>
          <Text style={styles.discoverTitle}>Discover Our Chefs</Text>
          
          {filteredChefs.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="restaurant-outline" size={60} color={COLORS.gray} />
              <Text style={styles.emptyText}>No chefs found</Text>
            </View>
          ) : (
            filteredChefs.map((chef) => renderChefCard({ item: chef }))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: COLORS.gray,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 10,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'serif',
    fontStyle: 'bold',
    color: '#1A1A1A',
  },
  searchWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 10,
    backgroundColor: COLORS.white,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderColor: 'black',
    borderWidth: 1,
    gap: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A1A',
  },
  filterButton: {
    width: 48,
    height: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredSection: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    fontFamily: 'serif',
  },
  seeAllText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  featuredList: {
    paddingHorizontal: 20,
  },
  featuredCard: {
  width: 200,
  marginRight: 16,
  borderRadius: 12,
  overflow: 'hidden',
  backgroundColor: COLORS.white,
},
 featuredImage: {
  width: '100%',
  height: 120,
  backgroundColor: '#F5F5F5',
},
featuredInfo: {
  padding: 12,
},
  
  featuredChef: {
  fontSize: 12,
  color: '#666666',
  fontWeight: '500',
},
  featuredName: {
  fontSize: 14,
  fontWeight: '600',
  color: '#1A1A1A',
  marginBottom: 4,
},
  chefsSection: {
    marginTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 100,
    fontFamily: 'serif',
  },
  discoverTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
    fontFamily: 'serif',
  },
  chefCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  chefImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#F5F5F5',
  },
  chefInfo: {
    padding: 16,
  },
  chefName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 4,
  },
  reviews: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
  },
  bio: {
    fontSize: 13,
    color: '#666666',
    lineHeight: 18,
  },
  viewButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  viewButtonText: {
    color: '#1A1A1A',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 16,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.cancelled,
    marginTop: 16,
  },
});