import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ImageWelcome = require("../assets/adaptive-icon.png");

const DetailScreen = ({navigation}) => {
     //User Name
     const [name, setName] = useState("");
     const [lastName, setLastName] = useState("");

     //DropDown Menu
     const [open, setOpen] = useState(false);
     const [value, setValue] = useState(null);
     const [items, setItems] = useState([
          { label: 'Conectado', value: 'Conectado', icon: () => <FontAwesome name="circle" size={15} color="green" /> },
          { label: 'Desconectado', value: 'Desconectado', icon: () => <FontAwesome name="circle" size={15} color="gray" /> },
     ]);

     const onHandledChanges = () => {
          if (name !== "" && lastName !== "") {
               navigation.navigate('Home', { name, lastName, value});
          }    
     }

     return (
          <View style={StylesConfig.container}>
               <Image source={ImageWelcome} style={StylesConfig.Image} />
               
               <SafeAreaView style={StylesConfig.ConfigsForm}>
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
     Image: {
          width: 80,
          height: 80,
          marginBottom: 20,
          borderRadius: 10,
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
     },
     textButton: {
          color: '#ffffff',
          fontSize: 16,
          fontWeight: 'bold',
     },
});
