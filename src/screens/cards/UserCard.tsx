import { Props } from '../../../types';
import React, { useEffect, useState } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { getUserId, getUser } from '../../utils/axios';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';

// modals
import { Avatar } from '../common/Avatar';

export const UserCard = ({ user }: any) => {  
    const [ spotifyUser, setSpotifyUser ] = useState({});
    useEffect( () => {
        const getUser = async() => {
            const { data }: any = (await AxiosHttpRequest('GET', `https://api.spotify.com/v1/users/${user.id}`));
            setSpotifyUser(data);
        }
        getUser();
    }, []);
    return (
        <View style={ styles.card }>
            <Text style={ styles.name }>{ spotifyUser.display_name }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderColor: 'lightseagreen',
        borderWidth: 2,
        width: Dimensions.get('window').width / 1.2,
        borderRadius: 25,
    },
    name: {
        fontSize: 20,
        padding: 10,
    }
});
