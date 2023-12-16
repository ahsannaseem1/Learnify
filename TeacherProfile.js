import { StatusBar } from 'expo-status-bar';
import React, { cloneElement, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, Alert, Pressable, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export default function TeacherProfile() {
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime,setSelectedTime] = useState(null);
    

    const img1 = require('./images/Ahsan.jpg');
    var description = [
        { id: 0, title: 'Years of Exp.', information: '5 Years' },
        { id: 1, title: 'University', information: 'COMSATS' },
        { id: 2, title: 'Teaching to', information: '1-5 Std' },

    ]
    var duration = [
        { id: 0, date: '01',day:'Mon' },
        { id: 1, date: '02',day:'Tue' },
        { id: 2, date: '03',day:'Wed' },
        { id: 3, date: '04',day:'Thu' },
        { id: 4, date: '05',day:'Fri' },
        { id: 5, date: '08',day:'Mon' },
        { id: 6, date: '09',day:'Tue' },

    ]
    var time = [
        { id: 0, time: '01:00 pm' },
        { id: 1, time: '02:00 pm' },
        { id: 2, time: '03:00 pm' },
        { id: 3, time: '04:00 pm' },
        { id: 4, time: '05:00 pm' },
        { id: 5, time: '06:00 pm' },
        { id: 6, time: '07:00 pm' },
        { id: 7, time: '08:00 pm' },

    ]
    const navigation = useNavigation();

    const homeHandle = () => {

        navigation.navigate('Home')
    }
    const bookingHandle = () => {

        navigation.navigate('BookNow')
    }
    return (
        <View style={{ flex: 1, backgroundColor:'#06161C' }}>
            <View style={{ flex: 0.10, alignItems: 'center', flexDirection: 'row', marginTop: 30, backgroundColor: '#06161C', }}>
                <FontAwesome name="angle-left" size={30} style={{ color: 'white', marginLeft: 15 }} />
                <View style={{ flex: 1, alignItems: 'center', marginRight: 15 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Teacher's Profile</Text>
                </View>
            </View>

            <View style={{ flex: 0.90, borderStartStartRadius: 50, borderStartEndRadius: 50, backgroundColor: 'white' }}>

                <View style={{ flexDirection: 'row', marginLeft: 20, }}>
                    <View style={{ marginTop: 30 }}>
                        <Image
                            style={{ width: 80, height: 80, borderRadius: 50 }}
                            source={img1}>
                        </Image>
                    </View>
                    <View style={{ marginTop: 40, marginLeft: 20 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ahsan Naseem</Text>
                        <Text style={{ fontSize: 15, color: '#6b6969', marginTop: 5 }}>Software Engineer</Text>
                    </View>
                </View>

                <View style={{flex:0.1,marginRight:20,marginTop:20,alignItems:'flex-end',justifyContent:'center'}}>
                    <TouchableOpacity>
                        <View style={{backgroundColor:'#e01f50',borderRadius:15,width:150,height:35 ,alignItems: 'center', justifyContent: 'center',flexDirection:'row'}}>
                        <Feather name="message-circle" size={15} color="white" />
                            <Text style={{color:'white',marginLeft:5,fontSize:15}}>Message</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{flex:0.15, marginTop: 20,justifyContent:'center', alignItems:'center' }}>

                   <View style={{borderWidth:1,height:'100%',width:'85%',borderRadius:10}}>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',}}>
                        <Text >Unsffsfsfrsity</Text>
                        <Text>COMSATS</Text>
                    </View>

                   </View>
                </View>

                <View style={{ flex: 0.25,marginTop:40 }}>
                    <Text style={{ fontWeight: 'bold', marginLeft: 20, fontSize: 20 }}>Teaching Hours</Text>
                    <FlatList
                        horizontal
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        data={time}
                        renderItem={({ item }) =>
                        (
                            <TouchableOpacity style={{
                                padding: 5, marginTop: 20, height: '40%', width: 120, borderRadius: 10, marginRight: 5,
                                marginLeft: 15, alignItems: 'center', justifyContent: 'center', borderWidth: selectedTime === item.id ? 0:1, backgroundColor: selectedTime === item.id ? '#e01f50' : 'white',
                            }}
                                onPress={() => setSelectedTime(item.id)}>
                                <View>
                                    <Text style={{ color: selectedTime === item.id ? '#edebe8' : '#06161C' }}> {item.time} </Text>
                    
                                </View>
                            </TouchableOpacity>
                        )
                        }
                        keyExtractor={item => item.id}
                    />

                </View>


            




                 
             

                <View style={{ flex: 0.25,}}>
                    <Text style={{ fontWeight: 'bold', marginLeft: 20, fontSize: 20 }}>Select Date</Text>
                    <FlatList
                        horizontal
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        data={duration}
                        renderItem={({ item }) =>   
                        (
                            <TouchableOpacity style={{
                                padding:5,marginTop: 20, height: '80%', width: 50, borderRadius: 10,marginLeft: 20, alignItems: 'center', justifyContent: 'center', borderWidth: selectedDay === item.id ? 0:1, backgroundColor: selectedDay === item.id ? '#e01f50' : 'white',
                            }}
                                onPress={() => setSelectedDay(item.id)}>
                                <View style={{justifyContent:'center',alignItems:'center'}}>
                                <Text style={{ color: selectedDay === item.id ? '#edebe8' : '#06161C',fontWeight:'bold',fontSize:20 }}> {item.date} </Text>
                                    <Text style={{ color: selectedDay === item.id ? '#edebe8' : '#706f70' ,fontSize:15,marginTop:5}}> {item.day} </Text>
                                </View>
                            </TouchableOpacity>
                        )
                        }
                        keyExtractor={item => item.id}
                    />

                </View>

                <View style={{flex:0.25,marginLeft:20,marginTop:20,alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity onPress={bookingHandle}>
                        <View style={{backgroundColor:'#e01f50',borderRadius:15,width:250,height:35 ,alignItems: 'center', justifyContent: 'center',flexDirection:'row'}}>
                        <FontAwesome5 name="calendar-day" size={15} color="white" />
                            <Text style={{color:'white',marginLeft:10,fontSize:15}}>Make Appointment</Text>
                        </View>
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
    }, tapbutton: {
        flexDirection: 'row',
        height: '100%',
        width: 120,
        padding: 15,
        marginRight: 5,
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderWidth: 1
    }
});
