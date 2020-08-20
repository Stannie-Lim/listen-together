import { Props } from '../../../types';
import React, { useEffect, useState } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { getUserId, getUser } from '../../utils/axios';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

// icons
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

export const Playing = ( { queue, song }: any ) => {   
    const [ playing, setPlaying ] = useState(true);
    const [ songName, setSongName ] = useState(song.name);
    const [ currentDevice, setCurrentDevice ] = useState(true);

    useEffect( () => {
        playFirstSong();
    }, [ queue.queue.length ]);

    const playFirstSong = async() => {
        try {
            if(queue.queue.length === 1) {
                await AxiosHttpRequest('PUT', `https://api.spotify.com/v1/me/player/play`, { uris: [song.uri] } )
            } else {
                const songUris = queue.queue.map(song => song.uri);
                await AxiosHttpRequest('PUT', `https://api.spotify.com/v1/me/player/play`, { uris: songUris } )
            }
        } catch(err) {
            console.log(err);
        }
    };

    const back = async() => {
        try {
            await AxiosHttpRequest('POST', 'https://api.spotify.com/v1/me/player/previous');
            const { name } = (await AxiosHttpRequest('GET', 'https://api.spotify.com/v1/me/player'))?.data.item;
            const { is_playing } = (await AxiosHttpRequest('GET', 'https://api.spotify.com/v1/me/player'))?.data;
            setPlaying(is_playing);
            setSongName(name);
        } catch(err) {
            console.log(err);
        }
    };

    const next = async() => {
        try {
            await AxiosHttpRequest('POST', 'https://api.spotify.com/v1/me/player/next');
            const { name } = (await AxiosHttpRequest('GET', 'https://api.spotify.com/v1/me/player'))?.data.item;
            const { is_playing } = (await AxiosHttpRequest('GET', 'https://api.spotify.com/v1/me/player'))?.data;
            setPlaying(is_playing);
            setSongName(name);
        } catch(err) {
            console.log(err);
        }
    }

    const playorpause = async() => {
        try {
            const { devices } = (await AxiosHttpRequest('GET', 'https://api.spotify.com/v1/me/player/devices'))?.data;
            const device = devices.find(mydevice => mydevice.type === 'Smartphone');

            // if(!device) {
            //     setCurrentDevice(false);
            //     return;
            // }
            const { is_playing } = (await AxiosHttpRequest('GET', 'https://api.spotify.com/v1/me/player'))?.data;
            if(is_playing) {
                await AxiosHttpRequest('PUT', 'https://api.spotify.com/v1/me/player/pause');
            } else {
                await AxiosHttpRequest('PUT', `https://api.spotify.com/v1/me/player/play`);
            }
            setPlaying(is_playing);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        currentDevice ?
            <View style={ styles.playing }>
                <Text>{ songName }</Text>

                <View style={ styles.controls} >
                    <TouchableOpacity onPress={ back } >
                        <Entypo style={ styles.back } name="controller-fast-backward" size={24} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={ playorpause }>
                        <MaterialCommunityIcons name="play-pause" size={50} color="black" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={ next }>
                        <Entypo style={ styles.next } name="controller-next" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        :
            <View>
                <Text>Please play any song through Spotify on your phone first</Text>
            </View>
    );
}

const styles = StyleSheet.create({
    playing: {
        borderColor: 'black',
        borderWidth: 2,
        padding: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
    controls: {
        flexDirection: 'row',   
        alignItems: 'center',
    },  
    back: {
        marginRight: 30
    }, 
    next: {
        marginLeft: 30,
    },
});
