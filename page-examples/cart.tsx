import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../types";
import { StackScreenProps } from "@react-navigation/stack";
import { useCartState } from "../context/cart-context";

type Props = StackScreenProps<RootStackParamList, "Cart">;

type Product = {
  id: number | string;
  title: string;
  brand: string;
  category: string;
  description: string;
  images: string[];
};

export function CartPage({ navigation }: Props) {
  const { productIds } = useCartState();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const results = await Promise.all(
          productIds.map((id) => fetch("https://dummyjson.com/products/" + id))
        );
        const parsedResults = await Promise.all(
          results.map((result) => result.json())
        );
        const products: Product[] = parsedResults;
        setProducts(products);
      } catch (e) {
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    fetchProducts();
  }, [productIds]);

  if (loading && !initialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() =>
                navigation.navigate("ProductDetails", {
                  id: `${item.id}`,
                })
              }
            >
              {item.images?.length && (
                <Image
                  source={{ uri: item.images[0] }}
                  style={styles.itemImage}
                />
              )}
              <View style={styles.itemDescriptionsContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text numberOfLines={2} style={styles.itemDescription}>
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    minHeight: "100%",
  },
  itemContainer: {
    flexDirection: "row",
    overflow: "hidden",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  itemImage: {
    width: 100,
    height: 80,
    resizeMode: "cover",
  },
  itemDescriptionsContainer: {
    marginLeft: 10,
    flex: 1,
  },
  itemTitle: {
    fontWeight: "bold",
    maxWidth: "100%",
  },
  itemDescription: {
    color: "gray",
    textAlign: "justify",
  },
});
