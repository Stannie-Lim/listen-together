import { AxiosHttpRequest } from '../utils/axios';
import React, { useEffect, useState } from 'react';
import { getUserId, getUser } from '../utils/axios';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions, ScrollView } from 'react-native';

// cards
import { SongsCard } from './cards/SongsCard';

// components
import { Playing } from './cards/Playing';

export default function QueueScreen({ queue, setQueue }: any) {
  useEffect( () => {
    findPlaying();
  }, []);
  const findPlaying = async() => {
      const { devices } = (await AxiosHttpRequest('GET', 'https://api.spotify.com/v1/me/player/devices'))?.data;
      const device = devices.find(mydevice => mydevice.type === 'Smartphone');
      console.log(device);

  };
  return (
    // queue.queue.length === 0 ?
    <View>
      <Text style={styles.title}>There are no songs in the queue right now!</Text>
      {/* <View style={ styles.playing }>
        <Playing />
      </View> */}
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
  list: {
    height: '85%',
  },
  playing: {

  }
});
