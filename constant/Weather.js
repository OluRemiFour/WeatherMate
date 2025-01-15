import axios from "axios";
import { EXPO_PUBLIC_API_KEY } from "@env";

const forecastEndpoint = (
  params
) => `https://api.weatherapi.com/v1/forecast.json?key=${EXPO_PUBLIC_API_KEY}&q=${params.cityName}&days=${params.days}&alerts=no
`;

const locationEndpoint = (
  params
) => `https://api.weatherapi.com/v1/search.json?key=${EXPO_PUBLIC_API_KEY}&q=${params.cityName}
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
  const privateKey = EXPO_PUBLIC_API_KEY;
  const url = `http://api.weatherapi.com/v1/current.json?key=${privateKey}&q=${latitude},${longitude}`;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const location = response.data.location;
      const locationName = `${location.name}, ${location.region}, ${location.country}`;
      return locationName;
    } else {
      console.error("Error fetching location data:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
};
export const weatherImages = {
  Sunny: require("../assets/sun.png"),
  Clear: require("../assets/sun.png"),
  "Partly cloudy": require("../assets/partlycloudy.png"),
  Cloudy: require("../assets/cloud.png"),
  Overcast: require("../assets/cloud.png"),
  Mist: require("../assets/cloud.png"),
  "Patchy rain possible": require("../assets/moderaterain.png"),
  "Light rain": require("../assets/moderaterain.png"),
  "Moderate rain": require("../assets/moderaterain.png"),
  Rain: require("../assets/heavyrain.png"),
  Rainy: require("../assets/heavyrain.png"),
  "Heavy rain": require("../assets/heavyrain.png"),
  "Thundery outbreaks possible": require("../assets/moderaterain.png"),
  "Light snow": require("../assets/partlycloudy.png"),
  Snow: require("../assets/partlycloudy.png"),
  "Moderate snow": require("../assets/partlycloudy.png"),
  "Heavy snow": require("../assets/partlycloudy.png"),
  Fog: require("../assets/moderaterain.png"),
  "Freezing fog": require("../assets/partlycloudy.png"),
  "Patchy sleet possible": require("../assets/partlycloudy.png"),
  "Moderate or heavy sleet": require("../assets/partlycloudy.png"),
  "Moderate or heavy freezing rain": require("../assets/heavyrain.png"),
  "Moderate or heavy rain with thunder": require("../assets/moderaterain.png"),
  "Patchy light rain with thunder": require("../assets/moderaterain.png"),
  Other: require("../assets/moderaterain.png"),
};
