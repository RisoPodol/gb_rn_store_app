import BottomScreenButton from "@/components/BottomScreenButton";
import { Collapsible } from "@/components/Collapsible";
import Error from "@/components/Error";
import ShimmerProductDetail from "@/components/ShimmerProductDetail";
import { productOptions } from "@/constants/data";
import icons from "@/constants/icons";
import { getProductById } from "@/lib/api";
import { useApi } from "@/lib/useApi";
import toasts from "@/utils/toasts";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Product = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const windowHeight = Dimensions.get("window").height;

  const [count, setCount] = useState(1);

  const {
    data: product,
    loading,
    error,
    refetch,
  } = useApi({
    fn: getProductById,
    params: {
      id: id,
    },
  });

  const handleAddToCart = () => notImplementedToast("Add to cart");
  const handleShare = () => notImplementedToast("Share product");

  const notImplementedToast = (title: string) => {
    toasts.notImplemented(title);
  };

  const scrollRef = useRef<ScrollView>(null);

  const handleLoadAgain = () => {
    refetch({ id });
  };

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
          <TouchableOpacity onPress={() => handleShare()} className="px-4 py-2">
            <Image source={icons.share} className="size-6" />
          </TouchableOpacity>
        </View>
      </View>

      {loading && !error && <ShimmerProductDetail />}

      {!loading && (error || !product) && (
        <Error
          description="We are having trouble loading the product details."
          onTryAgain={handleLoadAgain}
        />
      )}

      {!loading && product && (
        <ScrollView
          ref={scrollRef}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleLoadAgain} />
          }
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-32 pt-20"
        >
          <View
            className="relative w-full"
            style={{ height: windowHeight / 2 }}
          >
            <Image
              source={{ uri: product?.image }}
              className="size-full"
              resizeMode="contain"
            />
          </View>

          <View className="px-5 mt-7 flex gap-2">
            <Text className="text-3xl" numberOfLines={2}>
              {product?.title}
            </Text>

            <View className="flex flex-row items-center my-4">
              <Image
                source={icons.star}
                className="size-5"
                tintColor="#EB542D"
              />
              <Text className="font-bold px-1">{product?.rating.rate}</Text>
              <Text className="text-black-400">({product?.rating.count})</Text>
            </View>
            <View className="flex-row justify-between items-center pb-4">
              <Text className="text-3xl text-primary font-bold">
                {`${
                  product?.price
                    ? product.price.toFixed(2).replace(".", ",")
                    : "0,00"
                } €`}
              </Text>
              <View className="bg-gray-200 flex-row gap-4 items-center">
                <TouchableOpacity
                  disabled={count === 1}
                  className="w-8 h-12 flex justify-center items-center mx-2"
                  onPress={() => setCount(count - 1)}
                >
                  <Text
                    className={`${
                      count > 1 ? "text-black" : "text-black-400"
                    } text-2xl`}
                  >
                    -
                  </Text>
                </TouchableOpacity>
                <View className="w-8 justify-center items-center">
                  <Text className="text-2xl">{count}</Text>
                </View>
                <TouchableOpacity
                  className="w-8 h-12 flex justify-center items-center mx-2"
                  onPress={() => setCount(count + 1)}
                >
                  <Text className="text-black text-2xl">+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex flex-col gap-2 border-t border-b border-black-400 py-4">
              {productOptions.map((option, idx) => (
                <View key={idx} className="flex flex-row items-center">
                  <Image source={option.icon} className="size-6 mr-4" />
                  <Text>{option.text}</Text>
                </View>
              ))}
            </View>

            <View className="pt-6">
              <Collapsible title="Product description" scrollRef={scrollRef}>
                <Text>{product?.description}</Text>
              </Collapsible>
            </View>
          </View>
        </ScrollView>
      )}

      {!loading && product && (
        <BottomScreenButton
          text={`Add to cart - ${
            product?.price
              ? (product.price * count).toFixed(2).replace(".", ",")
              : "0,00"
          } €`}
          onPress={handleAddToCart}
        />
      )}
    </SafeAreaView>
  );
};

export default Product;
