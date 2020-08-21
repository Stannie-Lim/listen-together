import { AxiosHttpRequest } from '../../utils/axios';
import React, { useEffect, useState } from 'react';
import { getUserId, getUser } from '../../utils/axios';
import { ScrollView, SafeAreaView, View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions  } from 'react-native';

// components
import { DoneButton } from './DoneButton';
import { SongsCard } from '../cards/SongsCard';

export const SongsModal = ({ songs, enqueueSong, queue, setQueue, modalVisible, setModalVisible }: any) => {
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
                    songs.length !== 0 && songs.map((song: any, index: number) => <SongsCard enqueueSong={ enqueueSong } key={ index } song={ song.track } queue={ queue } setQueue={ setQueue } clickable={ true } />)
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
