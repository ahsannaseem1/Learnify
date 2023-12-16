import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, Alert, KeyboardAvoidingView, TouchableOpacity,TouchableWithoutFeedback,Keyboard,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import Icon from 'react-native-ico-material-design';
import { FontAwesome } from '@expo/vector-icons';
import { SignIn } from "./Firebase/SignIn";
import { Entypo } from '@expo/vector-icons'; 




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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

           
            <View style={{ flex: 1, backgroundColor: 'white' }}>

            <View style={{ flex: 0.55 }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image
                            style={{ width: '100%', height: '100%' }}
                            source={require('./images/login01.png')}
                        />
                        </View>


                </View>




                <View style={{ flex: 0.65, alignItems: 'center', justifyContent: 'center',backgroundColor:'#092636',borderStartStartRadius:50,borderStartEndRadius:50,}}>
                    <View style={{ flex: 0.3,alignItems:'left',justifyContent:'center',marginTop:20}}>
                        <Text style={styles.title}>Login</Text>
                        <Text style={{marginTop:10,color:'white'}}>Login with your email and password</Text>
                    
                    </View>



                    <View style= {{flex:0.45,marginTop:50,}}>

                        <TextInput
                            style={{ width: 250, height: 35, borderRadius: 5, paddingLeft: 10, borderBottomWidth: 1,borderColor:'white',color: 'white'}}
                            placeholder='Email'
                            placeholderTextColor="#e3e3e3"
                            onChangeText={(text) => handleChange("email", text)}
              value={formData.email}
                        />
                        <View>
                            <TextInput
                                style={{
                                    width: 250,
                                    height: 35,
                                    marginTop: 20,
                                    borderRadius: 5,
                                    paddingLeft: 10,
                                    borderBottomWidth: 1,
                                    borderColor:'white',
                                    color: 'white'
                                }}
                                placeholder="Password"
                                placeholderTextColor="#e3e3e3"
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
                                    <FontAwesome name="eye" size={15} color="white" />
                                ) : (
                                    <FontAwesome name="eye-slash" size={15} color="white"/>
                                )}
                            </TouchableOpacity>
                            

                        </View>

                        <TouchableOpacity>
                            <Text style={{ marginTop: 10, fontSize: 11, textDecorationLine: 'underline', textAlign: 'right',color:'white' }}>Forgot Password?</Text>
                        </TouchableOpacity>
                        {error && <Text style={{ color: "#e01f50", }}>{error}</Text>}
                       
                    </View>


                    

                <View style={{ flex: 0.15,  flexDirection: 'row'}}>
                    <TouchableOpacity onPress={handleSubmit}>
                        <View style={{ backgroundColor: 'white', borderRadius: 15, width: 250, height: 35, alignItems: 'center', justifyContent: 'center',flexDirection:'row' }}>
                        <Entypo name="login" size={15} color="black" />  
                        <Text style={{ color: 'black', textAlign: 'center',marginLeft:5,fontSize:15 }}>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 0.25, flexDirection: 'row', }}>
                    <Text style={{color:'white'}}>Don't have an account?</Text>
                    <TouchableOpacity
                        onPress={signUprHandle}>
                        <Text style={{ color: '#e01f50', marginLeft: 5, fontWeight: 'bold', textDecorationLine: 'underline' }} >Sign Up</Text>
                    </TouchableOpacity>

                </View>
                    



                </View>



            </View>
            </ScrollView>

        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
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
        color:'white'
    },

});
