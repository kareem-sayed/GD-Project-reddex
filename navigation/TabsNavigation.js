import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/auth/patient/HomeScreens/HomeScreen';
import ProfileScreen from '../screens/auth/patient/profileScreens/ProfileScreen';
import SearchScreen from '../screens/auth/patient/SearchScreens/SearchScreen';
import { Image, View, TouchableOpacity,Text} from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabsNavigation() {
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
        options={{ tabBarLabel: 'بحث'
                    , headerShown: false
                }}
        />
            
        <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{
                tabBarLabel: 'الرئيسية',
                headerShown: true,

                headerLeft: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5, gap: 5 }}>
                    <Image
                    source={require('../assets/images/profile/Gemini_Generated_Image_r6e3jyr6e3jyr6e3.png')}
                    style={{ width: 45, height: 45, borderRadius: 20, marginLeft: 15 }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>اهلاً , علي</Text>
                </View>
                ),

                headerRight: () => (
                <TouchableOpacity onPress={() => alert('Notifications')}>
                    <View style={{
                    backgroundColor: '#fafafa',
                    padding: 10,
                    borderRadius: 12,
                    elevation: 6,
                    marginRight: 15
                    }}>
                    <Ionicons name="notifications" size={22} color="#333" />
                    </View>
                </TouchableOpacity>
                ),
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