import { AxiosHttpRequest } from '../utils/axios';
import React, { useEffect, useState } from 'react';
import { getUserId, getUser } from '../utils/axios';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions, ScrollView } from 'react-native';

// cards
import { SongsCard } from './cards/SongsCard';

export default function QueueScreen({ queue, setQueue }: any) {
  return (
    queue.queue.length === 0 ?
    <Text style={styles.title}>There are no songs in the queue right now!</Text>
    :
    <View>
      { queue.queue.length !== 0 && <SongsCard clickable={ false } song={queue.peek()} />}
      <ScrollView style={ styles.list }>
        {
          queue.queue && queue.queue.length !== 0 && queue.queue.map((song: any, index: number) => index !== 0 ? <SongsCard key={ index } clickable={ false } song={ song } /> : <Text></Text>)
        } 
      </ScrollView>
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
    height: '80%',
  }
});
