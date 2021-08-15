import React, { useContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./AuthProvider";
import { Button, Text, View, TextInput } from "react-native";
import * as Device from 'expo-device';

const Stack = createStackNavigator();

function LoginScreen({ navigation }) {
  const { login, error } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [device_name, setDevice_Name] = useState('');

  const [device_name, setdevice_Name] = useState('');

//   const getDeviceName = () => {
//     var abc = Device.modelName;
//     setdevice_Name(abc);
// }

  useEffect(() => {
    var abc = Device.modelName;
    setdevice_Name(abc);
  })

 
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      { error &&
        <Text style={{ color: 'red', marginBottom: 24 }}>{ error }</Text>
      }
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, padding: 8 }}
        onChangeText={text => setEmail(text)}
        placeholder="Email"
        textContentType="emailAddress"
        autoCapitalize = 'none'
      />
      <TextInput
        style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, padding: 8, marginTop: 24 }}
        onChangeText={text => setPassword(text)}
        placeholder="Password"
        secureTextEntry={true}
      />
      <Button
        title="Login"
        onPress={() => 
          // alert(device_name)
          // console.log(device_name)
          login(email, password, device_name)
          // getUseful()
        }
      />
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}

function RegisterScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Register Screen</Text>
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
      {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
    </View>
  );
}

export const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}
