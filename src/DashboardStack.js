import React, { useContext, useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, AntDesign, EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from "./AuthProvider";
import * as Device from 'expo-device';
import axios from 'axios';
import { AttendantComp } from './AttendantComp';
import { HighLevelLedgerComp } from './LedgerComp';
import { NavigationContainer } from '@react-navigation/native';


axios.defaults.baseURL = 'http://192.168.100.109:8000';

export const HighLevelDashboard = ({}) => {
    const { user, logout } = useContext(AuthContext)
    const [name, setName] = useState(null);
    const [data, setData] = useState([]);
    const [deviceName, setDeviceName] = useState('');
    const [role, setRole] = useState(null);

    const deviceId = Device.modelName;
 
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

    axios.get('/api/user')
      .then(response => {
        setName(response.data.nomor_pegawai);
        setRole(response.data.role)
        setDeviceName(deviceId);
      })
      .catch(error => {
        console.log(error.response);
      })

  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>High Level Dashboard Screen Logged In View </Text>
      <Text>Email: {user.email}</Text>
      <Text>No.Pegawai : {name}</Text>
      <Text>Role: {role}</Text>
      <Text>Device Name : {deviceName}</Text>
      <Button title="Go to Settings" onPress={() => navigation.navigate('Account')} />
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
}

export const LowLevelDashboard = ({}) => {
    const { user, logout } = useContext(AuthContext)
    const [name, setName] = useState(null);
    const [data, setData] = useState([]);
    const [deviceName, setDeviceName] = useState('');
    const [role, setRole] = useState(null);

    const deviceId = Device.modelName;
 
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

    axios.get('/api/user')
      .then(response => {
        setName(response.data.nomor_pegawai);
        setRole(response.data.role)
        setDeviceName(deviceId);
      })
      .catch(error => {
        console.log(error.response);
      })

  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Low Level Dashboard Screen Logged In View </Text>
      <Text>Email: {user.email}</Text>
      <Text>No.Pegawai : {name}</Text>
      <Text>Role: {role}</Text>
      <Text>Device Name : {deviceName}</Text>
      <Button title="Go to Settings" onPress={() => navigation.navigate('Account')} />
      <Button title="Logout" onPress={() => logout()} />
    </View>
  );
}