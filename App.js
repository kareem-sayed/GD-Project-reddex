import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Splash Screen
import SplashScreen from "./screens/SplashScreen";
// Onboarding Screens
import WelcomeScreen from "./screens/onboarding/WelcomeScreen";
import TrackingScreen from "./screens/onboarding/TrackingScreen";
import AlertScreen from "./screens/onboarding/AlertScreen";
import ReadyScreen from "./screens/onboarding/ReadyScreen";
import RoleSelectScreen from "./screens/onboarding/RoleSelectScreen";
// Patient SIGNUP/IN Screens
import PatientSignupFlow from "./screens/auth/patient/PatientSignupFlow";
import SignupSuccessScreen from "./screens/auth/patient/SignupSuccess";
import Registerpage from "./screens/auth/patient/patientRegister/Registerpage";
import ResetPassword from "./screens/auth/patient/resetPassword/resetPassword";
// Patient Home Screens
import HomeScreen from "./screens/auth/patient/HomeScreens/HomeScreen";
// Patient Search Screens
import SearchScreen from "./screens/auth/patient/SearchScreen";

// Patient Profile Screens
import EditAccount from "./screens/auth/patient/EditAccount/EditAccount";
import ProfileSettings from "./screens/auth/patient/ProfileSettings/profileSettings";

// Doctor SIGNUP/IN Screens
import DoctorSignupFlow from "./screens/auth/doctor/doctor-signup/Doctorsignupflow";
import SignupDoneScreen from "./screens/auth/doctor/SignupDone";
import DoctorLogin from "./screens/auth/doctor/doctorRegister/doctorResiter";
// Doctor Home Screens
import DoctorHomeScreen from "./screens/auth/doctor/home/DoctorHomeScreen";
import NotificationsScreen from "./screens/auth/doctor/home/NotificationsScreen";
import AllRequestsScreen from "./screens/auth/doctor/home/AllRequestsScreen";
// Doctor Patients Screens
import PatientsScreen from "./screens/auth/doctor/patients/PatientsScreen";
import CriticalCondition from "./screens/auth/doctor/patients/CriticalCondition";
import StableCondition from "./screens/auth/doctor/patients/StableCondition";
import FollowUpScreen from "./screens/auth/doctor/patients/FollowUpScreen";
import MedicationsScreen from "./screens/auth/doctor/patients/MedicationsScreen";
// Doctor Profile Screens
import DoctorProfileScreen from "./screens/auth/doctor/profile/DoctorProfileScreen";
import EditProfileScreen from "./screens/auth/doctor/profile/EditProfileScreen";
import AccountSettings from "./screens/auth/doctor/profile/AccountSettings";
import HelpScreen from "./screens/auth/doctor/profile/HelpScreen";
// Navigation
import TabsNavigation from "./navigation/TabsNavigation";
import DoctorTaps from "./navigation/DoctorTaps";
//components

import { I18nManager } from "react-native";

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Splash Screen */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        {/* Onboarding Screens */}
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="TrackingScreen" component={TrackingScreen} />
        <Stack.Screen name="AlertScreen" component={AlertScreen} />
        <Stack.Screen name="ReadyScreen" component={ReadyScreen} />
        <Stack.Screen name="RoleSelectScreen" component={RoleSelectScreen} />
        {/* Patient Screens */}
        <Stack.Screen name="PatientSignupFlow" component={PatientSignupFlow} />
        <Stack.Screen name="SignupSuccess" component={SignupSuccessScreen} />
        <Stack.Screen name="Registerpage" component={Registerpage} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        {/* Patient Home Screens */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="NotificationsScreen"
          component={NotificationsScreen}
          options={{ headerShown: false }}
        />
        {/* Patient Search Screens */}
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        {/* Patient Profile Screens */}
        <Stack.Screen name="EditAccount" component={EditAccount} />
        <Stack.Screen name="profileSettings" component={ProfileSettings} />
        {/* Doctor SIGNUP/IN Screens */}
        <Stack.Screen name="DoctorSignupFlow" component={DoctorSignupFlow} />
        <Stack.Screen name="signupDone" component={SignupDoneScreen} />
        <Stack.Screen name="doctorLogin" component={DoctorLogin} />
        {/* Doctor Home Screens */}
        <Stack.Screen name="DoctorHomeScreen" component={DoctorHomeScreen} />
        <Stack.Screen name="AllRequestsScreen" component={AllRequestsScreen} />
        {/* Doctor Profile Screens */}
        <Stack.Screen
          name="DoctorProfileScreen"
          component={DoctorProfileScreen}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{ title: "الملف الشخصي" }}
        />
        <Stack.Screen name="AccountSettings" component={AccountSettings} />
        <Stack.Screen name="HelpScreen" component={HelpScreen} />
        {/* Doctor Patients Screens */}
        <Stack.Screen name="PatientsScreen" component={PatientsScreen} />
        <Stack.Screen name="CriticalCondition" component={CriticalCondition} />
        <Stack.Screen name="StableCondition" component={StableCondition} />
        <Stack.Screen name="FollowUpScreen" component={FollowUpScreen} />
        <Stack.Screen name="MedicationsScreen" component={MedicationsScreen} />
        {/* Main Tabs Navigation */}
        <Stack.Screen
          name="MainTabs"
          component={TabsNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DoctorTaps"
          component={DoctorTaps}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
