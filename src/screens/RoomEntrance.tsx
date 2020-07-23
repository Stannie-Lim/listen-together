import { Props } from '../../types';
import { AxiosHttpRequest } from '../utils/axios';
import React, { useEffect, useState } from 'react';
import { getUserId, getUser } from '../utils/axios';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions  } from 'react-native';

// components
import { CreateRoom } from './buttons/createRoom';
import { JoinRoom } from './buttons/joinRoom';

export const RoomEntrance = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
        <CreateRoom navigation={ navigation } />
        <JoinRoom />
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
