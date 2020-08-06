import { API_URL } from '../../../secrets';
import React, { useEffect, useState } from 'react';
import { AxiosHttpRequest } from '../../utils/axios';
import { getUserId, getUser } from '../../utils/axios';
import { SafeAreaView, View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions, TextInput, Button} from 'react-native';

// components
import { DoneButton } from './DoneButton';

export const JoinRoomModal = ({ navigation, modalVisible, setModalVisible }: any) => {
    const [ me, setMe ] = useState({ id: 0 });
    const [ roomCode, setRoomCode ] = useState('');

    useEffect( () => {
        const getMe = async() => getUser(setMe);
        getMe();
    }, []);

    const joinRoom = async() => {
        const code = (await AxiosHttpRequest('POST', `${API_URL}/user/join/${roomCode}`, { id: me.id }))?.data.roomId;
        setModalVisible(false);
        navigation.navigate('Room', { roomCode: code });
    };

    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}
        >
            <DoneButton setModalVisible={ setModalVisible } />
            
            <View style={ styles.container }>
                <TextInput autoCapitalize="none" autoCorrect={ false } style={ styles.input } onChangeText={ (text: string) => setRoomCode(text) } value={ roomCode } placeholder='Room Code' /> 
                <Button onPress={ joinRoom } title='Join' />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
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
    },
    input: {
        width: Dimensions.get('window').width,
        borderBottomColor: 'lightseagreen',
        borderBottomWidth: 2,
        fontSize: 20,
        padding: 5,
    }
});
