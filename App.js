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



import DoctorSignupFlow from "./screens/auth/doctor/doctor-signup/Doctorsignupflow";
import SignupDoneScreen from "./screens/auth/doctor/SignupDone";
import DoctorLogin from "./screens/auth/doctor/doctorRegister/doctorResiter";
import DoctorHomeScreen from "./screens/auth/doctor/home/DoctorHomeScreen";
import NotificationsScreen from "./screens/auth/doctor/home/NotificationsScreen";

import Registerpage from "./screens/auth/patient/patientRegister/Registerpage";

import ResetPassword from "./screens/auth/patient/resetPassword/resetPassword";
import TabsNavigation from "./navigation/TabsNavigation";
import EditAccount from "./screens/auth/patient/EditAccount/EditAccount";
import ProfileSettings from "./screens/auth/patient/ProfileSettings/profileSettings";

import UploadFileScreen from "./screens/auth/patient/InsertAnalysis/UploadFileScreen";
import ManualInputScreen from "./screens/auth/patient/InsertAnalysis/ManualInputScreen";

import ChatScreen from "./screens/auth/patient/chatScreen/ChatScreen";

import DoctorTaps from "./navigation/DoctorTaps"

//components


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
        <Stack.Screen name="Registerpage" component={Registerpage} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        
        <Stack.Screen name="SignupSuccess" component={SignupSuccessScreen} />
        <Stack.Screen name="DoctorSignupFlow" component={DoctorSignupFlow} />
        <Stack.Screen name="signupDone" component={SignupDoneScreen} />
        <Stack.Screen name="doctorLogin" component={DoctorLogin} />
        <Stack.Screen name="DoctorHomeScreen" component={DoctorHomeScreen} />
        <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{ headerShown: false }} />
        
        {/* analysisNAVigation */}
        <Stack.Screen name="UploadFileScreen" component={UploadFileScreen} />
        <Stack.Screen name="ManualInputScreen" component={ManualInputScreen} />
        {/* chatBot */}
        <Stack.Screen name="ChatScreen" component={ChatScreen} />

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

        <Stack.Screen name="EditAccount" component={EditAccount} />
        <Stack.Screen name="profileSettings" component={ProfileSettings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
