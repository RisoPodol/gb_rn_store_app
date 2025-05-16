import React from "react";
import { View } from "react-native";
import Shimmer from "./Shimmer";

const ShimmerCard = () => {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        marginTop: 16,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderRadius: 16,
      }}
    >
      <Shimmer height={160} borderRadius={12} style={{ width: "100%" }} />

      <View style={{ flexDirection: "column", marginTop: 8 }}>
        <Shimmer
          height={20}
          borderRadius={6}
          style={{ width: "80%", marginBottom: 8 }}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Shimmer
            height={14}
            borderRadius={7}
            style={{ width: 60, marginRight: 8 }}
          />
        </View>

        <Shimmer height={20} borderRadius={6} style={{ width: 60 }} />
      </View>
    </View>
  );
};

export default ShimmerCard;
