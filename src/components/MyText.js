import React from 'react';
import { Text, StyleSheet } from 'react-native';

const MyText = (props) => {
    return <Text style={[props.style, styles.text]}> {props.text} </Text>
}

export default MyText;

const styles = StyleSheet.create({
    text: {
        color: '#000',
    },
});