import Card from "@/components/Card";
import { getProducts } from "@/lib/api";
import { useApi } from "@/lib/useApi";
import { Product } from "@/types";
import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function Index() {
  const {
    data: products,
    loading: productsLoading,
    refetch,
  } = useApi<Product[]>({
    fn: getProducts,
  });

  const handleCardPress = (id: number) => router.push(`/products/${id}`);

  return (
    <View className="h-full bg-white">
      <FlatList
        ListEmptyComponent={<Text>No items</Text>}
        data={products}
        renderItem={({ item }) => {
          return <Card item={item} onPress={() => handleCardPress(item.id)} />;
        }}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
      ></FlatList>
    </View>
  );
}
