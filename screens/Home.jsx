import React, { useLayoutEffect } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from './../config/firebase';
import colors from '../colors';

const Home = ({ route }) => {
    const { name, lastName, value} = route.params;
    const navigation = useNavigation();

    const onSignOut = () => {
        signOut(auth).catch(error => console.log('Error logging out: ', error));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={onSignOut} style={styles.logoutButton}>
                    <AntDesign name="logout" size={24} color={colors.red} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Bienvenido, {name} {lastName}</Text>
            <Text style={styles.statusText}>Recuerda que tu estado es este: {value}</Text>

            <TouchableOpacity
                onPress={() => navigation.navigate("Chat")}
                style={styles.chatButton}
            >
                <Entypo name="chat" size={24} color={colors.lightGray} />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("Details")}
                style={styles.configButton}
            >
                <Entypo name="cog" size={20} color={colors.black} />
                <Text style={styles.configButtonText}>Configuración</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: "#f2f5f7",
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: '600',
        color: colors.black,
        textAlign: 'center',
        marginBottom: 5,
    },
    statusText: {
        fontSize: 16,
        color: colors.gray,
        textAlign: 'center',
        marginBottom: 40,
    },
    chatButton: {
        backgroundColor: colors.primary,
        height: 60,
        width: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        marginBottom: 40,
    },
    logoutButton: {
        marginRight: 10,
    },
    configButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.secondary,
        paddingVertical: 14,
        paddingHorizontal: 25,
        borderRadius: 12,
        shadowColor: colors.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        marginTop: 30,
    },
    configButtonText: {
        color: colors.black,
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        marginLeft: 10,
    },
});
