import { StyleSheet } from 'react-native';
import { AxiosHttpRequest } from '../../utils/axios';
import React, { useEffect, useState } from 'react';
import { getUserId, getUser } from '../../utils/axios';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

export const JoinRoom = () => {
    const joinRoom = async() => {

    };
    return (
        <View style={ styles.container }>
            <TouchableOpacity onPress={ joinRoom } style={ styles.buttons }>
                <Text style={ styles.center }>Join an existing room</Text>
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
