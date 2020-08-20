import { AxiosHttpRequest } from '../utils/axios';
import React, { useEffect, useState } from 'react';
import { getUserId, getUser } from '../utils/axios';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions, ScrollView } from 'react-native';

// cards
import { SongsCard } from './cards/SongsCard';

// components
import { Playing } from './cards/Playing';

export default function QueueScreen({ queue, setQueue }: any) {
  return (
    queue.queue.length === 0 ?
    <View>
      <Text style={styles.title}>There are no songs in the queue right now!</Text>
      {/* <View style={ styles.playing }>
        <Playing />
      </View> */}
    </View>
    :
      <View>
        <ScrollView style={ styles.list }>
          {
            queue.queue && queue.queue.length !== 0 && queue.queue.map((song: any, index: number) => <SongsCard key={ index } clickable={ false } song={ song } />)
          } 
        </ScrollView>
        <View style={ styles.playing }>
          <Playing song={ queue.peek() } queue={ queue } />
        </View>
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
