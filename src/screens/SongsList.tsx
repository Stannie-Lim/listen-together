import { AxiosHttpRequest } from '../utils/axios';
import React, { useEffect, useState } from 'react';
import { getUserId, getUser } from '../utils/axios';
import { ScrollView, View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions  } from 'react-native';

// cards
import { SongsCard } from './cards/SongsCard';

export const SongsList = () => {
  const [ songs, setSongs ] = useState([]);
    
  useEffect( () => {
      getSongs();
  }, []);
  
  const getSongs = async() => {
      const {items} = (await AxiosHttpRequest('GET', playlist.tracks.href))?.data;
      setSongs(items);
  };
  
  return (
    <ScrollView>
        {
            songs.length !== 0 && songs.map((song: any, index: number) => <SongsCard key={ index } song={ song.track } />)
        }
    </ScrollView>
  );
}