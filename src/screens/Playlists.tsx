import React, { useEffect, useState } from 'react';
import { getUser, AxiosHttpRequest } from '../utils/axios';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';

import { Text, View } from '../components/Themed';

// components
import { PlaylistCard } from './cards/PlaylistCard';

export default function Playlists() {
  const [ playlists, setPlaylists ] = useState([]);
  const [ me, setMe ] = useState({});
  useEffect( () => {
    getme();
    getPlaylists();
  }, []);

  const getme = async() => await getUser(setMe);
  const getPlaylists = async() => {
    const { items }: any = (await AxiosHttpRequest('GET', 'https://api.spotify.com/v1/me/playlists'))?.data;
    setPlaylists(items);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {
          playlists.map((playlist: any) => <PlaylistCard key={ playlist.id } playlist={ playlist } /> )
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height / 1.2,
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
