import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MyButton = (props) => {
    return (
        <TouchableOpacity style={[styles.button, 
            {backgroundColor: props.btnColor}]} onPress={props.customPress}>
                <View style={styles.view}>
                    <Icon style={styles.icon} name={props.btnIcon} size={40} color="white" />
                    <Text style={styles.text}>{props.title}</Text>
                </View>
        </TouchableOpacity>
    );
};

export default MyButton;

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        flex: 1,
        color: 'white',
        padding: 10,
        marginTop: 15,
        marginLeft: 35,
        marginRight: 35,
        borderRadius:5,
    },
    text: {
        color: 'white'
    },
    icon: {
        paddingBottom: 5,
        flexDirection: 'column',
        alignItems: 'center'
    },
});