import * as React from 'react';
import { Props } from '../../types';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import Queue from '../screens/Queue';
import Playlists from '../screens/Playlists';
import Search from '../screens/Search';
import { BottomTabParamList, QueueParamList, PlaylistParamList, SearchParamList } from '../../types';

// icons
import { MaterialIcons, SimpleLineIcons, AntDesign } from '@expo/vector-icons'; 

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Queue"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Queue"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="queue-music" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Playlists"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <SimpleLineIcons name="playlist" size={24} color={color} />
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="search1" size={24} color={color} />
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<QueueParamList>();

function TabOneNavigator({ navigation }: Props) {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Queue"
        component={Queue}
        options={{ 
          headerTitle: 'Room Code',
          headerLeft: () => (
            <TouchableOpacity onPress={ () => navigation.pop() }>
              <Text>Leave Room</Text>
            </TouchableOpacity>
          )
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<PlaylistParamList>();

function TabTwoNavigator({ navigation }: Props) {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="Playlists"
        component={Playlists}
        options={{ 
          headerTitle: 'Room Code',
          headerLeft: () => (
            <TouchableOpacity onPress={ () => navigation.pop() }>
              <Text>Leave Room</Text>
            </TouchableOpacity>
          )
        }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<SearchParamList>();

function TabThreeNavigator({ navigation }: Props) {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="Search"
        component={Search}
        options={{ 
          headerTitle: 'Room Code',
          headerLeft: () => (
            <TouchableOpacity onPress={ () => navigation.pop() }>
              <Text>Leave Room</Text>
            </TouchableOpacity>
          )
        }}
      />
    </TabThreeStack.Navigator>
  );
}
