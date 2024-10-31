import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import colors from '../colors';


const DetailScreen = ({ navigation }) => {
    const ImageSettings = require("../assets/Engranaje001.png")
    // User Name
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");

    // DropDown Menu State
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Conectado', value: 'Conectado', icon: () => <FontAwesome name="circle" size={15} color="green" /> },
        { label: 'Desconectado', value: 'Desconectado', icon: () => <FontAwesome name="circle" size={15} color="gray" /> },
    ]);

    // DropDown Menu theme
    const [openTheme, setOpenTheme] = useState(false);
    const [valueTheme, setValueTheme] = useState(null);
    const [itemsTheme, setItemsTheme] = useState([
        { label: 'Naranja', value: colors.primary },
        { label: 'Blanco', value: colors.lightGray },
    ]);

    // Save changes 
    const onHandledChanges = () => {
        if (name !== "" && lastName !== "" && value != null && valueTheme != null) {
            navigation.navigate('Home', { name, lastName, value, valueTheme });
        } else {
            console.log("Rellena los campos");
        }
    };

    return (
        <View style={StylesConfig.container}>
            
            <SafeAreaView style={StylesConfig.ConfigsForm}>
                <Image source={ImageSettings} style={StylesConfig.Image}/>
                <View style={StylesConfig.inputContainer}>
                    <Text style={StylesConfig.ConfigOption}>Nombre completo</Text>
                    <TextInput
                        style={StylesConfig.input}
                        placeholder='Enter your First Name'
                        autoCapitalize='words'
                        keyboardType='default'
                        autoFocus={true}
                        autoCorrect={false}
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={StylesConfig.input}
                        placeholder='Enter your Last Name'
                        autoCapitalize='words'
                        keyboardType='default'
                        autoCorrect={false}
                        value={lastName}
                        onChangeText={setLastName}
                    />
                </View>

                <View style={StylesConfig.dropdownContainer}>
                    <Text style={StylesConfig.ConfigOption}>Estado</Text>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="Seleccionar opción"
                        style={StylesConfig.dropDownStyle}
                        textStyle={StylesConfig.dropDownTextStyle}
                        dropDownContainerStyle={StylesConfig.dropDownContainerStyle}
                    />

                    <Text style={StylesConfig.ConfigOption}>Tema</Text>
                    <DropDownPicker
                        open={openTheme}
                        value={valueTheme}
                        items={itemsTheme}
                        setOpen={setOpenTheme}
                        setValue={setValueTheme}
                        setItems={setItemsTheme}
                        placeholder='Selecciona un tema'
                        style={[StylesConfig.dropDownStyle, { zIndex: 10 }]} // Asegúrate de que este zIndex sea alto
                        textStyle={StylesConfig.dropDownTextStyle}
                        dropDownContainerStyle={[StylesConfig.dropDownContainerStyle, { position: 'absolute', zIndex: 20 }]} // Asegúrate de que este zIndex sea más alto
                    />
                </View>
            </SafeAreaView>

            <TouchableOpacity style={StylesConfig.saveButton} onPress={onHandledChanges}>
                <Text style={StylesConfig.textButton}>Guardar Cambios</Text>
            </TouchableOpacity>
        </View>
    );
}

export default DetailScreen;

const StylesConfig = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        padding: 20,
    },
    ConfigsForm: {
        width: '100%',
    },
    inputContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    ConfigOption: {
        fontSize: 16,
        fontWeight: '600',
        color: '#495057',
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#f1f3f5',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#212529',
        borderWidth: 1,
        borderColor: '#ced4da',
        marginBottom: 10,
    },
    dropdownContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    dropDownStyle: {
        backgroundColor: '#ffffff',
        borderColor: '#ced4da',
        borderRadius: 8,
    },
    dropDownTextStyle: {
        color: '#495057',
        fontSize: 16,
    },
    dropDownContainerStyle: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        borderColor: '#ced4da',
    },
    saveButton: {
        backgroundColor: '#1e88e5',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        alignItems: 'center',
        marginTop: 20,
        width: '80%',
        zIndex:-1
    },
    textButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    Image:{
        height:130,
        width:130,
        marginTop:-120,
        alignSelf:'center',
    }
});
