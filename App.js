import React, {useState, useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Header } from 'react-native-elements';
import HomeStack from './HomeStack';
import SavedNeoWsScreen from './SavedNeoWsScreen';
import UserProfileScreen from './UserProfileScreen';
import HelpScreen from './HelpScreen';
import { Icon } from 'react-native-elements';
import { User, onAuthStateChanged } from "firebase/auth"
import { FIREBASE_AUTH } from './FirebaseConfig';

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
      <Tab.Screen name="Current NEOs " component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Saved NEOs" component={SavedNeoWsScreen} />
      <Tab.Screen name="Info" component={HelpScreen} />
    </Tab.Navigator>
  );
}

function AppHeader() {
  const navigation = useNavigation();
  return (
    <Header
      leftComponent={{ text: 'CloseCall', style: { color: '#fff' }, onPress: () => navigation.navigate('Main') }}
      rightComponent={{ icon: 'person', color: '#fff', onPress: () => navigation.navigate('UserProfile') }}
    />
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    })
  }, [])

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
