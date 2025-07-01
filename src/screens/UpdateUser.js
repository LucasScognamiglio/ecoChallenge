import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyText from "../components/MyText";
import MyInputText from "../components/MyInputText";
import MySingleButton from "../components/MySingleButton";

const UpdateUser = () => {

    const [userNameSearch, setUserNameSearch] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setEmail] = useState("");

    const searchUser = async () => {
        console.log("searchUser");
        if(!userNameSearch.trim()){
            Alert.alert("El email de usuario es requerido!");
            return;
        }

        try{
            const user = await AsyncStorage.getItem(userNameSearch);
            if(user){
                const userData = JSON.parse(user);
                setUserName(userData.userName);
                setEmail(userData.email);
            }else{
                Alert.alert("Usuario no encontrado!");
            }
        }catch(error){
            console.error(error);
            Alert.alert("Error al buscar usuario.");
        }
    };

    const updateUser = async () => {
        console.log("updateUser");

        if(!userName.trim()){
            Alert.alert("El nombre de usuario es requerido!");
            return;
        }
        if(!userEmail.trim()){
            Alert.alert("El email es requerido!");
            return;
        }

        try{
            const user = {userName, email: userEmail};
            await AsyncStorage.setItem(userName, JSON.stringify(user));
            Alert.alert("Usuario actualizado");
        }catch(error){
            console.error(error);
            Alert.alert("Error al actualizar el usuario.");
        }
    };

    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.viewContainer }>
                <View style={ styles.generalView }>
                    <ScrollView keyboardShouldPersistTaps= "handled">
                        <KeyboardAvoidingView behavior="padding">
                            <MyText text="Buscar Usuario" style={styles.text} />
                            <MyInputText
                                placeholder="Ingrese email del usuario"
                                style={styles.inputStyle}
                                onChangeText={(text) => setUserNameSearch(text)}
                            />
                            <MySingleButton title="Buscar" customPress={searchUser}/>

                            <MyInputText
                                placeholder="Ingrese nombre del usuario"
                                value={userName}
                                onChangeText={(text) => setUserName(text)}
                            />
                            <MyInputText
                                placeholder="Ingrese email del usuario"
                                value={userEmail}
                                onChangeText={(text) => setEmail(text)}
                            />
                            <MySingleButton title="Actualizar" customPress={updateUser}/>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default UpdateUser;

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
    inputStyle: {
      padding: 15,
    },
    keyboardView: {
      flex: 1,
      justifyContent: "space-between",
    },
  });
  