import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, Alert, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

export default function Intro() {

    const navigation = useNavigation();

    const loginHandle = () => {

        navigation.navigate('Login')
    }
    const signUpHandle = () => {

        navigation.navigate('SignUpOption')
    }



    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <View style={{ flex: 0.75, backgroundColor: '#06161C', borderBottomRightRadius: 60, borderBottomLeftRadius: 60, }}>



                <View style={{ flex: 0.60 }}>
                    <Image
                        style={{ width: '100%', height: '100%', resizeMode: 'center', marginTop: 100 }}
                        source={require('./images/MyLogo.png')}
                    />
                </View>




                <View style={{ flex: 0.40, alignItems: 'center', justifyContent: 'center', marginTop: 80 }}>

                    <Text style={styles.title}>Welcome to <Text style={{ color: 'white' }}>Learnify!</Text></Text>
                    <Text style={{ width: '75%', textAlign: 'center', fontSize: 16, color: 'white' }}>Connect with expert teachers, book online sessions, and unlock your potential with Learnify.</Text>



                </View>

            </View>



            <View style={{ flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={loginHandle}>
                    <View style={{ backgroundColor: '#06161C', borderRadius: 15, width: 250, height:35, alignItems: 'center', justifyContent: 'center',marginTop:40,flexDirection:'row' }}>
                    <Feather name="arrow-right-circle" size={15} color="white" />
                        <Text style={{ color: 'white', textAlign: 'center',marginLeft:5,fontSize:15 }}>Get Started</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 0.45, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text >Don't have an account?</Text>
                    <TouchableOpacity
                        onPress={signUpHandle}>
                        <Text style={{ color: '#e01f50', marginLeft: 5, fontWeight: 'bold', textDecorationLine: 'underline' }} >Sign Up</Text>
                    </TouchableOpacity>

                </View>
            </View>






        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    title: {
        // fontFamily: 'Montserrat',
        fontSize: 30, marginBottom: 15, fontWeight: 'bold',
        marginTop: 0, width: '100%', textAlign: 'center', color: 'white'
    },

});
