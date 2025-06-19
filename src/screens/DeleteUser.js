import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, Alert, KeyboardAvoidingView, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyInputText from "../components/MyInputText";
import MySingleButton from "../components/MySingleButton";
import MyText from "../components/MyText";

const DeleteUser = ({ navigation }) => {
    const [userName, setUserName] = useState("");

    const deleteUser = async () => {
        console.log("deleteUser");

        try{
            const user = await AsyncStorage.getItem(userName);

            if(user){
                await AsyncStorage.removeItem(userName);
                Alert.alert("Usuario eliminado!");
                navigation.navigate("HomeScreen");
            }else{
                Alert.alert("El usuario no existe!");
            }
        }catch(error){
            console.error(error);
            Alert.alert("Error al eliminar el usuario!");
        }
    };

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <ScrollView>
                        <MyText text="Buscar usuario a eliminar" style={styles.text}></MyText>
                        <KeyboardAvoidingView style={styles.keyboardView}>
                            <MyInputText
                                placeholder="Nombre de usuario"
                                onChangeText={(text) => setUserName(text)}
                            />
                            <MySingleButton title="Borrar usuario" customPress={deleteUser}/>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default DeleteUser;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    viewContainer: {
      flex: 1,
      backgroundColor: "white",
    },
    generalView: {
      flex: 1,
    },
    text: {
      padding: 10,
      marginLeft: 25,
      color: "black",
    },
    keyboardView: {
      flex: 1,
      justifyContent: "space-between",
    },
  });
  
  