import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native";
import {
  Alert,
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

export default function Locations({ route }) {
  const { backDark, currentLocation, saveFav } = route.params;
  const [favLocations, setFavLocations] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const isLight = ["#83a4d4", "#b6fbff"];
  const isDark = ["#0F2027", "#203A43", "#2C5364"];
  const backgroundTheme = backDark ? isDark : isLight;

  const updateFavorites = () => {
    if (Array.isArray(saveFav)) {
      setFavLocations(saveFav);
    } else {
      setFavLocations([]);
    }
  };

  useEffect(() => {
    updateFavorites(); 
    setFavLocations([]); 
    fadeIn();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      updateFavorites(); 
    }, [saveFav])
  );

  const handleRemoveFavorite = (locationToRemove) => {
    setFavLocations((prevFavs) =>
      prevFavs.filter((fav) => fav.name !== locationToRemove.name)
    );
    Alert.alert("Location removed from favorites");
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <LinearGradient colors={backgroundTheme} style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ marginTop: 10 }}
      >
        <Ionicons name="chevron-back-circle-sharp" size={35} color="black" />
      </TouchableOpacity>

      <View>
        <Animated.View style={[styles.locations, { opacity: fadeAnim }]}>
          <ScrollView>
            {/* Current Location Section */}
            <View style={styles.locationSection}>
              <Text style={styles.sectionHeader}>Current Location</Text>
              <View style={styles.row}>
                <MaterialIcons name="location-pin" size={18} color="black" />
                <Text style={{ fontSize: 15 }}>{currentLocation}</Text>
              </View>
            </View>

            {/* Favorite Locations Section */}
            <View style={styles.locationSection}>
              <Text style={styles.sectionHeader}>Saved Locations</Text>
              {favLocations.length > 0 ? (
                favLocations.map((loc, i) => (
                  <View key={i} style={styles.rowBetween}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("WeatherPage", { location: loc })
                      }
                      style={styles.row}
                    >
                      <MaterialIcons
                        name="location-pin"
                        size={18}
                        color="black"
                      />
                      <Text>{loc.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleRemoveFavorite(loc)}>
                      <MaterialCommunityIcons
                        name="delete-sweep"
                        size={30}
                        color="black"
                      />
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <Text>No favorite locations saved</Text>
              )}
            </View>

            {/* Add New Location Section */}
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.addLocation}
            >
              <Text style={styles.sectionHeader}>Add a New Location</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    flex: 1,
  },
  locations: {
    marginTop: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  locationSection: {
    marginBottom: 30,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007acc", // A deep sky blue color
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  addLocation: {
    marginTop: 30,
  },
});
