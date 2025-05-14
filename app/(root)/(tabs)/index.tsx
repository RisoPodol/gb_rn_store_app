import { getProducts } from "@/app/lib/api";
import { useApi } from "@/app/lib/useApi";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const {
    data: products,
    loading: productsLoading,
    refetch,
  } = useApi({
    fn: getProducts,
  });

  // const handleCardPress = (id: string) => router.push(`/products/${id}`);

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        ListEmptyComponent={<Text>No items</Text>}
        ListHeaderComponent={<Text>Header</Text>}
        data={products}
        renderItem={({ item }) => {
          const { id, title, price, description, category, image, rating } =
            item;
          return (
            <View className="bg-primary">
              <Text className="text-xl text-white">{item.title}</Text>
            </View>
          );
        }}
        keyExtractor={(item) => item.toString()} //TODO: change to actual ID
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5 py-5"
        showsVerticalScrollIndicator={false}
      ></FlatList>
    </SafeAreaView>
  );
}
