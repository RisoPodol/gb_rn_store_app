import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    StyleProp,
    StyleSheet,
    View,
    ViewProps,
    ViewStyle
} from "react-native";

interface ShimmerProps extends ViewProps {
  width?: number;
  height?: number;
  borderRadius?: number;
  shimmerColors?: readonly [string, string, ...string[]];
  shimmerDuration?: number;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

const Shimmer: React.FC<ShimmerProps> = ({
  width,
  height = 60,
  borderRadius = 12,
  shimmerColors = ["#EB542D22", "#EB542DA1", "#EB542D22"] as const,
  shimmerDuration = 1200,
  backgroundColor = "#EB542D22",
  style,
  ...rest
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bounce = Animated.sequence([
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: shimmerDuration,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: shimmerDuration,
        useNativeDriver: true,
      }),
    ]);
    Animated.loop(bounce).start();
  }, [animatedValue, shimmerDuration]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-180, 180],
  });

  return (
    <View
      style={[
        {
          ...(width !== undefined ? { width } : {}),
          ...(height !== undefined ? { height } : {}),
          backgroundColor,
          borderRadius,
          overflow: "hidden",
        },
        style,
      ]}
      {...rest}
    >
      <Animated.View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { transform: [{ translateX }] }]}
      >
        <LinearGradient
          colors={shimmerColors}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
};

export default Shimmer;