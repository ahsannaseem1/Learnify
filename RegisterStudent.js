import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { FontAwesome } from '@expo/vector-icons';
import { AddUser } from "./Firebase/AddUser.js";


export default function RegisterStudent() {
  const [fontsLoaded] = useFonts({
    Inconsolata: require('./assets/fonts/Inconsolata/Inconsolata.ttf'),
    Montserrat: require('./assets/fonts/Montserrat/Montserrat.ttf'),
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };


  const navigation = useNavigation();

  // const loginHandle = () => {

  //   navigation.navigate('Login')
  // }

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  // const handleChange = (e) => {
  //   console.log(e.target.name)
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({ ...prevData, [name]: value }));
  // };

  const handleChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const signUp = async () => {
 

    try {
      if (
        formData.firstName.trim() === "" ||
        formData.email.trim() === "" ||
        formData.password.trim() === "" ||
        formData.confirmPassword.trim() === ""
      ) {
        setError("Please fill in all fields.");
        return;
      }

      const hasSpecialCharacters = /[^\w\s]/.test(
        formData.firstName + formData.lastName
      );
      if (hasSpecialCharacters) {
        setError("Name can only contain alphabets");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Invalid email address.");
        return;
      }

      if (formData.password.length < 6) {
        setError("Password should be at least 6 characters long.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Password and confirm Password do not match.");
        return;
      }
      console.log(formData);
      // const response = await axios.post(
      //   "http://10.135.48.157:5000/signUp",
      //   formData
      // );
      AddUser(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      )
        .then(({ user, errorCode }) => {
          // Handle the user data and error code here
          if (user) {
            console.log("User data:", user.uid);
          } else {
            setError(errorCode)
            console.error("Error creating user:", errorCode);
          }
        })
        .catch((error) => {
          // Handle the error
          setError(error);
          console.error("Error creating user:", error);
        });

      navigation.navigate("Login");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    // console.log(formData);
    e.preventDefault();
    signUp();
  };

  const loginHandle = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>

      <View style={{ flex: 0.10, flexDirection: 'row', marginTop: 10, marginLeft: 20, alignItems: 'center', marginTop: 40 }} >
        <FontAwesome name="angle-left" size={30} style={{ color: '#06161C' }} onPress={loginHandle} />
      </View>

      <View style={{ flex: 0.10, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ color: '#06161C', fontSize: 30, fontWeight: 'bold' }}>Create Account</Text>
        <Text style={{ marginTop: 10, width: '70%', textAlign: 'center' }}>Fill your information below or register with your social account.</Text>
      </View>

      <View style={{ flex: 0.40, alignItems: 'center', justifyContent: 'center', }}>

        <View>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              style={{ width: 150, height: 35, borderRadius: 5, paddingLeft: 10, marginRight: 15, borderBottomWidth: 1 }}
              placeholder='First Name'
              placeholderTextColor='#364c59'
              onChangeText={(text) => handleChange("firstName", text)}
                value={formData.firstName}

            />
            <TextInput
              style={{ width: 150, height: 35, borderRadius: 5, paddingLeft: 10, borderBottomWidth: 1, }}
              placeholder='Last Name'
              placeholderTextColor='#364c59'
              onChangeText={(text) => handleChange("lastName", text)}
                value={formData.lastName}

            />
          </View>
          <TextInput
            style={{ width: 315, height: 35, borderRadius: 5, paddingLeft: 10, marginTop: 20, borderBottomWidth: 1 }}
            placeholder='Email'
            placeholderTextColor='#364c59'
            onChangeText={(text) => handleChange("email", text)}
              value={formData.email}
          />

          <View>
            <TextInput
              style={{
                width: 315,
                height: 35,
                marginTop: 20,
                borderRadius: 5,
                paddingLeft: 10,
                borderBottomWidth:1,
              }}
              placeholder="Password"
              placeholderTextColor="#364c59"
              secureTextEntry={!passwordVisible}
              onChangeText={(text) => handleChange("password", text)}
              value={formData.password}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: 10,
                top: 29,
              }}
            >
             {passwordVisible ? (
          <FontAwesome name="eye" size={15} />
        ) : (
          <FontAwesome name="eye-slash" size={15} />
        )}
            </TouchableOpacity>
          </View>
          <View>

            <TextInput
              style={{
                width: 315,
                height: 35,
                marginTop: 20,
                borderRadius: 5,
                paddingLeft: 10,
                borderBottomWidth: 1,
              }}
              placeholder="Confirm Password"
              placeholderTextColor="#364c59"
              secureTextEntry={!confirmPasswordVisible}
              onChangeText={(text) => handleChange("confirmPassword", text)}
              value={formData.confirmPassword}
            />
            <TouchableOpacity
              onPress={toggleConfirmPasswordVisibility}
              style={{
                position: 'absolute',
                top:29,
                right: 10,

              }}
            >
              {confirmPasswordVisible ? (
          <FontAwesome name="eye" size={15} />
        ) : (
          <FontAwesome name="eye-slash" size={15} />
        )}

            </TouchableOpacity>
            {error && <Text style={{ color: "#ED2B2A" }}>{error}</Text>}

          </View>

        </View>



        <View style={{ flex: 0.05, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 50 }}>
          <TouchableOpacity onPress={handleSubmit}>
            <View style={{ backgroundColor: '#06161C', borderRadius: 15, width: 315, height: 35, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'white', textAlign: 'center', }}>Sign Up</Text>
            </View>
          </TouchableOpacity>
        </View>

      </View>

      <View style={{ flex: 0.25, alignItems: "center", justifyContent: 'center' }}>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
          <View style={{ flex: 0.35, height: 1, backgroundColor: 'black', borderWidth: 0.1, }} />
          <View>
            <Text style={{ marginLeft: 7, marginRight: 7, textAlign: 'center' }}>OR</Text>
          </View>
          <View style={{ flex: 0.35, height: 1, backgroundColor: 'black', borderWidth: 0.1, }} />
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', }}>
          <TouchableOpacity>
            <View style={[styles.socialIcon, { marginRight: 20 }]}>
              <FontAwesome name="apple" size={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={[styles.socialIcon, { marginRight: 20 }]}>
              <FontAwesome name="google" size={24} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.socialIcon}>
              <FontAwesome name="facebook" size={24} />

            </View>
          </TouchableOpacity>
        </View>


        <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
          <Text style={{ color: 'black' }}>Already have an account?</Text>
          <TouchableOpacity

            onPress={loginHandle}>
            <Text style={{ color: 'red', marginLeft: 5, fontWeight: 'bold', textDecorationLine: 'underline' }} >Login</Text>
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
    fontSize: 40, marginBottom: 70, fontWeight: 'bold',
  }
  , socialIcon: {
    borderRadius: 50,
    borderWidth: 1,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  }
});
