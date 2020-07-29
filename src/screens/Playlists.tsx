import { API_URL } from '../../secrets';
import React, { useEffect, useState } from 'react';
import { getUser, AxiosHttpRequest } from '../utils/axios';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';

import { Text, View } from '../components/Themed';

// components
import { PlaylistCard } from './cards/PlaylistCard';

// custom classes
import ObjectSet from '../custom/ObjectSet';

export default function Playlists({ queue, setQueue, roomCode }: any) {
  const [ playlists, setPlaylists ] = useState([]);
  const [ me, setMe ] = useState({});
  useEffect( () => {
    getme();
    getPlaylists();
  }, []);

  const getme = async() => await getUser(setMe);
  const getPlaylists = async() => {
    const combinedSongs: any[] = [];
    const userIds = (await AxiosHttpRequest('GET', `${API_URL}/room/${roomCode}`))?.data.users.map((user: any) => user.id);
    userIds.forEach(user => {
      const findPlaylists = async() => {
        const userPlaylists = (await AxiosHttpRequest('GET', `https://api.spotify.com/v1/users/${user}/playlists`))?.data.items.map(playlist => playlist.id);

        const usersSongs = [];
        for(let i = 0; i < userPlaylists.length; i++) {
          const playlistSongs = (await AxiosHttpRequest('GET', `https://api.spotify.com/v1/playlists/${userPlaylists[i]}`))?.data.tracks.items;
          usersSongs.push(playlistSongs);
        }

        combinedSongs.push(usersSongs.flat(1));
         
        const removeDupesFromObjects = arr => {
          const removed = [];
          arr.forEach(song => {
            let found = false;
            for(let i = 0; i < removed.length; i++) {
              if(removed[i].track.id === song.track.id) {
                found = true;
                break;
              }
            }
            if(!found) removed.push(song);
          });
          return removed;
        };

        const nodupes = [];
        for(let i = 0; i < combinedSongs.length; i++) {
          nodupes.push(removeDupesFromObjects(combinedSongs[i]));
        }

        const getIntersection = arr => {
          const set = new ObjectSet();
          const intersection: any[] = [];
          arr.forEach((playlist: any) => {
            playlist.forEach((song: any) => {
              const found = set.add(song);
              if(found) intersection.push(song);
            })
          })
          return intersection;
        }

        const intersection = getIntersection(nodupes);
        intersection.forEach(song => console.log(song.track.name));

      }
      findPlaylists();
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {
          playlists.map((playlist: any) => <PlaylistCard key={ playlist.id } playlist={ playlist } queue={ queue } setQueue={ setQueue } /> )
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
