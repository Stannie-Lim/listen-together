import { API_URL } from '../../secrets';
import { AxiosHttpRequest } from '../utils/axios';
import React, { useEffect, useState } from 'react';
import { getUserId, getUser } from '../utils/axios';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions, ScrollView } from 'react-native';

// cards
import { UserCard } from './cards/UserCard';

export default function Users({ roomCode }: any) {
  const [ users, setUsers ] = useState([]);
  useEffect( () => {
    const getUsers = async() => {
      const { data }: any = (await AxiosHttpRequest('GET', `${API_URL}/room/${roomCode}`));
      setUsers(data.users);
    }
    getUsers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users</Text>
      <ScrollView>
        {
          users.map((user: any) => <UserCard key={ user.id } user={ user } /> )
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
});
