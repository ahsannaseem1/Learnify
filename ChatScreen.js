import { StatusBar } from 'expo-status-bar';
import React, { cloneElement, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList,Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';


export default function ChatScreen() {
   
    const navigation = useNavigation();

    const homeHandle = () => {

        navigation.navigate('Home')
    }
    const profileHandle = () => {

        navigation.navigate('UserProfile')
    }




    return (
        <View style={{ flex: 1, backgroundColor: '#06161C', }}>
            <View style={{ flex: 0.10, alignItems: 'center', flexDirection: 'row', marginTop: 30, backgroundColor: '#06161C', }}>
                <FontAwesome name="angle-left" size={30} style={{ color: 'white', marginLeft: 15 }} onPress={homeHandle} />
                <View style={{ flex: 1, alignItems: 'center', marginRight: 25 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Chats</Text>
                </View>
            </View>

            <View style={{ flex: 0.90, borderStartStartRadius: 50, borderStartEndRadius: 50, backgroundColor: 'white', }}>
               



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
    
});
