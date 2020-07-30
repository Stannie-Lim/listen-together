import io from 'socket.io-client';
import { Props } from '../../../types';
import { API_URL } from '../../../secrets';
import React, { useEffect, useState } from 'react';
import { AxiosHttpRequest, getUser } from '../../utils/axios';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions  } from 'react-native';

export const CreateRoom = ({ navigation }: Props) => { 
    const [ me, setMe ] = useState({ id: 0 });
    
    useEffect( () => {
        const getMe = async() => getUser(setMe);
        getMe();
    }, []);

    const createRoom = async() => {
        const socket = io.connect(API_URL);
        const roomCode = (await AxiosHttpRequest('POST', `${API_URL}/room`, { id: me.id } ))?.data.id;
        await AxiosHttpRequest('POST', `${API_URL}/user/join/${roomCode}`, { id: me.id });

        socket.on('connect', () => {
            socket.emit('newuser', me);
        });

        navigation.navigate('Room', { roomCode });
    };

    return (
        <View style={ styles.container }>
            <TouchableOpacity onPress={ createRoom } style={ styles.buttons }>
                <Text style={ styles.center }>Create a room</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 5,
    },
    buttons: {
        borderWidth: 2,
        borderColor: 'lightseagreen',
        padding: 10,
        width: Dimensions.get('window').width / 1.5,
    },
    center: {
        fontSize: 20,
        justifyContent: 'center',
    }
});
