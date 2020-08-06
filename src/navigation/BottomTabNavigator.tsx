import io from 'socket.io-client';
import { Props } from '../../types';
import { AxiosHttpRequest } from '../utils/axios';
import { API_URL, SOCKET_URL } from '../../secrets';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
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
  const [ me, setMe ] = useState({});
  const [ socket, setSocket ] = useState({});
  const [ users, setUsers ]: any[] = useState([]);
  
  let mysocket: any;
  useEffect( () => {
    const getUser = async() => {
      const { data } = (await AxiosHttpRequest('GET', `${API_URL}/auth/me`));
      return data;
    }
    mysocket = io(SOCKET_URL);

    mysocket.on('newuser', async data => {
      const userids = (await AxiosHttpRequest('GET', `${API_URL}/room/${roomCode}`))?.data.users;
      const usersInRoom: any[] = [];
      for(let i = 0; i < userids.length; i++) {
        const { id } = userids[i];
        const userObj = (await AxiosHttpRequest('GET', `https://api.spotify.com/v1/users/${id}`))?.data;
        usersInRoom.push(userObj);
      }
      console.log(usersInRoom);
      setUsers(usersInRoom);
    });

    getUser().then(user => {
      mysocket.emit('joinroom', { roomCode, user });
      setMe(user);
      setSocket(mysocket);
    });
  }, []);

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
        { ({ navigation }: any) => <TabOneNavigator user={ me } socket={ socket } queue={ queue } setQueue={ setQueue } navigation={ navigation } roomCode={ roomCode } /> }
      </BottomTab.Screen>

      <BottomTab.Screen
        name="Playlists"
        options={{
          tabBarIcon: ({ color }) => <SimpleLineIcons name="playlist" size={24} color={color} />
        }}
      >
        { ({ navigation }: any) => <TabTwoNavigator user={ me } socket={ socket } queue={ queue } setQueue={ setQueue } navigation={ navigation } roomCode={ roomCode } /> }
      </BottomTab.Screen>

      <BottomTab.Screen
        name="Search"
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="search1" size={24} color={color} />
        }}
      >
        { ({ navigation }: any) => <TabThreeNavigator user={ me } socket={ socket } queue={ queue } setQueue={ setQueue } navigation={ navigation } roomCode={ roomCode } /> }
      </BottomTab.Screen>

      <BottomTab.Screen
        name="Users"
        options={{
          tabBarIcon: ({ color }) => <Feather name="users" size={24} color={color} />
        }}
      >
        { ({ navigation }: any) => <TabFourNavigator users={ users } socket={ socket } queue={ queue } setQueue={ setQueue } navigation={ navigation } roomCode={ roomCode } /> }
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

function TabOneNavigator({ user, socket, queue, setQueue, navigation, roomCode }: Props) {
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
        { () => <QueueScreen user={ user } socket={ socket } queue={ queue } setQueue={ setQueue } /> }
      </TabOneStack.Screen>
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<PlaylistParamList>();

function TabTwoNavigator({ user, socket, queue, setQueue, navigation, roomCode }: Props) {
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
        { () => <Playlists user={ user } socket={ socket } queue={ queue } setQueue={ setQueue } roomCode={ roomCode } /> }
      </TabTwoStack.Screen>
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<SearchParamList>();

function TabThreeNavigator({ user, socket, queue, setQueue, navigation, roomCode }: Props) {
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
        { () => <Search user={ user } socket={ socket } queue={ queue } setQueue={ setQueue } /> }
      </TabThreeStack.Screen>
    </TabThreeStack.Navigator>
  );
}

const TabFourStack = createStackNavigator<UsersParamList>();

function TabFourNavigator({ users, socket, queue, setQueue, navigation, roomCode }: Props) {
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
        { () => <Users users={ users } socket={ socket } queue={ queue } setQueue={ setQueue } roomCode={ roomCode } /> }
      </TabFourStack.Screen>
    </TabFourStack.Navigator>
  );
}
