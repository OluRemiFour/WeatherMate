import { createStackNavigator } from "@react-navigation/stack";
import FirstScreen from "./FirstScreen";
import FourthScreen from "./FourthScreen";
import HomeScreen from "./HomeScreen";
import Locations from "./Locations";
import SecondScreen from "./SecondScreen";
import ThirdScreen from "./ThirdScreen";
import WeatherPage from "./WeatherPage";

const Stack = createStackNavigator();
export default function MyStacks() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="First" component={FirstScreen} />
      <Stack.Screen name="Second" component={SecondScreen} />
      <Stack.Screen name="Third" component={ThirdScreen} />
      <Stack.Screen name="Fourth" component={FourthScreen} />
      <Stack.Screen name="WeatherPage" component={WeatherPage} />
      <Stack.Screen name="Locations" component={Locations} />
    </Stack.Navigator>
  );
}
