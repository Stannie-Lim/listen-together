import { Props } from '../../../types';
import React, { useEffect, useState } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { getUserId, getUser } from '../../utils/axios';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

// icons
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

// modals
import { SongsModal } from '../modals/SongsModal';
import { Avatar } from '../common/Avatar';

export const PlaylistCard = ({ enqueuePlaylist, enqueueSong, queue, setQueue, playlist }: any) => {   
    const [ songs, setSongs ] = useState([]);
    const [ modalVisible, setModalVisible ] = useState(false);

    const imageUri = playlist.images[0].url !== null ? playlist.images[0].url : ""

    useEffect( () => {
        const findSongs = async() => {
            const data = (await AxiosHttpRequest('GET', playlist.tracks.href))?.data.items
            setSongs(data);
        };
        findSongs();
    }, []);

    const playPlaylist = () => {
        const playlist = songs.map(song => song.track);
        enqueuePlaylist(playlist);
    };  

    return (
        <TouchableOpacity onPress={ () => setModalVisible(true) } style={ styles.container }>
            <Avatar imageUri={ imageUri } />
            <View>
                <Text>{ playlist.name }</Text>
                <Text>Tracks: { playlist.tracks.total }</Text>
            </View>
            <SongsModal enqueueSong={ enqueueSong } queue={ queue } setQueue={ setQueue } songs={ songs } modalVisible={ modalVisible } setModalVisible={ setModalVisible } />
            <TouchableOpacity onPress={ playPlaylist } style={ styles.play }>
                <MaterialCommunityIcons name="play-circle-outline" size={50} color="black" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomColor: 'lightseagreen',
        borderBottomWidth: 3,
    },
    image: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
    play: {
        marginLeft: 150,
        justifyContent: 'center',
    },
});
