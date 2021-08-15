import React, { useEffect, useState, useContext} from 'react';
import { View, Text, StyleSheet, TextInputxc } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";


const Stack = createStackNavigator();

export const AttendantContext = React.createContext({});

export const AttendantProvider = ({children}) => {
    

}

export const ManualAttendant = () => {

    const { login, error } = useContext(AuthContext);
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
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
        {/* { error &&
          <Text style={{ color: 'red', marginBottom: 24 }}>{ error }</Text>
        } */}
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
        {/* <Button
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
        /> */}
      </View>
    );
}