// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaperProvider } from 'react-native-paper';
import DriverScreen from './src/screens/DriverScreen';
import PassengerScreen from './src/screens/PassengerScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { enableScreens } from 'react-native-screens';
enableScreens(); // put this at the top of App.js


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              const iconName = route.name === 'Driver' ? 'drive-eta' : 'person-search';
              return <MaterialIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#0a84ff',
            tabBarInactiveTintColor: '#8e8e93',
            tabBarStyle: { backgroundColor: '#fff', paddingVertical: 8 },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Driver" component={DriverScreen} />
          <Tab.Screen name="Passenger" component={PassengerScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
