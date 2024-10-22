import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import MainScreen from './app/pages/MainScreen';
import ScreenConfigs from './app/pages/Configs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#fff' },
          tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={MainScreen} 
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons name="home" color={focused ? 'black' : 'gray'} size={30} />
            ),
          }} 
        />

        <Tab.Screen 
          name="Settings" 
          component={ScreenConfigs} 
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons name="settings" color={focused ? 'black' : 'gray'} size={30} />
            ),
          }} 
        />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}
