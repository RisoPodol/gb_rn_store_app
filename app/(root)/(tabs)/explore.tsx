import Error from "@/components/Error";
import SettingsItem from "@/components/SettingsItem";
import ShimmerCategory from "@/components/ShimmerCategory";
import { getCategories } from "@/lib/api";
import { useApi } from "@/lib/useApi";
import methods from "@/utils/methods";
import { router } from "expo-router";
import React from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Explore = () => {
  const { data, loading, refetch } = useApi({ fn: getCategories });

  if (loading)
    return (
      <SafeAreaView className="h-full bg-white flex-1 pb-32 px-6">
        <FlatList
          data={Array.from({ length: 10 })}
          scrollEnabled={false}
          renderItem={() => <ShimmerCategory />}
          keyExtractor={(_, index) => index.toString()}
          numColumns={1}
          contentContainerClassName="pb-32"
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View className="mt-1 mb-5">
              <Text className="font-bold text-center text-2xl">
                All categories
              </Text>
            </View>
          }
        />
      </SafeAreaView>
    );

  const handleCattegoryPress = (catgegory: string) =>
    router.push(`/category/${catgegory}`);

  return (
    <SafeAreaView className="h-full bg-white flex-1 pb-32 px-6">
      <FlatList
        ListHeaderComponent={
          <View className="mt-1 mb-5">
            <Text className="font-bold text-center text-2xl">
              All categories
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center pt-44">
            <Error
              title="There are no categories"
              onTryAgain={refetch}
              buttonText="Load Again"
            />
          </View>
        }
        data={data}
        renderItem={({ item }) => (
          <SettingsItem
            title={methods.capitalizeFirstLetter(item)}
            onPress={() => handleCattegoryPress(item)}
          />
        )}
        keyExtractor={(item) => item}
        numColumns={1}
        contentContainerClassName="pb-32 flex-grow"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
      />
    </SafeAreaView>
  );
};

export default Explore;
