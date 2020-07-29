import React, { useState } from 'react';
import { Props } from '../../types';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Users from '../screens/Users';
import Search from '../screens/Search';
import Colors from '../constants/Colors';
import Playlists from '../screens/Playlists';
import QueueScreen from '../screens/QueueScreen';
import useColorScheme from '../hooks/useColorScheme';
import { BottomTabParamList, QueueParamList, PlaylistParamList, SearchParamList, UsersParamList } from '../../types';

// queue implementation
import Queue from '../custom/Queue';

// icons
import { MaterialIcons, SimpleLineIcons, AntDesign, Feather } from '@expo/vector-icons'; 

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator({route}: any) {
  const { roomCode } = route.params;
  const [ queue, setQueue ] = useState(new Queue());

  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Queue"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Queue"
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name="queue-music" size={24} color={color} />,
        }}
      >
        { ({ navigation }: any) => <TabOneNavigator queue={ queue } setQueue={ setQueue } navigation={ navigation } roomCode={ roomCode } /> }
      </BottomTab.Screen>

      <BottomTab.Screen
        name="Playlists"
        options={{
          tabBarIcon: ({ color }) => <SimpleLineIcons name="playlist" size={24} color={color} />
        }}
      >
        { ({ navigation }: any) => <TabTwoNavigator queue={ queue } setQueue={ setQueue } navigation={ navigation } roomCode={ roomCode } /> }
      </BottomTab.Screen>

      <BottomTab.Screen
        name="Search"
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="search1" size={24} color={color} />
        }}
      >
        { ({ navigation }: any) => <TabThreeNavigator queue={ queue } setQueue={ setQueue } navigation={ navigation } roomCode={ roomCode } /> }
      </BottomTab.Screen>

      <BottomTab.Screen
        name="Users"
        options={{
          tabBarIcon: ({ color }) => <Feather name="users" size={24} color={color} />
        }}
      >
        { ({ navigation }: any) => <TabFourNavigator queue={ queue } setQueue={ setQueue } navigation={ navigation } roomCode={ roomCode } /> }
      </BottomTab.Screen>
    </BottomTab.Navigator>
  );
}

const leaveRoom = (navigation: any) => {
  navigation.pop();
};

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<QueueParamList>();

function TabOneNavigator({ queue, setQueue, navigation, roomCode }: Props) {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Queue"
        options={{ 
          headerTitle: `Room Code: ${roomCode}`,
          headerLeft: () => (
            <TouchableOpacity onPress={ () => leaveRoom(navigation) }>
              <Text>Leave Room</Text>
            </TouchableOpacity>
          )
        }}
      >
        { () => <QueueScreen queue={ queue } setQueue={ setQueue } /> }
      </TabOneStack.Screen>
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<PlaylistParamList>();

function TabTwoNavigator({ queue, setQueue, navigation, roomCode }: Props) {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="Playlists"
        options={{ 
          headerTitle: `Room Code: ${roomCode}`,
          headerLeft: () => (
            <TouchableOpacity onPress={ () => leaveRoom(navigation) }>
              <Text>Leave Room</Text>
            </TouchableOpacity>
          )
        }}
      >
        { () => <Playlists queue={ queue } setQueue={ setQueue } roomCode={ roomCode } /> }
      </TabTwoStack.Screen>
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<SearchParamList>();

function TabThreeNavigator({ queue, setQueue, navigation, roomCode }: Props) {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="Search"
        options={{ 
          headerTitle: `Room Code: ${roomCode}`,
          headerLeft: () => (
            <TouchableOpacity onPress={ () => leaveRoom(navigation) }>
              <Text>Leave Room</Text>
            </TouchableOpacity>
          )
        }}
      >
        { () => <Search queue={ queue } setQueue={ setQueue } /> }
      </TabThreeStack.Screen>
    </TabThreeStack.Navigator>
  );
}

const TabFourStack = createStackNavigator<UsersParamList>();

function TabFourNavigator({ queue, setQueue, navigation, roomCode }: Props) {
  return (
    <TabFourStack.Navigator>
      <TabFourStack.Screen
        name="Users"
        options={{ 
          headerTitle: `Room Code: ${roomCode}`,
          headerLeft: () => (
            <TouchableOpacity onPress={ () => leaveRoom(navigation) }>
              <Text>Leave Room</Text>
            </TouchableOpacity>
          )
        }}
      >
        { () => <Users queue={ queue } setQueue={ setQueue } roomCode={ roomCode } /> }
      </TabFourStack.Screen>
    </TabFourStack.Navigator>
  );
}
