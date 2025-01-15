// import Entypo from "@expo/vector-icons/Entypo";
// import EvilIcons from "@expo/vector-icons/EvilIcons";
// import Feather from "@expo/vector-icons/Feather";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import * as Font from "expo-font";
// import * as Location from "expo-location";
// import { debounce } from "lodash";
// import React, { useCallback, useEffect, useState } from "react";
// import {
//   Image,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Switch,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   useColorScheme,
// } from "react-native";
// import * as Progress from "react-native-progress";
// import {
//   fetchLcationForecast,
//   fetchWeatherForecast,
//   weatherImages,
// } from "../constant/Weather";
// import { getData, storeData } from "../utils/asyncStorage,";

// export default function WeatherPage() {
//   const [showSearch, setShowSearch] = useState(false);
//   const [locations, setLocation] = useState([]);
//   const [weatherData, setWeatherData] = useState({});
//   const [isLoading, setIsLoading] = useState(true);
//   const [locate, setLocate] = useState(null);

//   const [fontLoaded, setFontLoaded] = useState(false);

//   const loadFonts = async () => {
//     await Font.loadAsync({
//       "Poppins-Regular": require("../Fonts/Poppins-Regular.ttf"),
//     });
//     setFontLoaded(true);
//   };

//   useEffect(() => {
//     loadFonts();
//   }, []);

//   //

//   const [errorMsg, setErrorMsg] = useState(null);
//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         setErrorMsg("Permission to access location was denied");
//         return;
//       }

//       let currentLocation = await Location.getCurrentPositionAsync({});
//       setLocate(currentLocation);
//     })();
//   }, []);

//   const handleLocation = (loc) => {
//     setLocation([]);
//     setShowSearch(false);
//     setIsLoading(true);
//     fetchWeatherForecast({
//       cityName: loc.name,
//       days: "7",
//     }).then((data) => {
//       setWeatherData(data);
//       setIsLoading(false);
//       storeData("city", loc.name);
//     });
//   };

//   const handleSearch = (value) => {
//     if (value.length > 2) {
//       fetchLcationForecast({ cityName: value }).then((data) =>
//         setLocation(data)
//       );
//     }
//   };

//   useEffect(() => {
//     fetchMyWeatherData();
//   }, []);

//   const fetchMyWeatherData = async () => {
//     let myCity = await getData("city");
//     // let cityName = "Abuja";
//     let cityName = locate;
//     if (myCity) cityName = myCity;
//     fetchWeatherForecast({ cityName, days: "7" }).then((data) =>
//       setWeatherData(data)
//     );
//     setIsLoading(false);
//   };

//   const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

//   const { current, location } = weatherData;

//   const [isDarkMode, setIsDarkMode] = useState(false); // State to track the current theme

//   // Toggle the theme between light and dark mode
//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   const theme = isDarkMode ? darkTheme : lightTheme;

//   return (
//     // <ScrollView style={styles(theme).searchContainer}>
//     <ScrollView
//       style={{
//         paddingHorizontal: 25,
//         paddingVertical: "auto",
//         flex: 1,
//         display: "flex",
//       }}
//     >
//       {isLoading ? (
//         <View
//           style={{
//             flex: 1,
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Progress.Bar size={100} progress={0.5} color="#49C6B7" />
//         </View>
//       ) : (
//         <>
//           <SafeAreaView
//             style={[
//               styles.searchContainer,
//               showSearch ? styles.active : styles.notActive,
//             ]}
//           >
//             {showSearch ? (
//               <TextInput
//                 onChangeText={handleTextDebounce}
//                 placeholder="Search for city"
//                 style={{ opacity: 90, paddingLeft: 15, flex: 1 }}
//               />
//             ) : null}
//             <TouchableOpacity
//               onPress={() => setShowSearch((show) => !show)}
//               style={{
//                 borderRadius: 100,
//                 padding: 7,
//                 backgroundColor: "#8B95A2",
//                 opacity: 5,
//                 margin: 1,
//               }}
//             >
//               <FontAwesome
//                 name="search"
//                 size={20}
//                 color="black"
//                 style={{ padding: 5 }}
//               />
//             </TouchableOpacity>

//             <TouchableOpacity>
//               <Switch onPointerLeave={toggleTheme} />
//             </TouchableOpacity>
//           </SafeAreaView>
//           <View>
//             {locations.length > 0 && showSearch ? (
//               <View style={styles.locations}>
//                 {locations.map((loc, index) => {
//                   let showBorder = index + 1 != locations.length;
//                   return (
//                     <TouchableOpacity
//                       onPressIn={() => handleLocation(loc)}
//                       key={index}
//                       style={[
//                         styles.locationText,
//                         showBorder ? styles.locationBorder : "",
//                       ]}
//                       onPress={() => setLocation([])}
//                     >
//                       <EvilIcons name="location" size={24} color="black" />
//                       <Text style={{ fontFamily: "Poppins-Regular" }}>
//                         {loc?.name}, {loc?.country}
//                       </Text>
//                     </TouchableOpacity>
//                   );
//                 })}
//               </View>
//             ) : null}
//           </View>

//           {/* forecast section */}
//           <View
//             style={{
//               display: "flex",
//               marginHorizontal: 5,
//               justifyContent: "space-around",
//               flex: 1,
//               marginBottom: 4,
//             }}
//           >
//             {/* location */}
//             <Text
//               style={{
//                 fontSize: 25,
//                 textAlign: "center",
//                 fontWeight: "bold",
//                 color: "#fff",
//                 fontFamily: "Poppins-Regular",
//               }}
//             >
//               {location?.name}, {""}
//               <Text
//                 style={{
//                   fontSize: 15,
//                   fontWeight: "900",
//                   color: "#ffff",
//                   fontFamily: "Poppins-Regular",
//                 }}
//               >
//                 {location?.country}
//               </Text>
//             </Text>

//             {/* location image */}
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "center",
//                 marginTop: "auto",
//               }}
//             >
//               <Image
//                 source={weatherImages[current?.condition?.text]}
//                 // source={{ uri: "https:" + current?.condition?.icon }}
//                 style={{ width: 200, height: 200 }}
//               />
//             </View>

//             {/* degree celcius */}
//             <View>
//               <Text
//                 style={{
//                   fontSize: 65,
//                   textAlign: "center",
//                   fontWeight: "bold",
//                   // color: "#FFD700",
//                   color: "#FFf",
//                   fontFamily: "Poppins-Regular",
//                 }}
//               >
//                 {current?.temp_c}&#176;
//               </Text>
//               <Text
//                 style={{
//                   textAlign: "center",
//                   color: "#fff",
//                   fontSize: 20,
//                   letterSpacing: 2,
//                 }}
//               >
//                 {current?.condition?.text}
//               </Text>
//             </View>

//             {/* other stats */}
//             <View
//               style={{
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 marginHorizontal: 4,
//                 marginTop: 70,
//               }}
//             >
//               <View style={{ flexDirection: "column", alignItems: "center" }}>
//                 <Feather name="wind" size={30} color="#fff" />
//                 <Text style={{ color: "#fff", fontSize: 20 }}>
//                   {current?.wind_kph}km
//                 </Text>
//               </View>
//               <View style={{ flexDirection: "column", alignItems: "center" }}>
//                 <Entypo name="drop" size={30} color="#fff" />
//                 <Text style={{ color: "#fff", fontSize: 20 }}>
//                   {current?.humidity}%
//                 </Text>
//               </View>
//               <View style={{ flexDirection: "column", alignItems: "center" }}>
//                 <FontAwesome5 name="cloud-sun" size={30} color="#fff" />
//                 <Text style={{ color: "#fff", fontSize: 20 }}>
//                   {location?.localtime?.split(" ")[1]}
//                 </Text>
//               </View>
//             </View>

//             {/* forecast for next 7 dasy */}
//             {/* <View style={{ marginBottom: 5 }}> */}
//             <View style={{ marginTop: 25 }}>
//               <View
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   alignItems: "center",
//                   marginHorizontal: 5,
//                 }}
//               >
//                 <FontAwesome name="calendar" size={24} color="#FFF" />
//                 <Text style={styles.forecastDetails}>Daily Forecast</Text>
//               </View>
//               <ScrollView
//                 style={{ marginTop: 35 }}
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//               >
//                 {weatherData?.forecast?.forecastday?.map((item, index) => {
//                   let date = new Date(item.date);
//                   let options = { weekday: "long" };
//                   let dayName = date.toLocaleDateString("en-US", options);
//                   dayName = dayName.split(",")[0];
//                   return (
//                     <View key={index} style={styles.locationDetails}>
//                       <Image
//                         source={weatherImages[item?.day?.condition?.text]}
//                         style={{ height: 65, width: 65 }}
//                       />
//                       <Text>{dayName}</Text>
//                       <Text style={{ fontSize: 30, fontWeight: "bold" }}>
//                         {item?.day?.avgtemp_c}&#176;
//                       </Text>
//                     </View>
//                   );
//                 })}
//               </ScrollView>
//             </View>
//           </View>
//         </>
//       )}
//     </ScrollView>
//   );
// }

// // const styles = StyleSheet.create({
// //   searchContainer: {
// //     opacity: 90,
// //     borderRadius: 40,
// //     padding: 2,
// //     flexDirection: "row",
// //     justifyContent: "flex-end",
// //     alignItems: "center",
// //   },

// //   active: {
// //     backgroundColor: "#FFFFFF",
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.5,
// //     shadowRadius: 4,
// //     elevation: 5,
// //   },

// //   notActive: {
// //     backgroundColor: "transparent",
// //   },

// //   locations: {
// //     position: "absolute",
// //     marginRight: 0,
// //     top: 10,
// //     backgroundColor: "#FFFFFF",
// //     borderRadius: 10,
// //     padding: 10,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.8,
// //     shadowRadius: 2,
// //     elevation: 5,
// //     zIndex: 100,
// //     width: "100%",
// //     maxHeight: 200,
// //     overflow: "scroll",
// //   },
// //   locationText: {
// //     marginHorizontal: 5,
// //     padding: 10,
// //     display: "flex",
// //     flexDirection: "row",
// //     justifyContent: "flex-start",
// //     alignItems: "center",
// //     marginLeft: 0,
// //     paddingLeft: 2,
// //   },

// //   locationBorder: {
// //     borderBottomWidth: 1,
// //     borderBottomColor: "#D3D3D3",
// //     paddingBottom: 5,
// //     marginBottom: 7,
// //   },

// //   locationDetails: {
// //     display: "flex",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     padding: 15,
// //     borderRadius: 5,
// //     marginRight: 8,
// //     backgroundColor: "rgba(255, 255, 255, 0.8)",
// //   },

// //   forecastDetails: {
// //     color: "#fff",
// //     fontSize: 15,
// //     paddingHorizontal: 15,
// //   },
// // });

// const lightTheme = {
//   background: "#F0F8FF", // Light sky blue for weather app background
//   textPrimary: "#000000", // Dark text for readability in light mode
//   cardBackground: "#FFFFFF", // White for cards or containers
//   border: "#D3D3D3", // Light gray for borders
//   shadowColor: "#000000", // Dark shadow color
//   locationBackground: "rgba(255, 255, 255, 0.9)", // Slightly transparent white
// };

// const darkTheme = {
//   background: "#1E1E1E", // Dark gray for background in dark mode
//   textPrimary: "#FFFFFF", // Light text for contrast
//   cardBackground: "#2C2C2C", // Darker gray for containers or cards
//   border: "#484848", // Medium gray for borders
//   shadowColor: "#FFFFFF", // Light shadow for contrast
//   locationBackground: "rgba(50, 50, 50, 0.8)", // Dark, slightly transparent gray
// };

// const styles = (theme) =>
//   StyleSheet.create({
//     container: {
//       backgroundColor: theme.cardBackground,
//       paddingTop: 50,
//       paddingHorizontal: 20, // App background depending on theme
//     },
//     searchContainer: {
//       opacity: 0.9,
//       borderRadius: 40,
//       padding: 2,
//       flexDirection: "row",
//       justifyContent: "flex-end",
//       alignItems: "center",
//       backgroundColor: theme.cardBackground, // Card background depending on theme
//     },

//     active: {
//       backgroundColor: theme.cardBackground, // Card background for active state
//       shadowColor: theme.shadowColor,
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.5,
//       shadowRadius: 4,
//       elevation: 5,
//     },

//     notActive: {
//       backgroundColor: "transparent",
//     },

//     locations: {
//       position: "absolute",
//       marginRight: 0,
//       top: 10,
//       backgroundColor: theme.locationBackground, // Slightly transparent location background
//       borderRadius: 10,
//       padding: 10,
//       shadowColor: theme.shadowColor,
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.8,
//       shadowRadius: 2,
//       elevation: 5,
//       zIndex: 100,
//       width: "100%",
//       maxHeight: 200,
//       overflow: "scroll",
//     },

//     locationText: {
//       marginHorizontal: 5,
//       padding: 10,
//       display: "flex",
//       flexDirection: "row",
//       justifyContent: "flex-start",
//       alignItems: "center",
//       marginLeft: 0,
//       paddingLeft: 2,
//       color: theme.textPrimary, // Text color based on theme
//     },

//     locationBorder: {
//       borderBottomWidth: 1,
//       borderBottomColor: theme.border,
//       paddingBottom: 5,
//       marginBottom: 7,
//     },

//     locationDetails: {
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       padding: 15,
//       borderRadius: 5,
//       marginRight: 8,
//       backgroundColor: theme.cardBackground, // Card background for location details
//     },

//     forecastDetails: {
//       color: theme.textPrimary, // Text color based on theme
//       fontSize: 15,
//       paddingHorizontal: 15,
//     },
//   });

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
