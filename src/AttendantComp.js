import React, { useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { ManualAttendant } from './ManualAttendant';

const TopTab = createMaterialTopTabNavigator();

function AttendIn() {
    return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Presensi Masuk</Text>
        </View>
    );
}

function AttendOut() {
    return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Presensi Masuk</Text>
        </View>
    );
}

function ScanQrCode() {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not yet scanned')
    
    const askForCameraPermission = () => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })()
      }
    
    // Request Camera Permission
    useEffect(() => {
        askForCameraPermission();
      }, []);


     // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setText(data)
        console.log('Type: ' + type + '\nData: ' + data)
    };


    // Check permissions and return the screens
    if (hasPermission === null) {
        return (
        <View style={styles.container}>
            <Text>Requesting for camera permission</Text>
        </View>)
    }
    if (hasPermission === false) {
        return (
        <View style={styles.container}>
            <Text style={{ margin: 10 }}>No access to camera</Text>
            <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
        </View>)
    }

    // Return the View
    return (
        <View style={styles.container}>
            { scanned ? <Text style={{position: 'absolute', top: 15, fontSize:15}}>Scan Berhasil</Text> :
                        <Text style={{position: 'absolute', top: 15, fontSize:15}}>Arahkan kamera ke QR Code</Text>
            }
            <View style={styles.barcodebox}>
                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ height: 400, width: 400 }} />
            </View>
            <Text style={styles.maintext}>{text}</Text>
            
            {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
        </View>
    );
}

function History() {
    return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>History Presensi Ahay</Text>
        </View>
    );
}

export const AttendantComp = ({}) => {
    return (
    <TopTab.Navigator>
        <TopTab.Screen name="Scan" component={ScanQrCode} options={{tabBarLabel:'Scan'}} />
        <TopTab.Screen name="Manual" component={ManualAttendant} options={{tabBarLabel:'Manual'}} />
        <TopTab.Screen name="History" component={History} options={{tabBarLabel:'Riwayat'}} />
    </TopTab.Navigator>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    maintext: {
        fontSize: 16,
        margin: 20,
    },
    barcodebox: {
        position: 'absolute',
        bottom: 320,
        alignItems: 'center',
        justifyContent: 'center',
        height: 250,
        width: 250,
        overflow: 'hidden',
        borderRadius: 20,
        backgroundColor: 'tomato',
    }
  });