import io from 'socket.io-client';
import { StyleSheet } from 'react-native';
import { AxiosHttpRequest } from '../utils/axios';
import React, { useEffect, useState } from 'react';
import { API_URL, SOCKET_URL } from '../../secrets';
import { getUser } from '../utils/axios';
import { View, Text } from 'react-native';

// sockets
// import '../sockets/room';

export const Room = ({ roomCode }: any) => {
  const [ playlists, setPlaylists ] = useState([]);
  const [ me, setMe ] = useState({});
  let socket: any;

  useEffect( () => {
    socket = io(SOCKET_URL);
    socket.connect();
    socket.on("connect", () => {
      console.log("Connected!");
    });
    getme();
    getPlaylists();
  }, []);

  const getme = async() => await getUser(setMe);
  const getPlaylists = async() => {
    const { data }: any = (await AxiosHttpRequest('GET', 'https://api.spotify.com/v1/me/playlists')) ;
    // console.log(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
