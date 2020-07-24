import { Props } from '../../../types';
import { API_URL } from '../../../secrets';
import React, { useEffect, useState } from 'react';
import { AxiosHttpRequest, getUser } from '../../utils/axios';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions  } from 'react-native';

// modals
import { CreateRoomModal } from '../modals/createRoomModal';

export const CreateRoom = ({ navigation }: Props) => { 
    const [ me, setMe ] = useState({ id: 0 });
    
    useEffect( () => {
        const getMe = async() => getUser(setMe);
        getMe();
    }, []);

    const createRoom = async() => {
        const { roomCode } = (await AxiosHttpRequest('POST', `${API_URL}/room`, { id: me.id } ))?.data;
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
