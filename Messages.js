import { StatusBar } from 'expo-status-bar';
import React, { cloneElement, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList,Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';


const message = [
    { id: 0, name: 'Ahsan', text: 'Assalam o Alaikum', img: require('./images/Ahsan.jpg') },
    { id: 1, name: 'Babar', text: 'How are you?', img: require('./images/Ahsan.jpg') },
    { id: 2, name: 'Shaheen', text: 'How are you?', img: require('./images/Ahsan.jpg') },
    { id: 3, name: 'Abdullah', text: 'How are you?', img: require('./images/Ahsan.jpg') },
    { id: 4, name: 'Sameer', text: 'How are you?', img: require('./images/Ahsan.jpg') },
    { id: 5, name: 'Anaya', text: 'How are you?', img: require('./images/Ahsan.jpg') },
    { id: 6, name: 'Minahil', text: 'How are you?', img: require('./images/Ahsan.jpg') },

]

export default function Messages() {
    const [selectedIcon, setSelectedIcon] = useState('comments');
    const handleIconPress = (iconName) => {
        setSelectedIcon(iconName);
    };


    const navigation = useNavigation();

    const homeHandle = () => {

        navigation.navigate('Home')
    }
    const chatHandle = () => {

        navigation.navigate('ChatScreen')
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
                <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center' }}>


                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', height: 45, width: '80%', borderBottomWidth: 1, borderRadius: 20 }}>
                        <FontAwesome name="search" size={15} style={{ color: 'black', marginRight: 5, paddingLeft: 15 }} />
                        <TextInput
                            style={{ height: 35, paddingLeft: 15, }}
                            placeholder='Search'
                            placeholderTextColor='#364c59'
                        />
                    </View>
                </View>

                <View style={{flex:0.75,marginTop:10}}>
                    <FlatList
                        data={message}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.itemContainer} onPress={chatHandle}>
                                <Image source={item.img} style={styles.avatar} />
                                <View style={styles.messageContainer}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.text}>{item.text}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />

                </View>

                <View style={styles.navContainer}>
                    <View style={styles.navbar}>
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => handleIconPress('home')}
                        >
                            <FontAwesome
                                name="home"
                                size={25}
                                onPress={homeHandle}
                                style={{ color: selectedIcon === 'home' ? '#e01f50' : 'white' }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => handleIconPress('comments')}
                        >
                            <FontAwesome
                                name="comments"
                                size={25}

                                style={{ color: selectedIcon === 'comments' ? '#e01f50' : 'white' }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => handleIconPress('gear')}
                        >
                            <FontAwesome
                                name="gear"
                                size={25}
                                style={{ color: selectedIcon === 'gear' ? '#e01f50' : 'white' }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={() => handleIconPress('user')}
                        >
                            <FontAwesome
                                name="user"
                                size={25}
                                onPress={profileHandle}
                                style={{ color: selectedIcon === 'user' ? '#e01f50' : 'white' }}
                            />
                        </TouchableOpacity>
                    </View>
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
    navContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 30,
        width: '100%',

    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '80%',
        backgroundColor: '#06161C',
        borderRadius: 20,
    }, icon: {
        padding: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tapbutton: {
        flex: 1,
        flexDirection: 'row',
        height: 35,
        width: 100,
        padding: 5,
        marginRight: 2,
        marginLeft: 15,
        backgroundColor: '#06161C',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 1

    },
    itemContainer: {
      flexDirection: 'row',
      marginBottom: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft:15,
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 50,
      marginRight: 15,
    },
    messageContainer: {
      flex: 1,
      height:65,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      
    },
    name: {
      fontWeight: 'bold',
      marginBottom: 5,
      fontSize:16
    },
    text: {
    
    },
});
