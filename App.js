import React, {useState, useEffect} from 'react';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Header } from 'react-native-elements';
import CurrentNeosNav from './CurrentNeosNav';
import SavedNeoWsScreen from './views/SavedNeoWsScreen';
import UserProfileScreen from './views/UserProfileScreen';
import HelpScreen from './views/HelpScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Bottom screen tab navigation
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        "tabBarActiveTintColor": "orange",
        "tabBarInactiveTintColor": "gray",
        "tabBarStyle": [
          {
            "display": "flex",
            backgroundColor: 'black'
          },
          null
        ],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Current NEOs ') {
            iconName = focused ? 'public' : 'public';
          } else if (route.name === 'Saved NEOs') {
            iconName = focused ? 'storage' : 'storage';
          } else if (route.name === 'Info') {
            iconName = focused ? 'help' : 'help';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Current NEOs " component={CurrentNeosNav} options={{ headerShown: false }} />
      <Tab.Screen name="Saved NEOs" component={SavedNeoWsScreen}   options={{
        headerStyle: {
          backgroundColor: '#2F4F4F', // Set the background color of the header
        },
        headerTintColor: 'white', // Set the text color of the header
  }} />
      <Tab.Screen name="Info" component={HelpScreen}   options={{
        headerStyle: {
          backgroundColor: '#2F4F4F', // Set the background color of the header
        },
        headerTintColor: 'white', // Set the text color of the header
  }} />
    </Tab.Navigator>
  );
}

// Header navigation
function AppHeader() {
  const navigation = useNavigation();
  return (
    <Header
      statusBarProps={{ barStyle: 'light-content' }}
      barStyle="light-content"
      leftComponent={{ text: 'CloseCall', style: { color: 'orange', fontWeight: '700', fontSize: 18, }, onPress: () => navigation.navigate('Main') }}
      rightComponent={{ icon: 'person', color: 'orange', onPress: () => navigation.navigate('UserProfile') }}
      containerStyle={{
        backgroundColor: 'black',
        justifyContent: 'space-around',
      }}
    />
  );
}

// Check user login state
export default function App() {
// Header navigation
// Login screen by default
  return (
    <NavigationContainer>
      <AppHeader />
      <Stack.Navigator initialRouteName='UserProfile' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
