import { Props } from '../../../types';
import React, { useEffect, useState } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { getUserId, getUser } from '../../utils/axios';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions  } from 'react-native';

// modals
import { CreateRoomModal } from '../modals/createRoomModal';

export const CreateRoom = ({ navigation }: Props) => {   
    const createRoom = async() => {
        navigation.navigate('Room');
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
