import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/theme";
import { useChefs } from "../../src/hooks/useChefs";

export default function ChefsListScreen() {
  const router = useRouter();
  const { data, isLoading, error } = useChefs();

  const chefs = data?.chefs || [];

  const renderChefCard = ({ item }) => (
    <TouchableOpacity
      style={styles.chefCard}
      onPress={() => router.push(`/chef/${item.id}`)}
    >
      <Image
        source={{ uri: item.photo || "https://i.pravatar.cc/400" }}
        style={styles.chefImage}
      />
      <View style={styles.chefInfo}>
        <Text style={styles.chefName}>{item.User?.name || 'Chef'}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color="#FFB800" />
          <Text style={styles.rating}>{item.rating || "5.0"}</Text>
          <Text style={styles.reviews}>({item.total_reviews || 0})</Text>
        </View>
        <Text style={styles.specialty}>{item.specialty || "Cuisine"}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9E9E9E" />
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Our Chefs</Text>
      </View>

      <FlatList
        data={chefs}
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
    backgroundColor: '#FAFAFA',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  listContent: {
    padding: 20,
  },
  chefCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  chefImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E0E0',
  },
  chefInfo: {
    flex: 1,
    marginLeft: 12,
  },
  chefName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
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
  specialty: {
    fontSize: 13,
    color: '#666666',
  },
});