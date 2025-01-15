// import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
// import React from "react";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import { TouchableOpacity } from "react-native-gesture-handler";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// export default function Locations() {
//   return (
//     <SafeAreaView style={styles.container}>
//       <TouchableOpacity style={{ marginTop: 10 }}>
//         <Ionicons name="chevron-back-circle-sharp" size={30} color="black" />
//       </TouchableOpacity>
//       <View>
//         <ScrollView style={styles.locations}>
//           <View style={{ marginBottom: 20 }}>
//             <Text
//               style={{ fontWeight: "bold", marginBottom: 10, fontSize: 20 }}
//             >
//               Current Location
//             </Text>

//             <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
//               <MaterialIcons name="location-pin" size={18} color="black" />
//               <Text>Your Current Location</Text>
//             </View>
//           </View>
//           <View style={{ marginTop: 20 }}>
//             <Text
//               style={{ fontWeight: "bold", marginBottom: 10, fontSize: 20 }}
//             >
//               Saved Locations
//             </Text>
//             <View
//               style={{ flexDirection: "row", justifyContent: "space-between" }}
//             >
//               <Text>Location 1</Text>
//               <MaterialCommunityIcons
//                 name="delete-sweep"
//                 size={24}
//                 color="black"
//               />
//             </View>
//             <View
//               style={{ flexDirection: "row", justifyContent: "space-between" }}
//             >
//               <Text>Location 2</Text>
//               <MaterialCommunityIcons
//                 name="delete-sweep"
//                 size={24}
//                 color="black"
//               />
//             </View>
//           </View>
//           <View style={{ marginTop: 20 }}>
//             <Text
//               style={{ fontWeight: "bold", marginBottom: 10, fontSize: 20 }}
//             >
//               Add a New Location
//             </Text>
//           </View>
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 30,
//     paddingVertical: 40,
//   },

//   locations: {
//     fontSize: 30,
//     fontWeight: "bold",
//     marginBottom: 20,
//     marginTop: 30,
//     textAlign: "center",
//   },
// });

// import Ionicons from "@expo/vector-icons/Ionicons";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import { useNavigation } from "@react-navigation/native";
// import { LinearGradient } from "expo-linear-gradient";
// import React, { useEffect, useRef, useState } from "react";
// import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";

// export default function Locations({ route }) {
//   const { backDark, currentLocation, saveFav } = route.params;
//   const [favLocations, setFavLocations] = useState([]);
//   const [locations, setlocations] = useState();
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     handleFav();
//   }, []);

//   function handleFav() {
//     const flattenedFav = saveFav.flat(Infinity); // Infinity ensures all levels are flattened
//     setFavLocations(flattenedFav);
//   }

//   const handleDelete = () => {
//     setFavLocations((locations) => locations.slice(0, -1));
//   };
//   console.log(favLocations);
//   // Fade-in animation
//   React.useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1500,
//       useNativeDriver: true,
//     }).start();
//   }, [fadeAnim]);

//   const navigation = useNavigation();
//   const isLight = ["#83a4d4", "#b6fbff"];
//   const isDark = ["#0F2027", "#203A43", "#2C5364"];
//   const backgroundTheme = backDark ? isDark : isLight;

//   return (
//     <LinearGradient
//       colors={backgroundTheme}
//       style={{
//         paddingHorizontal: 30,
//         paddingVertical: 40,
//         backgroundColor: "#e6f7ff",
//         flex: 1,
//       }}
//     >
//       <TouchableOpacity
//         onPress={() => navigation.goBack()}
//         style={{ marginTop: 10 }}
//       >
//         <Ionicons name="chevron-back-circle-sharp" size={35} color="black" />
//       </TouchableOpacity>
//       <View>
//         <Animated.View style={[styles.locations, { opacity: fadeAnim }]}>
//           <ScrollView>
//             <View style={styles.locationSection}>
//               <Text style={styles.sectionHeader}>Current Location</Text>
//               <View style={styles.row}>
//                 <MaterialIcons name="location-pin" size={18} color="black" />
//                 <Text style={{ fontSize: 15 }}>{currentLocation}</Text>
//               </View>
//             </View>

//             <View style={styles.locationSection}>
//               <Text style={styles.sectionHeader}>Saved Locations</Text>
//               {favLocations.length > 0 ? (
//                 <View style={styles.rowBetween}>
//                   <Text>
//                     {favLocations?.map((loc, i) => (
//                       <View
//                         key={i}
//                         onPress={() =>
//                           navigation.navigate("WeatherPage", {
//                             location: loc,
//                           })
//                         }
//                       >
//                         {/* <View style={{ flexDirection: "row", gap: 5 }}> */}
//                         <Text>
//                           {loc?.map((locate, i) => (
//                             <View key={i}>
//                               <MaterialIcons
//                                 name="location-pin"
//                                 size={18}
//                                 color="black"
//                               />
//                               <Text>{locate.name}</Text>
//                             </View>
//                           ))}
//                         </Text>
//                         {/* </View> */}
//                       </View>
//                     ))}
//                   </Text>
//                   <TouchableOpacity onPress={handleDelete}>
//                     <MaterialCommunityIcons
//                       name="delete-sweep"
//                       size={30}
//                       color="black"
//                     />
//                   </TouchableOpacity>
//                 </View>
//               ) : (
//                 <Text>No favorite locations saved</Text>
//               )}
//               <View style={styles.rowBetween}></View>
//             </View>

//             <View style={styles.addLocation}>
//               <Text style={styles.sectionHeader}>Add a New Location</Text>
//             </View>
//           </ScrollView>
//         </Animated.View>
//       </View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 30,
//     paddingVertical: 40,
//     backgroundColor: "#e6f7ff", // Light sky blue background for weather theme
//     flex: 1,
//   },
//   locations: {
//     // flex: 1,
//     marginTop: 30,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   locationSection: {
//     marginBottom: 30,
//   },
//   sectionHeader: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#007acc" || "#0F2027", // A deep sky blue color
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//   },
//   rowBetween: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   addLocation: {
//     marginTop: 30,
//   },
// });

// import Ionicons from "@expo/vector-icons/Ionicons";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import { useNavigation } from "@react-navigation/native";
// import { LinearGradient } from "expo-linear-gradient";
// import React, { useEffect, useRef, useState } from "react";
// import { Animated, ScrollView, StyleSheet, Text, View } from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";

// export default function Locations({ route }) {
//   const { backDark, currentLocation, saveFav } = route.params;
//   const [favLocations, setFavLocations] = useState([]);
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const navigation = useNavigation();

//   // Flatten and set the favorite locations on component mount
//   useEffect(() => {
//     const flattenedFav = saveFav.flat(Infinity); // Ensure the array is flattened
//     setFavLocations(flattenedFav);
//   }, [saveFav]);

//   // Handle deletion of the last favorite location
//   const handleDelete = () => {
//     setFavLocations((locations) => locations.slice(0, -1));
//   };

//   // Fade-in animation for content
//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1500,
//       useNativeDriver: true,
//     }).start();
//   }, [fadeAnim]);

//   // Theme based on `backDark` prop
//   const isLight = ["#83a4d4", "#b6fbff"];
//   const isDark = ["#0F2027", "#203A43", "#2C5364"];
//   const backgroundTheme = backDark ? isDark : isLight;

//   return (
//     <LinearGradient colors={backgroundTheme} style={styles.container}>
//       {/* Back button */}
//       <TouchableOpacity
//         onPress={() => navigation.goBack()}
//         style={styles.backButton}
//       >
//         <Ionicons name="chevron-back-circle-sharp" size={35} color="black" />
//       </TouchableOpacity>

//       {/* Locations Content */}
//       <View>
//         <Animated.View style={[styles.locations, { opacity: fadeAnim }]}>
//           <ScrollView>
//             {/* Current Location */}
//             <View style={styles.locationSection}>
//               <Text style={styles.sectionHeader}>Current Location</Text>
//               <View style={styles.row}>
//                 <MaterialIcons name="location-pin" size={18} color="black" />
//                 <Text style={{ fontSize: 15 }}>{currentLocation}</Text>
//               </View>
//             </View>

//             {/* Favorite Locations */}
//             <View style={styles.locationSection}>
//               <Text style={styles.sectionHeader}>Saved Locations</Text>
//               {favLocations.length > 0 ? (
//                 favLocations.map((loc, i) => (
//                   <View key={i} style={styles.rowBetween}>
//                     <TouchableOpacity
//                       onPress={() =>
//                         navigation.navigate("WeatherPage", { location: loc })
//                       }
//                       style={styles.row}
//                     >
//                       <MaterialIcons
//                         name="location-pin"
//                         size={18}
//                         color="black"
//                       />
//                       <Text>{loc.name}</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={handleDelete}>
//                       <MaterialCommunityIcons
//                         name="delete-sweep"
//                         size={30}
//                         color="black"
//                       />
//                     </TouchableOpacity>
//                   </View>
//                 ))
//               ) : (
//                 <Text>No favorite locations saved</Text>
//               )}
//             </View>

//             {/* Add Location Section */}
//             <View style={styles.addLocation}>
//               <Text style={styles.sectionHeader}>Add a New Location</Text>
//             </View>
//           </ScrollView>
//         </Animated.View>
//       </View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 30,
//     paddingVertical: 40,
//     flex: 1,
//   },
//   backButton: {
//     marginTop: 10,
//   },
//   locations: {
//     marginTop: 30,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   locationSection: {
//     marginBottom: 30,
//   },
//   sectionHeader: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#007acc", // A deep sky blue color
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//   },
//   rowBetween: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginVertical: 10,
//   },
//   addLocation: {
//     marginTop: 30,
//   },
// });

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

// export default function Locations({ route }) {
//   const { backDark, currentLocation, saveFav, handleRemoveFavorite } =
//     route.params;
//   const [favLocations, setFavLocations] = useState([]);
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const navigation = useNavigation();

//   const isLight = ["#83a4d4", "#b6fbff"];
//   const isDark = ["#0F2027", "#203A43", "#2C5364"];
//   const backgroundTheme = backDark ? isDark : isLight;

//   useEffect(() => {
//     handleFav();
//     fadeIn();
//   }, []);

//   console.log(favLocations);
//   function handleFav() {
//     if (Array.isArray(saveFav)) {
//       const flattenedFav = saveFav?.flat(Infinity) || [];
//       setFavLocations(flattenedFav);
//     } else {
//       console.error("saveFav is not an array or is undefined");
//       setFavLocations([]);
//     }
//   }

//   // Fade-in animation for the locations container
//   const fadeIn = () => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1500,
//       useNativeDriver: true,
//     }).start();
//   };

//   // Function to remove the last favorite location
//   // const handleDelete = (name) => {
//   //   // setFavLocations((prevLocations) => prevLocations.slice(0, -1));
//   //   setFavLocations(
//   //     (prevLocations) =>
//   //       prevLocations.filter((location) => location.name !== name),
//   //     0
//   //   );
//   // };

//   return (
//     <LinearGradient colors={backgroundTheme} style={styles.container}>
//       <TouchableOpacity
//         onPress={() => navigation.goBack()}
//         style={{ marginTop: 10 }}
//       >
//         <Ionicons name="chevron-back-circle-sharp" size={35} color="black" />
//       </TouchableOpacity>

//       <View>
//         <Animated.View style={[styles.locations, { opacity: fadeAnim }]}>
//           <ScrollView>
//             {/* Current Location Section */}
//             <View style={styles.locationSection}>
//               <Text style={styles.sectionHeader}>Current Location</Text>
//               <View style={styles.row}>
//                 <MaterialIcons name="location-pin" size={18} color="black" />
//                 <Text style={{ fontSize: 15 }}>{currentLocation}</Text>
//               </View>
//             </View>

//             {/* Favorite Locations Section */}
//             <View style={styles.locationSection}>
//               <Text style={styles.sectionHeader}>Saved Locations</Text>
//               {favLocations.length > 0 ? (
//                 favLocations.map((loc, i) => (
//                   <View key={i} style={styles.rowBetween}>
//                     <TouchableOpacity
//                       onPress={() =>
//                         navigation.navigate("WeatherPage", { location: loc })
//                       }
//                       style={styles.row}
//                     >
//                       <MaterialIcons
//                         name="location-pin"
//                         size={18}
//                         color="black"
//                       />
//                       <Text>{loc.name}</Text>
//                     </TouchableOpacity>
//                     {/* <TouchableOpacity onPress={() => handleDelete(loc.name)}> */}
//                     <TouchableOpacity
//                       onPress={() => handleRemoveFavorite(loc)}
//                     >
//                       <MaterialCommunityIcons
//                         name="delete-sweep"
//                         size={30}
//                         color="black"
//                       />
//                     </TouchableOpacity>
//                   </View>
//                 ))
//               ) : (
//                 <Text>No favorite locations saved</Text>
//               )}
//             </View>

//             {/* Add New Location Section */}
//             <TouchableOpacity
//               onPress={() => navigation.goBack()}
//               style={styles.addLocation}
//             >
//               <Text style={styles.sectionHeader}>Add a New Location</Text>
//             </TouchableOpacity>
//           </ScrollView>
//         </Animated.View>
//       </View>
//     </LinearGradient>
//   );
// }

// export default function Locations({ route }) {
//   const { backDark, currentLocation, saveFav } = route.params;
//   const [favLocations, setFavLocations] = useState([]);
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const navigation = useNavigation();

//   const isLight = ["#83a4d4", "#b6fbff"];
//   const isDark = ["#0F2027", "#203A43", "#2C5364"];
//   const backgroundTheme = backDark ? isDark : isLight;

//   useEffect(() => {
//     handleFav();
//     fadeIn();
//   }, [saveFav]); // Update on saveFav change

//   function handleFav() {
//     if (Array.isArray(saveFav)) {
//       setFavLocations(saveFav); // Directly use saveFav
//     } else {
//       console.error("saveFav is not an array or is undefined");
//       setFavLocations([]);
//     }
//   }

//   const handleRemoveFavorite = (locationToRemove) => {
//     setFavLocations((prevFavs) =>
//       prevFavs.filter((fav) => fav.name !== locationToRemove.name)
//     );
//     Alert.alert("Location removed from favorites");

//     // favLocations
//   };

//   // Fade-in animation for the locations container
//   const fadeIn = () => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1500,
//       useNativeDriver: true,
//     }).start();
//   };

//   return (
//     <LinearGradient colors={backgroundTheme} style={styles.container}>
//       <TouchableOpacity
//         onPress={() => navigation.goBack()}
//         style={{ marginTop: 10 }}
//       >
//         <Ionicons name="chevron-back-circle-sharp" size={35} color="black" />
//       </TouchableOpacity>

//       <SafeAreaView>
//         <Animated.View style={[styles.locations, { opacity: fadeAnim }]}>
//           <ScrollView>
//             {/* Current Location Section */}
//             <View style={styles.locationSection}>
//               <Text style={styles.sectionHeader}>Current Location</Text>
//               <View style={styles.row}>
//                 <MaterialIcons name="location-pin" size={18} color="black" />
//                 <Text style={{ fontSize: 15 }}>{currentLocation}</Text>
//               </View>
//             </View>

//             {/* Favorite Locations Section */}
//             <View style={styles.locationSection}>
//               <Text style={styles.sectionHeader}>Saved Locations</Text>
//               {favLocations.length > 0 ? (
//                 favLocations.map((loc, i) => (
//                   <View key={i} style={styles.rowBetween}>
//                     <TouchableOpacity
//                       onPress={() =>
//                         navigation.navigate("WeatherPage", { location: loc })
//                       }
//                       style={styles.row}
//                     >
//                       <MaterialIcons
//                         name="location-pin"
//                         size={18}
//                         color="black"
//                       />
//                       <Text>{loc.name}</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => handleRemoveFavorite(loc)}>
//                       <MaterialCommunityIcons
//                         name="delete-sweep"
//                         size={30}
//                         color="black"
//                       />
//                     </TouchableOpacity>
//                   </View>
//                 ))
//               ) : (
//                 <Text>No favorite locations saved</Text>
//               )}
//             </View>

//             {/* Add New Location Section */}
//             <TouchableOpacity
//               onPress={() => navigation.goBack()}
//               style={styles.addLocation}
//             >
//               <Text style={styles.sectionHeader}>Add a New Location</Text>
//             </TouchableOpacity>
//           </ScrollView>
//         </Animated.View>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// }

import { useFocusEffect } from "@react-navigation/native";

// ...

export default function Locations({ route }) {
  const { backDark, currentLocation, saveFav } = route.params;
  const [favLocations, setFavLocations] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const isLight = ["#83a4d4", "#b6fbff"];
  const isDark = ["#0F2027", "#203A43", "#2C5364"];
  const backgroundTheme = backDark ? isDark : isLight;

  // Function to set favorites from route params
  const updateFavorites = () => {
    if (Array.isArray(saveFav)) {
      setFavLocations(saveFav);
    } else {
      setFavLocations([]);
    }
  };

  useEffect(() => {
    updateFavorites(); // Initial update
    setFavLocations([]); // Clear the state first
    fadeIn();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      updateFavorites(); // Update whenever the screen is focused
    }, [saveFav])
  );

  const handleRemoveFavorite = (locationToRemove) => {
    setFavLocations((prevFavs) =>
      prevFavs.filter((fav) => fav.name !== locationToRemove.name)
    );
    Alert.alert("Location removed from favorites");
  };

  // Fade-in animation for the locations container
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
