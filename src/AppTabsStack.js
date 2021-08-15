import React, { useContext, useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, AntDesign, EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from "./AuthProvider";
import * as Device from 'expo-device';
import axios from 'axios';
import { AttendantComp } from './AttendantComp';
import { LedgerComp } from './LedgerComp';
import { NavigationContainer } from '@react-navigation/native';
import { HighLevel, LowLevel } from './AuthLevelStack';



axios.defaults.baseURL = 'http://192.168.100.109:8000';
// axios.defaults.baseURL = 'http://localhost:8000';


const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();



export const AppStack = ({}) => {
  const { user, logout, } = useContext(AuthContext);
  // const [ valid, setValid ] = useState(false);
  // const [ role, setRole] = useState(null);

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    var setRole = (user.role);
    // console.log(role);


    axios.get('/api/user')
      .then(response => {
        var key = "SuperAdmin";
        if (setRole === key ) {
          // debug
          console.log('success');

        } else {
          console.log('fail');
        }
        // console.log(setRole);
      })
      .catch(error => {
        console.log(error.response);
      })

  }, []);

  

  return (
    
    <NavigationContainer independent={true} >
      {/* {console.log(valid)} */}
      {(user.role) === 'SuperAdmin' ? <HighLevel /> : <LowLevel />  }
    </NavigationContainer>
  );
};

