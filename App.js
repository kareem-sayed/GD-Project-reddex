import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./screens/SplashScreen";
import WelcomeScreen from "./screens/onboarding/WelcomeScreen";
import TrackingScreen from "./screens/onboarding/TrackingScreen";
import AlertScreen from "./screens/onboarding/AlertScreen";
import ReadyScreen from "./screens/onboarding/ReadyScreen";
import RoleSelectScreen from "./screens/onboarding/RoleSelectScreen";

import PatientSignupFlow from './screens/auth/patient/PatientSignupFlow';
import SignupSuccessScreen from './screens/auth/patient/SignupSuccess';
import HomeScreen from './screens/auth/patient/HomeScreen';
import DoctorSignupFlow from "./screens/auth/doctor/doctor-signup/Doctorsignupflow";

import { I18nManager } from "react-native";
I18nManager.forceRTL(true);
I18nManager.allowRTL(true); // يفضل أيضاً تفعيل هذا للسّماح بـ RTL

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="TrackingScreen" component={TrackingScreen} />
        <Stack.Screen name="AlertScreen" component={AlertScreen} />
        <Stack.Screen name="ReadyScreen" component={ReadyScreen} />
        <Stack.Screen name="RoleSelectScreen" component={RoleSelectScreen} />
        <Stack.Screen name="PatientSignupFlow" component={PatientSignupFlow} />
        <Stack.Screen name="SignupSuccess" component={SignupSuccessScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DoctorSignupFlow" component={DoctorSignupFlow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
