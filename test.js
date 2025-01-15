// import Entypo from "@expo/vector-icons/Entypo";
// import EvilIcons from "@expo/vector-icons/EvilIcons";
// import Feather from "@expo/vector-icons/Feather";
// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
// import { debounce } from "lodash";
// import * as Progress from "react-native-progress";
// import React, { useCallback, useEffect, useState } from "react";
// import {
//   Image,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
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

//   //   const handleLocation = (loc) => {
//   //     setLocation([]);
//   //     setShowSearch(false);
//   //     setIsLoading(true);
//   //     fetchWeatherForecast({
//   //       cityName: loc.name,
//   //       days: "7",
//   //     }).then((data) => {
//   //       setWeatherData(data);
//   //       setIsLoading(false);
//   //       storeData("city", loc.name);
//   //     });
//   //   };

//   //   const handleSearch = (value) => {
//   //     if (value.length > 2) {
//   //       fetchLcationForecast({ cityName: value }).then((data) =>
//   //         setLocation(data)
//   //       );
//   //     }
//   //   };

//   //   useEffect(() => {
//   //     fetchMyWeatherData();
//   //   }, []);

//   //   const fetchMyWeatherData = async () => {
//   //     let myCity = await getData("city");
//   //     let cityName = "Abuja";
//   //     if (myCity) cityName = myCity;
//   //     fetchWeatherForecast({ cityName, days: "7" }).then((data) =>
//   //       setWeatherData(data)
//   //     );
//   //     setIsLoading(false);
//   //   };

//   //   const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

//   //   const { current, location } = weatherData;

//   const handleLocation = (loc) => {
//     setLocations([]);
//     setShowSearch(false);
//     setIsLoading(true);
//     fetchWeatherForecast({ cityName: loc.name, days: "7" }).then((data) => {
//       setWeatherData(data);
//       setIsLoading(false);
//       storeData("city", loc.name); // Assuming storeData is a function that stores data locally
//     });
//   };

//   // Function to handle search input and fetch location suggestions
//   const handleSearch = (value) => {
//     if (value.length > 2) {
//       fetchLocationForecast({ cityName: value }).then((data) =>
//         setLocations(data)
//       );
//     }
//   };

//   // Debouncing the search input to prevent API overloading
//   const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

//   // Function to fetch default weather data on app load
//   const fetchMyWeatherData = async () => {
//     let myCity = await getData("city"); // Assuming getData is a function that retrieves locally stored data
//     let cityName = "Abuja";
//     if (myCity) cityName = myCity;
//     fetchWeatherForecast({ cityName, days: "7" }).then((data) =>
//       setWeatherData(data)
//     );
//     setIsLoading(false);
//   };

//   // Fetch default weather data on initial render
//   useEffect(() => {
//     fetchMyWeatherData();
//   }, []);

//   const { current, location } = weatherData || {};

//   return (
//     <View
//       style={{
//         backgroundColor: "#2C2D35",
//         height: "100%",
//         paddingTop: 50,
//         paddingHorizontal: 20,
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
//                       <Text>
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
//               }}
//             >
//               {location?.name}, {""}
//               <Text style={{ fontSize: 15, fontWeight: "900", color: "#ffff" }}>
//                 {location?.country}
//               </Text>
//             </Text>

//             {/* location image */}
//             <View style={{ flexDirection: "row", justifyContent: "center" }}>
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
//                   fontSize: 55,
//                   textAlign: "center",
//                   fontWeight: "bold",
//                   color: "#FFD700",
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
//             <View style={{ marginBottom: 5 }}>
//               <View
//                 style={{
//                   display: "flex",
//                   flexDirection: "row",
//                   alignItems: "center",
//                   marginHorizontal: 5,
//                 }}
//               >
//                 <FontAwesome name="calendar" size={24} color="#FFF" />
//                 <Text
//                   style={{ color: "#fff", fontSize: 15, paddingHorizontal: 15 }}
//                 >
//                   Daily Forecast
//                 </Text>
//               </View>
//               <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//                 {weatherData?.forecast?.forecastday?.map((item, index) => {
//                   let date = new Date(item.date);
//                   let options = { weekday: "long" };
//                   let dayName = date.toLocaleDateString("en-US", options);
//                   dayName = dayName.split(",")[0];
//                   return (
//                     <View
//                       key={index}
//                       style={{
//                         display: "flex",
//                         justifyContent: "center",
//                         alignItems: "center",
//                         padding: 15,
//                         borderRadius: 5,
//                         marginTop: 25,
//                         marginRight: 8,
//                         backgroundColor: "rgba(255, 255, 255, 0.8)",
//                       }}
//                     >
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
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   searchContainer: {
//     opacity: 90,
//     borderRadius: 40,
//     padding: 2,
//     flexDirection: "row",
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },

//   active: {
//     backgroundColor: "#FFFFFF",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.5,
//     shadowRadius: 4,
//     elevation: 5,
//   },

//   notActive: {
//     backgroundColor: "transparent",
//   },

//   locations: {
//     position: "absolute",
//     marginRight: 0,
//     top: 10,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 10,
//     padding: 10,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.8,
//     shadowRadius: 2,
//     elevation: 5,
//     zIndex: 100,
//     width: "100%",
//     maxHeight: 200,
//     overflow: "scroll",
//   },
//   locationText: {
//     marginHorizontal: 5,
//     padding: 10,
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     marginLeft: 0,
//     paddingLeft: 2,
//   },

//   locationBorder: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#D3D3D3",
//     paddingBottom: 5,
//     marginBottom: 7,
//   },
// });
