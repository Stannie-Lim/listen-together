import { AxiosHttpRequest } from '../../utils/axios';
import React, { useEffect, useState } from 'react';
import { getUserId, getUser } from '../../utils/axios';
import { ScrollView, SafeAreaView, View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions  } from 'react-native';

// components
import { DoneButton } from './DoneButton';
import { SongsCard } from '../cards/SongsCard';

export const SongsModal = ({ playlist, modalVisible, setModalVisible }: any) => {
    const [ songs, setSongs ] = useState([]);
    useEffect( () => {
        getSongs();
    }, []);

    const getSongs = async() => {
        const {items} = (await AxiosHttpRequest('GET', playlist.tracks.href))?.data;
        setSongs(items);
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

            <ScrollView>
                {
                    songs.length !== 0 && songs.map((song: any, index: number) => <SongsCard key={ index } song={ song.track } />)
                }
            </ScrollView>
        </Modal>
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
