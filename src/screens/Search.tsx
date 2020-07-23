import { AxiosHttpRequest } from '../utils/axios';
import React, { useEffect, useState } from 'react';
import { getUserId, getUser } from '../utils/axios';
import { Button, ScrollView, View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions, TextInput } from 'react-native';

import { SongsCard } from '../screens/cards/SongsCard';

export default function Search() {
  const [ found, setFound ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState('');

  const search = async(text: string) => {
    const data = (await AxiosHttpRequest('GET', `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track&market=US`))?.data.tracks.items;
    setFound(data);
  };

  return (
    <View style={styles.container}>
      <TextInput style={ styles.input } value={ searchTerm } onChangeText={ text => setSearchTerm(text) } autoCorrect={ false } autoCapitalize='none' />
      <Button onPress={ search } title='press' />
      <ScrollView>
        {
          found.length !== 0 && found.map(song => <SongsCard song={ song } /> )
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
  input: {
    width: Dimensions.get('window').width,
    borderBottomColor: 'lightseagreen',
    borderBottomWidth: 2,
    fontSize: 20,
    padding: 5,
  }
});
