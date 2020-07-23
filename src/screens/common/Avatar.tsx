import React from 'react';
import { StyleSheet, Image } from 'react-native';


export const Avatar = ({ imageUri }: any) => <Image source={ imageUri.length !== 0 ? { uri: imageUri } : null } style={ styles.image } />

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100,
        borderRadius: 50,
    },
});
