import React from 'react';
import { ColorSchemeName, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';

// screens
import Auth from '../screens/Auth';

import { RootStackParamList } from '../../types';

import { createStackNavigator } from '@react-navigation/stack';
import LinkingConfiguration from './LinkingConfiguration';
import { RoomEntrance } from '../screens/RoomEntrance';
import BottomTabNavigator from './BottomTabNavigator';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="Home" component={RoomEntrance} 
        // options={{ 
        //   title: 'hello',
        //   headerRight: () => <TouchableOpacity onPress={ () => console.log('hello') }>
        //                       <Text>Log out</Text>
        //                      </TouchableOpacity>
        // }}
      />
      <Stack.Screen name="Room" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}
