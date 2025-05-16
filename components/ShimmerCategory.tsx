import React from "react";
import { View } from "react-native";
import Shimmer from "./Shimmer";

const ShimmerCategory = () => (
  <View className="mb-3">
    <Shimmer height={48} borderRadius={12} style={{ width: "100%" }} />
  </View>
);

export default ShimmerCategory;