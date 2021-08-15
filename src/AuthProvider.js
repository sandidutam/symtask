import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import * as Device from 'expo-device';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';

axios.defaults.baseURL = 'http://192.168.100.109:8000';
// axios.defaults.baseURL = 'http://localhost:8000';


export const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);


  // const [device_name, setdevice_Name] = useState('');

  // const getDeviceName = () => {
  //     abc = Device.modelName;
  //     setdevice_Name(abc);
  // }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        error,
        login: (email, password, device_name) => {
          axios.post('/api/sanctum/token', {
            email,
            password,
            device_name,
          })
          .then(response => {
            const userResponse = {
              email: response.data.user.email,
              token: response.data.token,
              role: response.data.user.role,
            }
            setUser(userResponse);
            // console.log(user);
            setError(null);
            SecureStore.setItemAsync('user', JSON.stringify(userResponse));
          })
          .catch(error => {
            const key = Object.keys(error.response.data.errors)[0];
            setError(error.response.data.errors[key][0]);
          })
        },
        logout: () => {
          axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

          axios.post('/api/logout')
          .then(response => {
            setUser(null);
            SecureStore.deleteItemAsync('user')
            // console.log(valid)
          })
          .catch(error => {
            console.log(error.response);
          })
        }
      }}>
      {children}
    </AuthContext.Provider>
  );
}