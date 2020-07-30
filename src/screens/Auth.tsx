import { Props } from '../../types';
import React, { useState } from 'react';
import { API_URL, CLIENT_ID } from '../../secrets';
import { AxiosHttpRequest, setJwt, setUserId } from '../utils/axios';
import * as AuthSession from 'expo-auth-session';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import axios from 'axios';

const Auth = ({ route, navigation }: Props)  => {
    
    const login = async() => {
        try {
            const url = AuthSession.getRedirectUrl();
            const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(url)}`;
            const result: any = await AuthSession.startAsync({ authUrl })
            const { code } = result.params;

            console.log(1);
            const token = (await AxiosHttpRequest('POST', `${API_URL}/auth/login`, { code, url }))?.data;
            console.log(2);
            
            await setJwt(token.access_token);
            console.log(3);
            const me = (await AxiosHttpRequest('GET', `https://api.spotify.com/v1/me`))?.data;
            console.log(4);
            await AxiosHttpRequest('POST', `${API_URL}/user`, { id: me.id });
            console.log(5);
            
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
                    <Text>Login</Text>
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