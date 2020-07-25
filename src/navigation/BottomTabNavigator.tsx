import * as React from 'react';
import { Props } from '../../types';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Users from '../screens/Users';
import Queue from '../screens/Queue';
import Search from '../screens/Search';
import Colors from '../constants/Colors';
import Playlists from '../screens/Playlists';
import useColorScheme from '../hooks/useColorScheme';
import { BottomTabParamList, QueueParamList, PlaylistParamList, SearchParamList, UsersParamList } from '../../types';

// icons
import { MaterialIcons, SimpleLineIcons, AntDesign, Feather } from '@expo/vector-icons'; 

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator({route}: any) {
  const { roomCode } = route.params;
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
        { ({ navigation }: any) => <TabOneNavigator navigation={ navigation } roomCode={ roomCode } /> }
      </BottomTab.Screen>

      <BottomTab.Screen
        name="Playlists"
        options={{
          tabBarIcon: ({ color }) => <SimpleLineIcons name="playlist" size={24} color={color} />
        }}
      >
        { ({ navigation }: any) => <TabTwoNavigator navigation={ navigation } roomCode={ roomCode } /> }
      </BottomTab.Screen>

      <BottomTab.Screen
        name="Search"
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="search1" size={24} color={color} />
        }}
      >
        { ({ navigation }: any) => <TabThreeNavigator navigation={ navigation } roomCode={ roomCode } /> }
      </BottomTab.Screen>

      <BottomTab.Screen
        name="Users"
        options={{
          tabBarIcon: ({ color }) => <Feather name="users" size={24} color={color} />
        }}
      >
        { ({ navigation }: any) => <TabFourNavigator navigation={ navigation } roomCode={ roomCode } /> }
      </BottomTab.Screen>
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const leaveRoom = (navigation: any) => {
  navigation.pop();
};

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<QueueParamList>();

function TabOneNavigator({ navigation, roomCode }: Props) {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="Queue"
        component={Queue}
        options={{ 
          headerTitle: `Room Code: ${roomCode}`,
          headerLeft: () => (
            <TouchableOpacity onPress={ () => leaveRoom(navigation) }>
              <Text>Leave Room</Text>
            </TouchableOpacity>
          )
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<PlaylistParamList>();

function TabTwoNavigator({ navigation, roomCode }: Props) {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="Playlists"
        component={Playlists}
        options={{ 
          headerTitle: `Room Code: ${roomCode}`,
          headerLeft: () => (
            <TouchableOpacity onPress={ () => leaveRoom(navigation) }>
              <Text>Leave Room</Text>
            </TouchableOpacity>
          )
        }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<SearchParamList>();

function TabThreeNavigator({ navigation, roomCode }: Props) {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="Search"
        component={Search}
        options={{ 
          headerTitle: `Room Code: ${roomCode}`,
          headerLeft: () => (
            <TouchableOpacity onPress={ () => leaveRoom(navigation) }>
              <Text>Leave Room</Text>
            </TouchableOpacity>
          )
        }}
      />
    </TabThreeStack.Navigator>
  );
}

const TabFourStack = createStackNavigator<UsersParamList>();

function TabFourNavigator({ navigation, roomCode }: Props) {
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
        { () => <Users roomCode={ roomCode } /> }
      </TabFourStack.Screen>
    </TabFourStack.Navigator>
  );
}
