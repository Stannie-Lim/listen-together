import { Props } from '../../../types';
import { StyleSheet } from 'react-native';
import { AxiosHttpRequest } from '../../utils/axios';
import React, { useEffect, useState } from 'react';
import { getUserId, getUser } from '../../utils/axios';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';

// modals
import { JoinRoomModal } from '../modals/JoinRoomModal';

export const JoinRoom = ({ navigation }: Props) => {
    const [ modalVisible, setModalVisible ] = useState(false);

    return (
        <View style={ styles.container }>
            <TouchableOpacity onPress={ () => setModalVisible(true) } style={ styles.buttons }>
                <Text style={ styles.center }>Join an existing room</Text>
            </TouchableOpacity>

            <JoinRoomModal modalVisible={ modalVisible } setModalVisible={ setModalVisible } navigation={ navigation } />
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
