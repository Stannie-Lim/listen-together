import { Props } from '../../types';
import React, { useState, useEffect } from 'react';
import { SOCKET_URL, API_URL, CLIENT_ID } from '../../secrets';
import { AxiosHttpRequest, setJwt, setUserId } from '../utils/axios';
import * as AuthSession from 'expo-auth-session';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import axios from 'axios';
import io from 'socket.io-client';


// sockets
// import socket from '../sockets/room';

const Auth = ({ route, navigation }: Props)  => {
    const login = async() => {
        try {
            const url = AuthSession.getRedirectUrl();
            const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&scope=${encodeURIComponent('user-modify-playback-state user-read-playback-state')}&redirect_uri=${encodeURIComponent(url)}`;
            const result: any = await AuthSession.startAsync({ authUrl })
            const { code } = result.params;

            const token = (await AxiosHttpRequest('POST', `${API_URL}/auth/login`, { code, url }))?.data;
            

            await setJwt(token.access_token);
            const me = (await AxiosHttpRequest('GET', `https://api.spotify.com/v1/me`))?.data;
            await AxiosHttpRequest('POST', `${API_URL}/user`, { id: me.id });
            
            navigation.navigate('Home');
          } catch (err) {
            console.log(err)
          }
    };

    return (
        <SafeAreaView>
            <View style={ styles.container }>
                {/* <TextInput style={ styles.input } value={ username } onChange={ ({ target }: { target: value }) => setUsername(target.value) } placeholder='Username' />  */}
                <TouchableOpacity onPress={ login }>
                    <Text style={ {color: 'green'} }>Login</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({ 
    input: {
        width: Dimensions.get('window').width,
        borderBottomWidth: 2,
        borderBottomColor: 'lightseagreen',
        fontSize: 20,
        padding: 5,

    },
    container: {
        height: Dimensions.get('window').height,
        justifyContent: 'center',
    }
}); 

export default Auth;