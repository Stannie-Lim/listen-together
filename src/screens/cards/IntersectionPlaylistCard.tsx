import { Props } from '../../../types';
import React, { useEffect, useState } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { getUserId, getUser } from '../../utils/axios';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

// modals
import { IntersectionSongsModal } from '../modals/IntersectionSongsModal';
import { Avatar } from '../common/Avatar';

export const IntersectionPlaylistCard = ({ enqueueSong, queue, setQueue, playlist }: any) => { 
    const [ modalVisible, setModalVisible ] = useState(false);
    const imageUri = playlist[0] && playlist[0].track.album.images[0].url !== null ? playlist[0].track.album.images[0].url : ""

    return (
        <TouchableOpacity onPress={ () => setModalVisible(true) } style={ styles.container }>
            <Avatar imageUri={ imageUri } />
            <View style={ styles.information }>
                <Text>Intersection Playlist</Text>
                <Text>Tracks: { playlist.length }</Text>
            </View>
            <IntersectionSongsModal enqueueSong={ enqueueSong } queue={ queue } setQueue={ setQueue } playlist={ playlist } modalVisible={ modalVisible } setModalVisible={ setModalVisible } />
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
