import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "../screens/HomeScreen";
import RegisterUser from "../screens/RegisterUser";
import UpdateUser from "../screens/UpdateUser";
import ViewAllUsers from "../screens/ViewAllUsers";
import ViewUser from "../screens/ViewUser";
import DeleteUser from "../screens/DeleteUser";
import LoginScreen from '../screens/LoginScreen';
import UserPanel from '../screens/UserPanel';
import AdminChallengeScreen from '../screens/AdminChallengeScreen';
import ChallengeListScreen from '../screens/ChallengeListScreen';
import ChallengeParticipationScreen from '../screens/ChallengeParticipationScreen';
import AdminParticipationsScreen from '../screens/AdminParticipationsScreen';
import AdminCategoriesScreen from '../screens/AdminCategoriesScreen';

const Stack = createStackNavigator();

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginScreen">
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{ title: 'Iniciar Sesión' }}
                />
                <Stack.Screen
                    name="UserPanel"
                    component={UserPanel}
                    options={{ title: 'Panel de usuario' }}
                />
                <Stack.Screen
                    name="HomeScreen"
                    component={ HomeScreen }
                    options={ { title: "Home" } }
                />
                <Stack.Screen
                    name="RegisterUser"
                    component={ RegisterUser }
                    options={ { title: "Registrar Usuario" } }
                />
                <Stack.Screen
                    name="UpdateUser"
                    component={ UpdateUser }
                    options={ { title: "Modificar Usuario" } }
                />
                <Stack.Screen
                    name="ViewAllUsers"
                    component={ ViewAllUsers }
                    options={ { title: "Ver todos los usuarios" } }
                />
                <Stack.Screen
                    name="ViewUser"
                    component={ ViewUser }
                    options={ { title: "Ver Usuario" } }
                />
                <Stack.Screen
                    name="DeleteUser"
                    component={ DeleteUser }
                    options={ { title: "Borrar Usuario" } }
                />
                <Stack.Screen
                    name="AdminChallengeScreen"
                    component={AdminChallengeScreen}
                    options={{ title: 'Alta de Retos' }}
                />
                <Stack.Screen
                    name="ChallengeListScreen"
                    component={ChallengeListScreen}
                    options={{ title: 'Retos Disponibles' }}
                />
                <Stack.Screen
                    name="ChallengeParticipationScreen"
                    component={ChallengeParticipationScreen}
                    options={{ title: 'Participación en Reto' }}
                />
                <Stack.Screen
                    name="AdminParticipationsScreen"
                    component={AdminParticipationsScreen}
                    options={{ title: 'Participaciones de Retos' }}
                />
                <Stack.Screen
                    name="AdminCategoriesScreen"
                    component={AdminCategoriesScreen}
                    options={{ title: 'Categorías de Reciclaje' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;