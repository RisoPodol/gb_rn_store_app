import Card from "@/components/Card";
import Error from "@/components/Error";
import ShimmerCard from "@/components/ShimmerCard";
import icons from "@/constants/icons";
import { getProducts } from "@/lib/api";
import { useApi } from "@/lib/useApi";
import methods from "@/utils/methods";
import { router, useLocalSearchParams } from "expo-router";
import {
  FlatList,
  Image,
  Platform,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Category = () => {
  const { name } = useLocalSearchParams<{ name: string }>();

  const { data, loading, refetch } = useApi({
    fn: () => getProducts({ category: name }),
  });

  const handleCardPress = (id: number) => router.push(`/products/${id}`);

  return (
    <SafeAreaView className="bg-white flex-1">
      <View
        className="z-50 absolute bg-white"
        style={{
          top: Platform.OS === "ios" ? 50 : 0,
        }}
      >
        <View className="flex flex-row items-center w-full justify-between p-3">
          <TouchableOpacity onPress={() => router.back()} className="px-4 py-2">
            <Image source={icons.arrowLeft} className="size-6" />
          </TouchableOpacity>
          <Text className="font-bold text-center text-2xl">
            {methods.capitalizeFirstLetter(name)}
          </Text>
          <View className="px-4 py-2" />
        </View>
      </View>

      {loading ? (
        <View className="h-full bg-white">
          <FlatList
            data={Array.from({ length: 8 })}
            scrollEnabled={false}
            renderItem={() => <ShimmerCard />}
            keyExtractor={(_, index) => index.toString()}
            numColumns={2}
            contentContainerClassName="pb-32 pt-20"
            columnWrapperClassName="flex gap-5 px-5"
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View className="h-full bg-white flex-1">
          <FlatList
            ListEmptyComponent={
              <Error
                title="Product list is empty"
                onTryAgain={refetch}
                buttonText="Load Again"
              />
            }
            data={data}
            renderItem={({ item }) => (
              <Card item={item} onPress={() => handleCardPress(item.id)} />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerClassName="pb-32 pt-20 flex-grow"
            columnWrapperClassName="flex gap-5 px-5"
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={refetch} />
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Category;
