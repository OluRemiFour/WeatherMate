import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFonts } from "expo-font";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function SecondScreen() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../Fonts/Poppins-Regular.ttf"),
  });

  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={["#89F7FE", "#66A6FF"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.container}>
        <View>
          <TouchableOpacity style={{}}>
            <Text style={{ fontSize: 30, fontWeight: "700" }}>Skip</Text>
          </TouchableOpacity>
          <Image
            source={require("../assets/sunny.png")}
            width={100}
            height={100}
            style={{
              marginTop: 170,
            }}
          />
        </View>
      </View>
      <View style={styles.details}>
        <View>
          <Text
            style={[
              styles.text,
              {
                fontSize: 40,
                fontWeight: "700",
                paddingVertical: 5,
                color: "white",
              },
            ]}
          >
            Real-Time {"\n"} Weather Map
          </Text>
          <Text
            style={[
              styles.text,
              {
                fontSize: 15,
                fontWeight: "500",
                // color: "#8B95A2",
                paddingTop: 5,
              },
            ]}
          >
            Watch the progress of the {"\n"} precipitation to stay informed
            information.
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Third")}>
          <Image
            source={require("../assets/secondNext.png")}
            style={{ width: 70, height: 70, marginTop: 80 }}
          />
        </TouchableOpacity>

        <View
          style={{
            position: "absolute",
            bottom: 15,
            display: "flex",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: 5,
              height: 5,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
          <View
            style={{
              backgroundColor: "#000",
              width: 10,
              height: 5,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
          <View
            style={{
              backgroundColor: "#fff",
              width: 5,
              height: 5,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
          <View
            style={{
              backgroundColor: "#fff",
              width: 5,
              height: 5,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          ></View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("WeatherPage")}
          style={{ position: "absolute", left: "65%", top: "-80%" }}
        >
          <Text style={{ fontSize: 15, fontWeight: "700" }}>Skip</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#2C2D35",
  },
  text: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },

  details: {
    flex: 1,
    paddingBottom: 100,
    // backgroundColor: "#2C2D35",

    alignItems: "center",
    justifyContent: "center",
  },
});
