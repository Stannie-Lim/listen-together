import io from 'socket.io-client';
import { Props } from '../../types';
import { Ionicons } from '@expo/vector-icons';
import { AxiosHttpRequest } from '../utils/axios';
import { API_URL, SOCKET_URL } from '../../secrets';
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
import SongQueue from '../custom/Queue';

// icons
import { MaterialIcons, SimpleLineIcons, AntDesign, Feather } from '@expo/vector-icons'; 

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const mysocket = io(SOCKET_URL);

export default function BottomTabNavigator({route}: any) {
  const { roomCode } = route.params;
  const [ queue, setQueue ] = useState(new SongQueue);
  const [ me, setMe ] = useState({});
  const [ users, setUsers ]: any[] = useState([]);
  
  const getUsers = async() => {
    const userids = (await AxiosHttpRequest('GET', `${API_URL}/room/${roomCode}`))?.data.users;
      const usersInRoom: any[] = [];
      for(let i = 0; i < userids.length; i++) {
        const { id } = userids[i];
        const userObj = (await AxiosHttpRequest('GET', `https://api.spotify.com/v1/users/${id}`))?.data;
        usersInRoom.push(userObj);
      }
      setUsers(usersInRoom);
  };

  useEffect( () => {
    const getUser = async() => {
      const { data } = (await AxiosHttpRequest('GET', `${API_URL}/auth/me`));
      return data;
    }

    mysocket.on('newuser', data => {
      getUsers();
    });

    mysocket.on('queue', songqueue => {
      const newqueue = new SongQueue(songqueue);
      setQueue(newqueue);
    });

    getUser().then(user => {
      mysocket.emit('joinroom', { roomCode, user });
      setMe(user);
    });

    return () => {
      mysocket.disconnect();
      getUsers();
    }
  }, []);

  const enqueueSong = async song => {
    queue.enqueue(song);
    const { songQueue } = (await AxiosHttpRequest('POST', `${API_URL}/queue/${roomCode}`, { queue: JSON.stringify(queue.queue) }))?.data;
    const newqueue = new SongQueue(JSON.parse(songQueue));
    setQueue(newqueue);
    mysocket.emit('queuesong', newqueue);
  };

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
        { ({ navigation }: any) => <TabOneNavigator user={ me } queue={ queue } setQueue={ setQueue } navigation={ navigation } roomCode={ roomCode } /> }
      </BottomTab.Screen>

      <BottomTab.Screen
        name="Playlists"
        options={{
          tabBarIcon: ({ color }) => <SimpleLineIcons name="playlist" size={24} color={color} />
        }}
      >
        { ({ navigation }: any) => <TabTwoNavigator enqueueSong={ enqueueSong } user={ me } queue={ queue } setQueue={ setQueue } navigation={ navigation } roomCode={ roomCode } /> }
      </BottomTab.Screen>

      <BottomTab.Screen
        name="Search"
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="search1" size={24} color={color} />
        }}
      >
        { ({ navigation }: any) => <TabThreeNavigator user={ me } queue={ queue } setQueue={ setQueue } navigation={ navigation } roomCode={ roomCode } /> }
      </BottomTab.Screen>

      <BottomTab.Screen
        name="Users"
        options={{
          tabBarIcon: ({ color }) => <Feather name="users" size={24} color={color} />
        }}
      >
        { ({ navigation }: any) => <TabFourNavigator users={ users } queue={ queue } setQueue={ setQueue } navigation={ navigation } roomCode={ roomCode } /> }
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
        { () => <QueueScreen user={ user } queue={ queue } setQueue={ setQueue } /> }
      </TabOneStack.Screen>
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<PlaylistParamList>();

function TabTwoNavigator({ enqueueSong, user, socket, queue, setQueue, navigation, roomCode }: Props) {
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
        { () => <Playlists enqueueSong={ enqueueSong } user={ user } queue={ queue } setQueue={ setQueue } roomCode={ roomCode } /> }
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
        { () => <Search user={ user } queue={ queue } setQueue={ setQueue } /> }
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
        { () => <Users users={ users } queue={ queue } setQueue={ setQueue } roomCode={ roomCode } /> }
      </TabFourStack.Screen>
    </TabFourStack.Navigator>
  );
}
