import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { I18nManager, View, Text } from "react-native";

import PatientProvider from "./backEnd/context/PatientContext";

import AuthProvider, { AuthContext } from "./backEnd/context/AuthContext";

// ================= AUTH =================

// Splash
import SplashScreen from "./screens/SplashScreen";

// Onboarding
import WelcomeScreen from "./screens/onboarding/WelcomeScreen";
import TrackingScreen from "./screens/onboarding/TrackingScreen";
import AlertScreen from "./screens/onboarding/AlertScreen";
import ReadyScreen from "./screens/onboarding/ReadyScreen";
import RoleSelectScreen from "./screens/onboarding/RoleSelectScreen";

// Patient Auth
import PatientSignupFlow from "./screens/auth/patient/PatientSignupFlow";
import SignupSuccessScreen from "./screens/auth/patient/SignupSuccess";
import Registerpage from "./screens/auth/patient/patientRegister/Registerpage";

// Doctor Auth
import DoctorSignupFlow from "./screens/auth/doctor/doctor-signup/Doctorsignupflow";
import SignupDoneScreen from "./screens/auth/doctor/SignupDone";
import DoctorLogin from "./screens/auth/doctor/doctorRegister/doctorLogin";
import ForgotPassword from "./screens/auth/doctor/doctorRegister/ForgotPassword";
import VerifyCode from "./screens/auth/doctor/doctorRegister/VerifyCode";
import ResetPassword from "./screens/auth/doctor/doctorRegister/ResetPassword";

// ================= PATIENT =================

import TabsNavigation from "./navigation/TabsNavigation";

import medicins from "./screens/auth/patient/HomeScreens/medicins";
import ChatScreen from "./screens/auth/patient/chatScreen/ChatScreen";

import UploadFileScreen from "./screens/auth/patient/InsertAnalysis/UploadFileScreen";
import ManualInputScreen from "./screens/auth/patient/InsertAnalysis/ManualInputScreen";

import EditAccount from "./screens/auth/patient/EditAccount/EditAccount";
import ProfileSettings from "./screens/auth/patient/ProfileSettings/profileSettings";

// ================= DOCTOR =================

import DoctorTaps from "./navigation/DoctorTaps";

import DoctorHomeScreen from "./screens/auth/doctor/home/DoctorHomeScreen";
import NotificationsScreen from "./screens/auth/doctor/home/NotificationsScreen";
import AllRequestsScreen from "./screens/auth/doctor/home/AllRequestsScreen";

import PatientsScreen from "./screens/auth/doctor/patients/PatientsScreen";
import CriticalCondition from "./screens/auth/doctor/patients/CriticalCondition";
import StableCondition from "./screens/auth/doctor/patients/StableCondition";
import FollowUpScreen from "./screens/auth/doctor/patients/FollowUpScreen";
import MedicationsScreen from "./screens/auth/doctor/patients/MedicationsScreen";

import DoctorProfileScreen from "./screens/auth/doctor/profile/DoctorProfileScreen";
import EditProfileScreen from "./screens/auth/doctor/profile/EditProfileScreen";
import AccountSettings from "./screens/auth/doctor/profile/AccountSettings";
import HelpScreen from "./screens/auth/doctor/profile/HelpScreen";

// ================= RTL =================

I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

// ================= STACKS =================

const Stack = createNativeStackNavigator();

const AuthStack = createNativeStackNavigator();
const PatientStack = createNativeStackNavigator();
const DoctorStack = createNativeStackNavigator();

// ======================================================
// AUTH STACK
// ======================================================

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      {/* Splash */}
      <AuthStack.Screen name="Splash" component={SplashScreen} />

      {/* Onboarding */}
      <AuthStack.Screen name="WelcomeScreen" component={WelcomeScreen} />

      <AuthStack.Screen name="TrackingScreen" component={TrackingScreen} />

      <AuthStack.Screen name="AlertScreen" component={AlertScreen} />

      <AuthStack.Screen name="ReadyScreen" component={ReadyScreen} />

      <AuthStack.Screen name="RoleSelectScreen" component={RoleSelectScreen} />

      {/* Patient Auth */}
      <AuthStack.Screen
        name="PatientSignupFlow"
        component={PatientSignupFlow}
      />

      <AuthStack.Screen name="SignupSuccess" component={SignupSuccessScreen} />

      <AuthStack.Screen name="Registerpage" component={Registerpage} />

      {/* Doctor Auth */}
      <AuthStack.Screen name="DoctorSignupFlow" component={DoctorSignupFlow} />

      <AuthStack.Screen name="signupDone" component={SignupDoneScreen} />

      <AuthStack.Screen name="DoctorLogin" component={DoctorLogin} />

      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />

      <AuthStack.Screen name="VerifyCode" component={VerifyCode} />

      <AuthStack.Screen name="ResetPassword" component={ResetPassword} />
    </AuthStack.Navigator>
  );
}

// ======================================================
// PATIENT STACK
// ======================================================

function PatientNavigator() {
  return (
    <PatientStack.Navigator screenOptions={{ headerShown: false }}>
      {/* Main Tabs */}
      <PatientStack.Screen name="MainTabs" component={TabsNavigation} />

      {/* Patient Screens */}
      <PatientStack.Screen name="ChatScreen" component={ChatScreen} />

      <PatientStack.Screen name="medicins" component={medicins} />

      <PatientStack.Screen
        name="UploadFileScreen"
        component={UploadFileScreen}
      />

      <PatientStack.Screen
        name="ManualInputScreen"
        component={ManualInputScreen}
      />

      <PatientStack.Screen name="EditAccount" component={EditAccount} />

      <PatientStack.Screen name="profileSettings" component={ProfileSettings} />
      <PatientStack.Screen name="HelpScreen" component={HelpScreen} />
      <PatientStack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
      />
    </PatientStack.Navigator>
  );
}

// ======================================================
// DOCTOR STACK
// ======================================================

function DoctorNavigator() {
  return (
    <DoctorStack.Navigator screenOptions={{ headerShown: false }}>
      {/* Doctor Tabs */}
      <DoctorStack.Screen name="DoctorTaps" component={DoctorTaps} />

      {/* Doctor Home */}
      <DoctorStack.Screen
        name="DoctorHomeScreen"
        component={DoctorHomeScreen}
      />

      <DoctorStack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
      />

      <DoctorStack.Screen
        name="AllRequestsScreen"
        component={AllRequestsScreen}
      />

      {/* Doctor Patients */}
      <DoctorStack.Screen name="PatientsScreen" component={PatientsScreen} />

      <DoctorStack.Screen
        name="CriticalCondition"
        component={CriticalCondition}
      />

      <DoctorStack.Screen name="StableCondition" component={StableCondition} />

      <DoctorStack.Screen name="FollowUpScreen" component={FollowUpScreen} />

      <DoctorStack.Screen
        name="MedicationsScreen"
        component={MedicationsScreen}
      />

      {/* Doctor Profile */}
      <DoctorStack.Screen
        name="DoctorProfileScreen"
        component={DoctorProfileScreen}
      />

      <DoctorStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
      />

      <DoctorStack.Screen name="AccountSettings" component={AccountSettings} />

      <DoctorStack.Screen name="HelpScreen" component={HelpScreen} />
    </DoctorStack.Navigator>
  );
}

// ======================================================
// ROOT NAVIGATOR
// ======================================================

function RootNavigator() {
  const { isLoggedIn, loading, userRole } = useContext(AuthContext);
  console.log("isLoggedIn:", isLoggedIn);
  console.log("userRole:", userRole);

  // Loading
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <AuthNavigator />
      ) : userRole==="doctor" ? (
        <DoctorNavigator />
      ) : (
        <PatientNavigator />
      )}
    </NavigationContainer>
  );
}

// ======================================================
// APP
// ======================================================

export default function App() {
  return (
    <AuthProvider>
      <PatientProvider>
        <RootNavigator />
      </PatientProvider>
    </AuthProvider>
  );
}
