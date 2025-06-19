import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";

import MyButton from "../components/MyButton";

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.viewContainer }>
                <View style={ styles.generalView }>
                    <View style={ styles.generalView }>
                        <ScrollView>
                            <MyButton
                            title="Alta de Retos"
                            btnColor="orange"
                            btnIcon="plus-circle"
                            customPress={() => navigation.navigate("AdminChallengeScreen")}
                            />
                            <MyButton
                            title="Ver Participaciones de Retos"
                            btnColor="teal"
                            btnIcon="check-circle"
                            customPress={() => navigation.navigate("AdminParticipationsScreen")}
                            />
                            <MyButton
                            title="Registro de Usuarios"
                            btnColor="green"
                            btnIcon="user-plus"
                            customPress={() => navigation.navigate("RegisterUser")}
                            />
                            <MyButton
                            title="Actualizar Usuario"
                            btnColor="red"
                            btnIcon="user-circle"
                            customPress={() => navigation.navigate("UpdateUser")}
                            />
                            <MyButton
                            title="Ver Usuario"
                            btnColor="blue"
                            btnIcon="users"
                            customPress={() => navigation.navigate("ViewUser")}
                            />
                            <MyButton
                            title="Borrar Usuario"
                            btnColor="brown"
                            btnIcon="user-times"
                            customPress={() => navigation.navigate("DeleteUser")}
                            />
                            <MyButton
                            title="Ver todos los Usuarios"
                            btnColor="purple"
                            btnIcon="user-times"
                            customPress={() => navigation.navigate("ViewAllUsers")}
                            />
                        </ScrollView>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewContainer: {
        flex: 1,
        backgroundColor: "black",
    },
    generalView: {
        flex: 1,
        justifyContent: "center",
    },
});