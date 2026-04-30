import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import DoctorHomeScreen from "../screens/auth/doctor/home/DoctorHomeScreen";
import DoctorProfileScreen from "../screens/auth/doctor/profile/DoctorProfileScreen";
import PatientsScreen from "../screens/auth/doctor/patients/PatientsScreen";
import { Image, View, TouchableOpacity, Text } from "react-native";

const Tab = createBottomTabNavigator();

export default function DoctorTaps() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#940e0e",
        tabBarInactiveTintColor: "#1b1515b3",

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Profile") iconName = "person-outline";
          else if (route.name === "Patients") iconName = "people-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Patients"
        component={PatientsScreen}
        options={{ tabBarLabel: "المرضي", headerShown: false }}
      />

      <Tab.Screen 
            name="Home" 
            component={DoctorHomeScreen} 
            options={{
                tabBarLabel: 'الرئيسية',
                headerShown: false,
     
            }}
        />
        
      <Tab.Screen
        name="Profile"
        component={DoctorProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: "حسابي",
        }}
      />
    </Tab.Navigator>
  );
}
