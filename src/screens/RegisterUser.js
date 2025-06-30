import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, TextInput, TouchableOpacity, Text, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const RegisterUser = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [profilePhoto, setProfilePhoto] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });
        if (!result.canceled) {
            setProfilePhoto(result.assets[0].uri);
        }
    };

    const clearData = () => {
        setFullName("");
        setEmail("");
        setAge("");
        setNeighborhood("");
        setProfilePhoto(null);
    };

    const registerUser = async () => {
        if (!fullName.trim()) {
            Alert.alert("Ingrese su nombre completo");
            return;
        }
        if (!email.trim() || email.indexOf("@") === -1) {
            Alert.alert("Ingrese un correo electrónico válido");
            return;
        }
        if (!age.trim() || isNaN(age)) {
            Alert.alert("Ingrese una edad válida");
            return;
        }
        if (!neighborhood.trim()) {
            Alert.alert("Ingrese su barrio o zona de residencia");
            return;
        }
        if (!profilePhoto) {
            Alert.alert("Seleccione una foto de perfil");
            return;
        }
        try {
            //Verificar si el   correo  existe
            const keys = await AsyncStorage.getAllKeys();
            const result = await AsyncStorage.multiGet(keys);
            const exists = result.map(req => JSON.parse(req[1])).some(u => u.email === email);
            if (exists) {
                Alert.alert("El correo electrónico ya está registrado");
                return;
            }
            const user = {
                userName: fullName,
                email,
                age,
                neighborhood,
                profilePhoto,
                nivel: 'Principiante',
                retos: 0,
                puntos: 0,
            };
            await AsyncStorage.setItem(email, JSON.stringify(user));
            clearData();
            Alert.alert(
                "Éxito",
                "Usuario registrado!!!",
                [{ text: "OK", onPress: () => navigation.navigate('UserPanel', {
                    userName: user.userName,
                    nivel: user.nivel,
                    retos: user.retos,
                    puntos: user.puntos,
                }) }],
                { cancelable: false }
            );
        } catch (error) {
            Alert.alert("Error al registrar usuario.");
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'space-between' }}>
                            <TextInput
                                placeholder="Nombre completo"
                                onChangeText={setFullName}
                                style={{ padding: 15, textAlignVertical: 'top', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, margin: 10 }}
                                value={fullName}
                            />
                            <TextInput
                                placeholder="Correo electrónico"
                                keyboardType="email-address"
                                onChangeText={setEmail}
                                style={{ padding: 15, textAlignVertical: 'top', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, margin: 10 }}
                                value={email}
                                autoCapitalize="none"
                            />
                            <TextInput
                                placeholder="Edad"
                                keyboardType="numeric"
                                onChangeText={setAge}
                                style={{ padding: 15, textAlignVertical: 'top', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, margin: 10 }}
                                value={age}
                            />
                            <TextInput
                                placeholder="Barrio o zona de residencia"
                                onChangeText={setNeighborhood}
                                style={{ padding: 15, textAlignVertical: 'top', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, margin: 10 }}
                                value={neighborhood}
                            />
                            <TouchableOpacity style={{ backgroundColor: '#1976d2', padding: 15, margin: 15, borderRadius: 10, alignItems: 'center' }} onPress={pickImage}>
                                <Text style={{ color: 'white', fontSize: 16 }}>Seleccionar foto de perfil</Text>
                            </TouchableOpacity>
                            {profilePhoto && (
                                <Image source={{ uri: profilePhoto }} style={{ width: 120, height: 120, borderRadius: 60, alignSelf: 'center', marginBottom: 15 }} />
                            )}
                            <TouchableOpacity style={{ backgroundColor: 'black', padding: 20, margin: 15, borderRadius: 10, alignItems: 'center' }} onPress={registerUser}>
                                <Text style={{ color: 'white', fontSize: 16 }}>Guardar Usuario</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default RegisterUser;