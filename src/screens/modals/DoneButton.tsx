import { AxiosHttpRequest } from '../../utils/axios';
import React, { useEffect, useState } from 'react';
import { getUserId, getUser } from '../../utils/axios';
import { SafeAreaView, View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions  } from 'react-native';

export const DoneButton = ({ setModalVisible }: any) => {

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={ () => setModalVisible(false) } style={ styles.done }>
                <Text style={ styles.donetext }>Done</Text>
            </TouchableOpacity>
         </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    done: {
        alignItems: 'flex-end',
        marginRight: 30,
    },
    donetext: {
        color: 'lightseagreen',
        fontSize: 20,
    }
});
