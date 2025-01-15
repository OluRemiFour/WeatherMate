import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Progress from "react-native-progress";
import {
  fetchLcationForecast,
  fetchWeatherForecast,
  getLocationName,
  weatherImages,
} from "../constant/Weather";
import { getData, storeData } from "../utils/asyncStorage";

export default function WeatherPage() {
  const [showSearch, setShowSearch] = useState(false);
  const [locations, setLocation] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [locate, setLocate] = useState(null);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [backDark, setbackDark] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [saveFav, setSaveFav] = useState([]);

  const theme = isDarkMode ? darkTheme : lightTheme;
  const { current, location } = weatherData;
  const isLight = ["#83a4d4", "#b6fbff"];
  const isDark = ["#0F2027", "#203A43", "#2C5364"];
  const backgroundTheme = backDark ? isDark : isLight;
  const navigation = useNavigation();
  const [safe, setSafe] = useState(false);
  // Load custom fonts
  const loadFonts = async () => {
    await Font.loadAsync({
      "Poppins-Regular": require("../Fonts/Poppins-Regular.ttf"),
    });
    setFontLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  // Request location permission and fetch current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocate(currentLocation);
    })();
  }, []);

  // Fetch weather data for a specific location
  const handleLocation = (loc) => {
    setLocation([]);
    setShowSearch(false);
    setIsLoading(true);
    fetchWeatherForecast({
      cityName: loc.name,
      days: "7",
    }).then((data) => {
      setWeatherData(data);
      setIsLoading(false);
      storeData("city", loc.name);
    });
  };

  // Search for a city and update location results
  const handleSearch = (value) => {
    if (value.length > 2) {
      fetchLcationForecast({ cityName: value }).then((data) =>
        setLocation(data)
      );
    }

    setSafe(true);
  };

  const latitude = locate?.coords?.latitude;
  const longitude = locate?.coords?.longitude;

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    setbackDark(!backDark);
  };

  useEffect(() => {
    fetchMyWeatherData();
    getLocationName(latitude, longitude)
      .then((locationName) => {
        console.log("Current location name:", locationName);
        setCurrentLocation(locationName);
      })
      .catch((err) => {
        console.error("Error getting location name:", err);
      });
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData("city");
    let cityName = currentLocation;
    if (myCity) cityName = myCity;
    fetchWeatherForecast({ cityName, days: "7" }).then((data) =>
      setWeatherData(data)
    );
    setCurrentLocation(cityName);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  // Save the current location as a favorite
  const handleSaveFavorites = () => {
    if (location && !saveFav.some((fav) => fav.name === location.name)) {
      setSaveFav((prevFavs) => [...prevFavs, location]);
    }
    Alert.alert("Location saved successfully");
  };

  const handleRemoveFavorite = (locationToRemove) => {
    // Filter out the selected location from the saveFav array
    setSaveFav((prevFavs) =>
      prevFavs.filter((fav) => fav.name !== locationToRemove.name)
    );
    Alert.alert("Location removed from favorites");
  };

  // ----------------------------------------------

  // console.log(saveFav);
  const handleLocationFavorites = () => {
    navigation.navigate("Locations", {
      backDark,
      currentLocation,
      saveFav,
      handleRemoveFavorite,
    });
  };

  useEffect(() => {}, [location]);

  return (
    <LinearGradient
      colors={backgroundTheme}
      style={{ flex: 1, padding: 10, marginTop: 30 }}
    >
      {isLoading ? (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Progress.Bar size={100} progress={0.5} color="#49C6B7" />
        </View>
      ) : (
        <>
          <SafeAreaView
            style={[
              styles(theme).searchContainer,
              showSearch ? styles(theme).active : styles(theme).notActive,
            ]}
          >
            {showSearch ? (
              <TextInput
                onChangeText={handleTextDebounce}
                placeholder="Search for city"
                style={[styles(theme).searchInput]}
              />
            ) : null}
            <TouchableOpacity
              onPress={() => setShowSearch((show) => !show)}
              style={[styles(theme).favIcon]}
            >
              <FontAwesome
                name="search"
                size={23}
                style={[styles(theme).search]}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Switch onValueChange={toggleTheme} value={isDarkMode} />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLocationFavorites}>
              <MaterialIcons
                name="favorite"
                size={25}
                style={[styles(theme).favIcon]}
              />
            </TouchableOpacity>
          </SafeAreaView>

          <View>
            {locations.length > 0 && showSearch ? (
              <View style={styles(theme).locations}>
                {locations.map((loc, index) => {
                  let showBorder = index + 1 != locations.length;
                  return (
                    <TouchableOpacity
                      onPressIn={() => handleLocation(loc)}
                      key={index}
                      style={[
                        styles(theme).locationText,
                        showBorder ? styles(theme).locationBorder : "",
                      ]}
                      onPress={() => setLocation([])}
                    >
                      <EvilIcons name="location" size={24} color="black" />
                      <Text style={{ fontFamily: "Poppins-Regular" }}>
                        {loc?.name}, {loc?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>

          {/* Display Weather Information */}
          <View style={{ display: "flex", marginHorizontal: 5, flex: 1 }}>
            <Text
              style={{
                fontSize: 35,
                textAlign: "center",
                fontWeight: "bold",
                color: "#fff",
                fontFamily: "Poppins-Regular",
                marginVertical: 15,
              }}
            >
              {location?.name}
              {location?.name && ","} {""}
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "900",
                  color: "#fff",
                  fontFamily: "Poppins-Regular",
                }}
              >
                {location?.country}
              </Text>
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Image
                source={weatherImages[current?.condition?.text]}
                style={{ width: 200, height: 200 }}
              />
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  // gap: 30,
                }}
              >
                <Text
                  style={{
                    fontSize: 65,
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#fff",
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  {current?.temp_c}&#176;
                </Text>
              </View>
              <Text
                style={{
                  textAlign: "center",
                  color: "#eee",
                  marginBottom: 15,
                  fontFamily: "Poppins-Regular",
                }}
              >
                {current?.condition?.text}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                // marginVertical: 6,
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Feather name="wind" size={22} color="white" />
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 4,
                    color: "#fff",
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  {current?.wind_kph} km
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Entypo name="drop" size={22} color="white" />
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 4,
                    color: "#fff",
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  {current?.humidity}%
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome5 name="temperature-low" size={22} color="white" />
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 4,
                    color: "#fff",
                    fontFamily: "Poppins-Regular",
                  }}
                >
                  {current?.feelslike_c}&#176;
                </Text>
              </View>

              {/* {safe && ( */}
              <TouchableOpacity
                onPress={handleSaveFavorites}
                // onPress={handleSaveFavorites}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "red",
                }}
              >
                <Fontisto name="favorite" size={25} color="white" />
                <Text style={{ color: "white" }}>Save</Text>
              </TouchableOpacity>
              {/* )} */}
            </View>

            <View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {weatherData?.forecast?.forecastday?.map((day, index) => {
                  let date = new Date(day.date);
                  let options = { weekday: "long" };
                  let dayName = date.toLocaleDateString("en-US", options);
                  dayName = dayName.split(",")[0];

                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        backgroundColor: "#00000033",
                        padding: 15,
                        borderRadius: 10,
                        width: 140,
                        marginVertical: 10,
                        marginRight: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          textAlign: "center",
                          color: "#fff",
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        {dayName}
                      </Text>
                      <Image
                        source={weatherImages[day?.day?.condition?.text]}
                        style={{ width: 100, height: 100, alignSelf: "center" }}
                      />
                      <Text
                        style={{
                          fontSize: 16,
                          textAlign: "center",
                          color: "#fff",
                          fontFamily: "Poppins-Regular",
                        }}
                      >
                        {day?.day?.avgtemp_c}&#176;
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </>
      )}
    </LinearGradient>
  );
}

const lightTheme = {
  backgroundColor: "#fff",
  // color: "#000",
  color: "#83a4d4",
};

const darkTheme = {
  backgroundColor: "#203A43",
  color: "#fff",
};
const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    searchInput: {
      opacity: 90,
      paddingLeft: 15,
      flex: 1,
      color: theme.color,
    },
    searchContainer: {
      backgroundColor: theme.backgroundColor,
      marginVertical: 10,
      borderRadius: 25,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      color: theme.color,
    },
    active: {
      borderColor: "#eee",
      borderWidth: 1,
      paddingVertical: 1,
      paddingLeft: 5,
      paddingRight: 25,
    },
    notActive: {
      padding: 10,
      justifyContent: "space-around",
    },
    locations: {
      position: "absolute",
      width: "100%",
      backgroundColor: theme.backgroundColor,
      top: 5,
      borderRadius: 20,
      zIndex: 99,
      // paddingVertical: 5,
    },
    locationText: {
      flexDirection: "row",
      alignItems: "center",
      borderBottomColor: "#eee",
      paddingVertical: 6,
      paddingHorizontal: 10,
    },
    locationBorder: {
      borderBottomWidth: 1,
    },
    favIcon: {
      padding: 7,
      marginLeft: 10,
      opacity: 5,
      borderRadius: 100,
      color: theme.backgroundColor,
      backgroundColor: theme.color,
    },
    searchIcon: {
      borderRadius: 100,
      padding: 5,
      opacity: 5,
      color: theme.backgroundColor,
      backgroundColor: theme.color,
    },
    search: {
      color: theme.backgroundColor,
      margin: 3,
    },
  });
