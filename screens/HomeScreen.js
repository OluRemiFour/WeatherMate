// import { Image, StyleSheet, Text, View } from "react-native";
// import React from "react";

// export default function HomeScreen() {
//   const [fontsLoaded] = useFonts({
//     "Poppins-Regular": require("../assets/Fonts/Poppins-Regular.ttf"),
//   });

//   if (!fontsLoaded) {
//     return <AppLoading />;
//   }

// import AppLoading from "expo-app-loading";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../Fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    setTimeout(() => navigation.navigate("First"), 3000);
  });

  return (
    <View style={styles.container}>
      <Image source={require("../assets/day.png")} width={100} height={100} />
      <View>
        <Text style={[styles.text, { fontSize: 40, fontWeight: "700" }]}>
          Weather
        </Text>
        <Text
          style={[
            styles.text,
            { fontSize: 15, fontWeight: "900", color: "#8B95A2" },
          ]}
        >
          Forecast
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d5dde5",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
});
