import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChallengeParticipationScreen = ({ route }) => {
  const { reto, userName } = route.params || {};
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState('(-34.6037, -58.3816)'); // Simulado
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('Pendiente'); // Simulado

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!photo) {
      Alert.alert('Por favor, sube una fotografía como evidencia.');
      return;
    }
    const participation = {
      userName,
      reto,
      photo,
      location,
      comment,
      status: 'Pendiente',
    };
    try {
      const stored = await AsyncStorage.getItem('participations');
      let participations = stored ? JSON.parse(stored) : [];
      participations.push(participation);
      await AsyncStorage.setItem('participations', JSON.stringify(participations));
      Alert.alert('Participación enviada', 'Tu participación ha sido registrada y está pendiente de revisión.');
      setStatus('Pendiente');
    } catch (e) {
      Alert.alert('Error al guardar la participación');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#2e7d32', marginBottom: 10 }}>{reto?.nombre}</Text>
      <Text style={{ marginBottom: 5 }}>Descripción: {reto?.descripcion}</Text>
      <Text style={{ marginBottom: 5 }}>Categoría: {reto?.categoria}</Text>
      <Text style={{ marginBottom: 5 }}>Fecha límite: {reto?.fecha}</Text>
      <Text style={{ marginBottom: 10 }}>Puntaje: {reto?.puntaje}</Text>
      <TouchableOpacity style={{ backgroundColor: '#1976d2', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 15 }} onPress={pickImage}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Subir Fotografía</Text>
      </TouchableOpacity>
      {photo && <Image source={{ uri: photo }} style={{ width: 200, height: 150, borderRadius: 10, alignSelf: 'center', marginBottom: 10 }} />}
      <Text style={{ marginBottom: 5 }}>Ubicación (simulada): {location}</Text>
      <TextInput
        placeholder="Comentario opcional"
        placeholderTextColor="gray"
        value={comment}
        onChangeText={setComment}
        style={{ backgroundColor: '#e0e0e0', borderRadius: 8, padding: 10, marginBottom: 15, marginTop: 10 }}
        multiline
      />
      <TouchableOpacity style={{ backgroundColor: 'green', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 15 }} onPress={handleSubmit}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Enviar Participación</Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 16, marginTop: 10 }}>Estado de revisión: <Text style={{ fontWeight: 'bold' }}>{status}</Text></Text>
    </View>
  );
};

export default ChallengeParticipationScreen; 