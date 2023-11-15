import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, Alert, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Icon from 'react-native-ico-material-design';
import { FontAwesome } from '@expo/vector-icons';
import { SignIn } from "./Firebase/SignIn";



export default function Login() {
    const [fontsLoaded] = useFonts({
        Inconsolata: require('./assets/fonts/Inconsolata/Inconsolata.ttf'),
        Montserrat: require('./assets/fonts/Montserrat/Montserrat.ttf'),
    });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };


    const [name, setName] = useState('');


    const navigation = useNavigation();

    const homeHandle = () => {

        navigation.navigate('Home', { name })
    }
    const signUprHandle = () => {

        navigation.navigate('SignUpOption')
    }
    const registerHandle = () => {
        navigation.navigate("Register");
      };
    
      const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
      const [error, setError] = useState("");
    
      const handleChange = (name, value) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
    
      const handleLogin = async () => {
        setError('');
        try {
          if (formData.email.trim() === "" || formData.password.trim() === "") {
            setError("Please fill in all fields.");
            return;
          }
    
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(formData.email)) {
            setError("Invalid email address.");
            return;
          }
    
          // SignIn(formData.email, formData.password).then(({ data, error }) => {
          //   if (data) {
          //     // AsyncStorage.setItem("user", JSON.stringify(data.email));
          //     console.log('User data:', data);
          //     navigation.navigate("UserProfile"); 
          //   } else {
          //     setError(error);
          //     console.error('Error signing in:', error);
          //   }
          // });
    
          const { data, error } = await SignIn(formData.email, formData.password);
    
    if (data) {
      setError('');
      console.log("User data:", data);
      navigation.navigate("Home",{name:data.firstName});
    } else {
      setError(error);
      console.log("Error signing in:", error);
    }
    
          // const response = await axios.post(
          //   "http://10.135.48.157:5000/signIn",
          //   formData
          // );
    
          // if (response.data) {
          //   setFormData({
          //     email: "",
          //     password: "",
          //   });
          //   await AsyncStorage.setItem("user", JSON.stringify(response.data));
          //   navigation.navigate("UserProfile");
          // }
        } catch (error) {
          setError(error.response.data.message);
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin();
      };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >

            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <View style={{ flex: 0.50 }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={require('./images/MyLogo.png')}
                        /></View>


                </View>




                <View style={{ flex: 0.40, alignItems: 'center', justifyContent: 'center', }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 50 }}>
                        <Text style={styles.title}>Login</Text>
                    
                    </View>



                    <View>

                        <TextInput
                            style={{ width: 200, height: 35, borderRadius: 5, paddingLeft: 10, borderBottomWidth: 1, }}
                            placeholder='Email'
                            placeholderTextColor='#364c59'
                            onChangeText={(text) => handleChange("email", text)}
              value={formData.email}
                        />
                        <View>
                            <TextInput
                                style={{
                                    width: 200,
                                    height: 35,
                                    marginTop: 20,
                                    borderRadius: 5,
                                    paddingLeft: 10,
                                    borderBottomWidth: 1,
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
                            {error && <Text style={{ color: "#ED2B2A" }}>{error}</Text>}

                        </View>

                        <TouchableOpacity>
                            <Text style={{ marginTop: 6, fontSize: 11, textDecorationLine: 'underline', textAlign: 'right' }}>Forget Password?</Text>
                        </TouchableOpacity>
                    </View>



                </View>



                <View style={{ flex: 0.20, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <TouchableOpacity onPress={handleSubmit}>
                        <View style={{ backgroundColor: '#06161C', borderRadius: 20, width: 200, height: 35, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 0.10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                    <Text >Don't have an account?</Text>
                    <TouchableOpacity
                        onPress={signUprHandle}>
                        <Text style={{ color: '#e01f50', marginLeft: 5, fontWeight: 'bold', textDecorationLine: 'underline' }} >Sign Up</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </KeyboardAvoidingView>
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
        fontSize: 35, fontWeight: 'bold',
        marginTop:25
    },

});
