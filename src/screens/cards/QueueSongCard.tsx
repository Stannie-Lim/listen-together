import { Props } from '../../../types';
import React, { useEffect, useState } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { getUserId, getUser } from '../../utils/axios';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

// modals
import { Avatar } from '../common/Avatar';

export const QueueSongCard = ({ song }: any) => {
    return (
        <View style={ styles.container }>
            <Avatar imageUri={ song.imageUri } />
            <View style={ styles.information }>
                <Text style={ styles.name }>{ song.name }</Text>
                <Text style={ styles.artist }>{ song.artist }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    information: {
        flexDirection: 'column',
    },
    name: {
        fontSize: 20,
        width: Dimensions.get('window').width / 1.3,
    },
    artist: {
        fontSize: 15,
    },
});
