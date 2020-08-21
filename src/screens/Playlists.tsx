import { API_URL } from '../../secrets';
import React, { useEffect, useState } from 'react';
import { getUser, AxiosHttpRequest } from '../utils/axios';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';

import { Text, View } from '../components/Themed';

// components
import { PlaylistCard } from './cards/PlaylistCard';
import { SongsCard } from './cards/SongsCard';
import { IntersectionPlaylistCard } from './cards/IntersectionPlaylistCard';

export default function Playlists({ playlists, intersectionPlaylist, enqueuePlaylist, enqueueSong, socket, queue, setQueue, roomCode }: any) {
  return (
    <View style={styles.container}>
      <ScrollView>
        {
          playlists.length !== 0 && playlists.map((playlist: any) => <PlaylistCard enqueuePlaylist={ enqueuePlaylist } enqueueSong={ enqueueSong } key={ playlist.id } playlist={ playlist } queue={ queue } setQueue={ setQueue } /> )
        }
        {
          intersectionPlaylist.length !== 0 && <IntersectionPlaylistCard enqueuePlaylist={ enqueuePlaylist } enqueueSong={ enqueueSong } playlist={ intersectionPlaylist } queue={ queue } setQueue={ setQueue } />
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
