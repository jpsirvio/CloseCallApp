import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CurrentNeosScreen from './views/CurrentNeosScreen';
import DetailsScreen from './views/DetailsScreen';

const Stack = createStackNavigator();

export default function CurrentNeosNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2F4F4F', // Set the background color of the header
        },
        headerTintColor: 'white', // Set the text color of the header
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Current NEOs" component={CurrentNeosScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}