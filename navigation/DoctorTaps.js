import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/auth/patient/HomeScreens/HomeScreen';
import ProfileScreen from '../screens/auth/patient/profileScreens/ProfileScreen';
import SearchScreen from '../screens/auth/patient/SearchScreens/SearchScreen';

import { Image, View, TouchableOpacity,Text} from 'react-native';

const Tab = createBottomTabNavigator();

export default function DoctorTaps() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarActiveTintColor: '#b00b0b',
            tabBarInactiveTintColor: '#6a4848b3',

            tabBarLabelStyle: {
                fontSize: 12,
                fontWeight: 'bold',
            },

            tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Home') iconName = 'home';
                else if (route.name === 'Profile') iconName = 'person';
                else if (route.name === 'Search') iconName = 'search';

                return <Ionicons name={iconName} size={size} color={color} />;
            },
        })}>
        
        <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ tabBarLabel: 'المرضي'
                    , headerShown: false
                }}
        />
            
        <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{
                tabBarLabel: 'الرئيسية',
                headerShown: false,
     
            }}
        />

    <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ 
            headerShown: false,  
            tabBarLabel: 'حسابي'
    }}
    />


        </Tab.Navigator>
    );
}