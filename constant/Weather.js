import axios from "axios";
// import { apikey } from "../constant/index";

// const forecastEndpoint = (
//   params
// ) => `https://api.weatherapi.com/v1/forecast.json?key=${"2cc36e3da7f5460a818125328241509"}&q=${
//   params.cityName
//   // }&days=1&${params.days}=no&alerts=no
// }&days=${params.days}=no&alerts=no
// `;

const forecastEndpoint = (
  params
) => `https://api.weatherapi.com/v1/forecast.json?key=2cc36e3da7f5460a818125328241509&q=${params.cityName}&days=${params.days}&alerts=no
`;

const locationEndpoint = (
  params
) => `https://api.weatherapi.com/v1/search.json?key=${"2cc36e3da7f5460a818125328241509"}&q=${
  params.cityName
}
`;

const apiCall = async (endpoint) => {
  const options = {
    method: "GET",
    url: endpoint,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch weather data");
  }
};

export const fetchWeatherForecast = (params) => {
  return apiCall(forecastEndpoint(params));
};
export const fetchLcationForecast = (params) => {
  return apiCall(locationEndpoint(params));
};

export const getLocationName = async (latitude, longitude) => {
  const API_KEY = "2cc36e3da7f5460a818125328241509"; // Replace with your WeatherAPI key
  const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const location = response.data.location;
      const locationName = `${location.name}, ${location.region}, ${location.country}`;
      return locationName; // Returns the city, region, and country
    } else {
      console.error("Error fetching location data:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
};

// export const getLocationNameFromWeatherAPI = async (latitude, longitude) => {
//   const API_KEY = "2cc36e3da7f5460a818125328241509"; // Replace with your actual OpenWeatherMap API key
//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${"2cc36e3da7f5460a818125328241509"}`;

//   try {
//     const response = await axios.get(url);
//     if (response.status === 200) {
//       const locationName = response.data.name; // The name of the city
//       const country = response.data.sys.country; // The country code
//       return `${locationName}, ${country}`; // Combine city and country
//     } else {
//       console.error("Error fetching location data:", response.status);
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching location:", error);
//     return null;
//   }
// };

// export const weatherImages = {
//   "Partly cloudy": require("../assets/partlycloudy.png"),
//   "Moderate rain": require("../assets/moderaterain.png"),
//   "Patchy rain possible": require("../assets/moderaterain.png"),
//   "Sunny": require("../assets/sun.png"),
//   "Clear": require("../assets/sun.png"),
//   "Overcast": require("../assets/cloud.png"),
//   "Cloudy": require("../assets/cloud.png"),
//   "Light rain": require("../assets/moderaterain.png"),
//   "Moderate rain at times": require("../assets/moderaterain.png"),
//   "Heavy rain": require("../assets/heavyrain.png"),
//   "Heavy rain at times": require("../assets/heavyrain.png"),
//   "Moderate or heavy freezing rain": require("../assets/heavyrain.png"),
//   "Moderate or heavy rain shower": require("../assets/heavyrain.png"),
//   "Moderate or heavy rain with thunder": require("../assets/heavyrain.png"),
//   "other": require("../assets/moderaterain.png"),
// };

// export const getLocationNameFromWeatherAPI = async (latitude, longitude) => {
//   const API_KEY = "4fc3d74bc6bf06863807df060996aa40";
//   // const API_KEY = "eada368ca9b3e258bc58a212a582eb8e"; // Replace with your actual OpenWeatherMap API key
//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

//   try {
//     const response = await axios.get(url);
//     if (response.status === 200) {
//       const locationName = response.data.name; // The name of the city
//       const country = response.data.sys.country; // The country code
//       return `${locationName}, ${country}`; // Combine city and country
//     } else {
//       console.error("Error fetching location data:", response.status);
//       return null;
//     }
//   } catch (error) {
//     console.error("Error fetching location:", error);
//     return null;
//   }
// };

export const weatherImages = {
  "Sunny": require("../assets/sun.png"),
  "Clear": require("../assets/sun.png"),
  "Partly cloudy": require("../assets/partlycloudy.png"),
  "Cloudy": require("../assets/cloud.png"),
  "Overcast": require("../assets/cloud.png"),
  "Mist": require("../assets/cloud.png"),
  "Patchy rain possible": require("../assets/moderaterain.png"),
  "Light rain": require("../assets/moderaterain.png"),
  "Moderate rain": require("../assets/moderaterain.png"),
  "Rain": require("../assets/heavyrain.png"),
  "Rainy": require("../assets/heavyrain.png"),
  "Heavy rain": require("../assets/heavyrain.png"),
  "Thundery outbreaks possible": require("../assets/moderaterain.png"),
  "Light snow": require("../assets/partlycloudy.png"),
  "Snow": require("../assets/partlycloudy.png"),
  "Moderate snow": require("../assets/partlycloudy.png"),
  "Heavy snow": require("../assets/partlycloudy.png"),
  "Fog": require("../assets/moderaterain.png"),
  "Freezing fog": require("../assets/partlycloudy.png"),
  "Patchy sleet possible": require("../assets/partlycloudy.png"),
  "Moderate or heavy sleet": require("../assets/partlycloudy.png"),
  "Moderate or heavy freezing rain": require("../assets/heavyrain.png"),
  "Moderate or heavy rain with thunder": require("../assets/moderaterain.png"),
  "Patchy light rain with thunder": require("../assets/moderaterain.png"),
  "Other": require("../assets/moderaterain.png"),
};
