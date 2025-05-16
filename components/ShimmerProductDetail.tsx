import React from "react";
import { Dimensions, Platform, ScrollView, View } from "react-native";
import Shimmer from "./Shimmer";

const windowHeight = Dimensions.get("window").height;

const ShimmerProductDetail = () => (
  <ScrollView
    showsVerticalScrollIndicator={false}
    scrollEnabled={false}
    contentContainerStyle={{
      paddingBottom: 128,
      paddingTop: Platform.OS === "ios" ? 50 : 0,
    }}
  >
    <View style={{ width: "100%", height: windowHeight / 2, marginBottom: 24 }}>
      <Shimmer height={windowHeight / 2} borderRadius={0} />
    </View>

    <View style={{ paddingHorizontal: 20, gap: 16 }}>
      <View style={{ width: "80%", marginBottom: 12 }}>
        <Shimmer height={36} borderRadius={8} />
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
      >
        <Shimmer
          height={24}
          borderRadius={12}
          width={100}
          style={{ marginRight: 12 }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <Shimmer height={36} borderRadius={8} width={100} />
        <Shimmer height={36} borderRadius={8} width={140} />
      </View>

      {[1, 2, 3, 4].map((_, i) => (
        <View
          key={i}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Shimmer
            height={24}
            borderRadius={12}
            width={32}
            style={{ marginRight: 16 }}
          />
          <View style={{ width: "60%" }}>
            <Shimmer height={18} borderRadius={8} />
          </View>
        </View>
      ))}

      <View style={{ marginTop: 24 }}>
        <View style={{ width: "50%", marginBottom: 8 }}>
          <Shimmer height={24} borderRadius={8} />
        </View>
        <View style={{ width: "100%", marginBottom: 6 }}>
          <Shimmer height={16} borderRadius={8} />
        </View>
        <View style={{ width: "90%", marginBottom: 6 }}>
          <Shimmer height={16} borderRadius={8} />
        </View>
        <View style={{ width: "80%" }}>
          <Shimmer height={16} borderRadius={8} />
        </View>
      </View>
    </View>
  </ScrollView>
);

export default ShimmerProductDetail;
