import Card from "@/components/Card";
import Error from "@/components/Error";
import ShimmerCard from "@/components/ShimmerCard";
import { getProducts } from "@/lib/api";
import { useApi } from "@/lib/useApi";
import { router } from "expo-router";
import { FlatList, RefreshControl, View } from "react-native";

export default function Index() {
  const { data, loading, refetch } = useApi({ fn: getProducts });

  const handleCardPress = (id: number) => router.push(`/products/${id}`);

  if (loading)
    return (
      <View className="h-full bg-white">
        <FlatList
          data={Array.from({ length: 8 })}
          scrollEnabled={false}
          renderItem={({ item }) => {
            return <ShimmerCard />;
          }}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          contentContainerClassName="pb-32"
          columnWrapperClassName="flex gap-5 px-5"
          showsVerticalScrollIndicator={false}
        ></FlatList>
      </View>
    );

  return (
    <View className="h-full bg-white flex-1">
      <FlatList
        ListEmptyComponent={
          <Error
            title="Product list is empty"
            onTryAgain={() => refetch({})}
            buttonText="Load Again"
          />
        }
        data={data}
        renderItem={({ item }) => {
          return <Card item={item} onPress={() => handleCardPress(item.id)} />;
        }}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerClassName="pb-32 flex-grow"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => refetch({})} />
        }
      ></FlatList>
    </View>
  );
}
