import { StyleSheet } from 'react-native';
import { AxiosHttpRequest } from '../utils/axios';
import React, { useEffect, useState } from 'react';
import { getUserId, getUser } from '../utils/axios';
import { View, Text } from 'react-native';

export const Room = () => {
  const [ playlists, setPlaylists ] = useState([]);
  const [ me, setMe ] = useState({});
  useEffect( () => {
    getme();
    getPlaylists();
  }, []);

  const getme = async() => await getUser(setMe);
  const getPlaylists = async() => {
    const { data }: any = (await AxiosHttpRequest('GET', 'https://api.spotify.com/v1/me/playlists')) ;
    console.log(data);
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
