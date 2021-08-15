import { StatusBar } from 'expo-status-bar';
import React,{ useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { Providers } from './src/Providers';

// export default App = () => {
//   const [isLoading, setLoading] = useState(true);
//   const [data, setData] = useState([]);

//   const getMovies = async () => {
//     try {
//       const response = await fetch('http://192.168.100.109:8000/api/dummy');
//       const json = await response.json();
//       setData(json.user);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     getMovies();
//   }, []);

//   return (
//     <View style={{ flex: 1, padding: 24 }}>
//       {isLoading ? <ActivityIndicator/> : (
//         <FlatList
//           data={data}
//           keyExtractor={({ id }, index) => id.toString() }
//           renderItem={({ item }) => (
//             <Text>
//                 ID: {item.id} {"\n"}
//                 Nomor Pegawai: {item.nomor_pegawai} {"\n"}
//                 Nama Depan: {item.nama_depan} {"\n"}
//                 Email: {item.email}</Text>
                  
//           )}
//         />
//       )}
//     </View>
//   );
// };

export default Providers;