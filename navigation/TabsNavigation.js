import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/auth/patient/HomeScreen';
import ProfileScreen from '../screens/auth/patient/ProfileScreen';
import SearchScreen from '../screens/auth/patient/SearchScreen';
import { Image, View, TouchableOpacity,Text} from 'react-native';

const Tab = createBottomTabNavigator();

export default function TabsNavigation() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: true,
                headerTitle: () => null,
                headerRight: () => (
                <TouchableOpacity onPress={() => alert('Notifications')}>
                    <View style={{  alignItems: 'center',  marginRight: 15,}}>
                            <View
                            style={{
                                
                                backgroundColor: '#fafafa', // لون البوكس
                                padding: 10,
                                borderRadius: 12,

                                // Shadow (Android)
                                
                                elevation: 6,
                            }}
                            >
                            <Ionicons name="notifications" size={22} color="#333333" style={{}} />
                        </View>
                        
                </View>
                </TouchableOpacity>
                ),
                    headerLeft: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5, gap: 5 }}>
                        <Image
                        source={require('../assets/images/profile/Gemini_Generated_Image_r6e3jyr6e3jyr6e3.png')}
                        style={{ width: 45, height: 45, borderRadius: 20, marginLeft: 15 }}
                        />
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>اهلاً , علي</Text>
                    </View>
                    ),

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
            })}
            >
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
                options={{ tabBarLabel: 'الرئيسية', headerShown: true }}
                />

            <Tab.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{ tabBarLabel: 'حسابي' , headerShown: false }}
            />
        </Tab.Navigator>
    );
}