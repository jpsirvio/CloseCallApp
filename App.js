import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Header } from 'react-native-elements';
import HomeStack from './HomeStack';
import SavedNeoWsScreen from './SavedNeoWsScreen';
import UserProfileScreen from './UserProfileScreen';
import HelpScreen from './HelpScreen';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        "tabBarActiveTintColor": "tomato",
        "tabBarInactiveTintColor": "gray",
        "tabBarStyle": [
          {
            "display": "flex"
          },
          null
        ],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Current NeoWs ') {
            iconName = focused ? 'public' : 'public';
          } else if (route.name === 'Saved NeoWs') {
            iconName = focused ? 'storage' : 'storage';
          } else if (route.name === 'Help') {
            iconName = focused ? 'help' : 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Current NeoWs " component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Saved NeoWs" component={SavedNeoWsScreen} />
      <Tab.Screen name="Help" component={HelpScreen} />
    </Tab.Navigator>
  );
}

function AppHeader() {
  const navigation = useNavigation();
  return (
    <Header
      leftComponent={{ text: 'CloseCall', style: { color: '#fff' } }}
      rightComponent={{ icon: 'person', color: '#fff', onPress: () => navigation.navigate('UserProfile') }}
    />
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AppHeader />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
