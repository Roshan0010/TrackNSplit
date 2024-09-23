import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Mpin from './Screens/Mpin/Mpin';
import LoginSignup from './Screens/LoginSignup/LoginSignup';
import TrackDashBoard from './Screens/TrackDashboard/TrackDashBoard';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      {/* Set the status bar icons to white */}
      <StatusBar style="light" backgroundColor="#25262C" />
      
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Mpin" component={Mpin} />
        <Stack.Screen name="LoginSignup" component={LoginSignup} /> */}
        <Stack.Screen name="TrackDashBoard" component={TrackDashBoard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
