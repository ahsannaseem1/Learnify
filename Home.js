import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, Alert, Pressable, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';

import { useNavigation, useRoute } from '@react-navigation/native';

export default function Home() {

  const currentDate = new Date();
  const time = currentDate.getHours();
  let greetingtext = "";
  const img1 = require('./images/web.jpg');

  if (time >= 0 && time < 12) {
    greetingtext = "Good Morning";

  } else if (time > 12 && time <= 16) {
    greetingtext = "Good Afternoon";

  } else if (time > 16 && time <= 18) {
    greetingtext = "Good Evening";
  }
  else if (time > 18 && time <= 24) {
    greetingtext = "Good Night";

  }



  var subjects = [
    { id: 0, title: 'All' },
    { id: 1, title: 'Islamiyat' },
    { id: 2, title: 'English' },
    { id: 3, title: 'Urdu', },
    { id: 4, title: 'Maths', },
    { id: 5, title: 'Science', },
    { id: 6, title: 'Pakistan St', },
  ]

  var courses = [
    { id: 0, heading: 'All', price: '$1', },
    { id: 1, heading: 'Islamiyat', price: '$1', },
    { id: 2, heading: 'English', price: '$1', },
    { id: 3, heading: 'Urdu', price: '$1', },    
  ]
  const [selectedSubject, setSelectedSubject] = useState(subjects[0].id);
  const [selectedIcon, setSelectedIcon] = useState('home');

  const route = useRoute();
const name=route.params.name;
  const navigation = useNavigation();

  const profileHandle = () => {

    navigation.navigate('UserProfile')
  }
  const messagesHandle = () => {

    navigation.navigate('Messages')
  }
  const handleIconPress = (iconName) => {
    setSelectedIcon(iconName);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>


      <View style={{ flex: 0.4, backgroundColor: '#06161C', borderBottomRightRadius: 60, borderBottomLeftRadius: 60, }}>
        <View style={{ flex: 1, marginLeft: 20, flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
          {/* <FontAwesome name="bars" size={20} style={{ color: 'white' }} /> */}
          <Text style={{ color: 'white', fontSize: 23, marginLeft: 20 }}>Hi, {name} !</Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>
          <Text style={{ color: '#f2f4f5', fontSize: 15, width: '90%', marginLeft: 30, marginBottom: 0, }}>{greetingtext}</Text>
          <Text style={{ color: 'white', fontSize: 25, width: '90%', marginLeft: 30, marginTop: 10, fontWeight: 'bold' }}>Find Expert Tutors for Academic Excellence!</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 20, height: 35, width: '80%', marginTop: 20 }}>
            <FontAwesome name="search" size={15} style={{ color: 'black', marginRight: 5, paddingLeft: 15 }} />

            <TextInput
              style={{ height: 35, paddingLeft: 15, }}
              placeholder='Search'
              placeholderTextColor='#364c59'
            />
          </View>
        </View>
      </View>


      <View style={{ flex: 0.12, marginTop: 20, }}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 15, marginBottom: 15 }}>Categories</Text>

        <FlatList
          horizontal
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          data={subjects}
          renderItem={({ item }) =>
          (
            <TouchableOpacity style={[styles.tapbutton, { backgroundColor: selectedSubject === item.id ? '#e01f50' : 'white', borderWidth: selectedSubject === item.id ? 0 : 1 },]}
              onPress={() => setSelectedSubject(item.id)}>
              <View>
                <Text style={{ color: selectedSubject === item.id ? 'white' : '#06161C' }}> {item.title} </Text>
              </View>
            </TouchableOpacity>
          )
          }
          keyExtractor={item => item.id}
        />

        <View>

        </View>

      </View>

      <View style={{ flex: 0.30,marginTop:15}}>
        <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 15, marginBottom: 15 }}>Top Courses</Text>


        <TouchableOpacity>
          <View style={styles.cardContainer}>
            <Image
              source={img1}
              style={styles.cardImage}
            />
            <Text style={styles.cardHeading}>Web Development</Text>
            <Text style={styles.cardPrice}>$20</Text>
          </View>
        </TouchableOpacity>




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
              onPress={messagesHandle}
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
    justifyContent:'center',
    position: 'absolute',
    bottom: 30,
    width:'100%',

  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
    backgroundColor: '#06161C',
    borderRadius: 20,
  },
  icon: {
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
  button: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
  }, cardContainer: {
    width: '40%',
    backgroundColor:'#fcfcfc',
    borderRadius: 11,
    marginLeft: 15,
    height: '85%'

  },
  cardImage: {
    width: '100%',
    height: '60%',
    borderStartEndRadius: 10,
    borderStartStartRadius: 10

  },
  cardHeading: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 5
  },
  cardPrice: {
    fontSize: 15,
    color: '#e01f50',
    marginTop: 10,
    marginLeft: 5
  },
});
