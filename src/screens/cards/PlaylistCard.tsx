import { Props } from '../../../types';
import React, { useEffect, useState } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { getUserId, getUser } from '../../utils/axios';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

// modals
import { SongsModal } from '../modals/SongsModal';
import { Avatar } from '../common/Avatar';

export const PlaylistCard = ({ playlist }: any) => {   
    const [ modalVisible, setModalVisible ] = useState(false);

    const imageUri = playlist.images[0].url !== null ? playlist.images[0].url : ""

    return (
        <TouchableOpacity onPress={ () => setModalVisible(true) } style={ styles.container }>
            <Avatar imageUri={ imageUri } />
            <View style={ styles.information }>
                <Text>{ playlist.name }</Text>
                <Text>Tracks: { playlist.tracks.total }</Text>
            </View>
            <SongsModal playlist={ playlist } modalVisible={ modalVisible } setModalVisible={ setModalVisible } />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    information: {

    },
});
