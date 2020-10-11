import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import firebase from '../../services/firebaseConnection';


export default function RenderMap(){


    const [markersFoco, setMarkersFoco] = useState([]); //recebe Focos
    const [markersCaso, setMarkersCaso] = useState([]); //recebe Casos
    const [markersRisco, setMarkersRisco] = useState([]);
    //const [region, setRegion] = useState();

    const [region, setRegion] = useState();

    useEffect(() =>{
        async function carregaLocalAtual(){
            await Geolocation.getCurrentPosition(
                async({coords:{latitude, longitude}}) =>{
                    setRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    });
                },
                () => {},   
                {
                    timeout: 2000,
                    maximumAge: 1000
                }
            )
            .then(async()=>{
                await firebase.database().ref('locaisFoco').on('value', (snapshot) =>{
                    setMarkersFoco([]);

                    snapshot.forEach((childItem) =>{
                        let data = {
                            key: childItem.key,
                            coords:{
                                latitude: parseFloat(childItem.val().latitude),
                                longitude: parseFloat(childItem.val().longitude)
                            }
                        };
                        setMarkersFoco(oldArray => [...oldArray, data]);
                    })
                })
            })
            .then(async() => {
                await firebase.database().ref('locaisCaso').on('value', (snapshot) =>{
                    setMarkersCaso([]);

                    snapshot.forEach((childItem) =>{
                        let data = {
                            key: childItem.key,
                            coords:{
                                latitude: parseFloat(childItem.val().latitude),
                                longitude: parseFloat(childItem.val().longitude)
                            }
                        };
                        setMarkersCaso(oldArray => [...oldArray, data]);
                    })
                })
            })
            .then(async()=>{
                await firebase.database().ref('locaisRisco').on('value', (snapshot) =>{
                    setMarkersRisco([]);

                    snapshot.forEach((childItem) =>{
                        let data = {
                            key: childItem.key,
                            coords:{
                                latitude: parseFloat(childItem.val().latitude),
                                longitude: parseFloat(childItem.val().longitude)
                            }
                        };
                        setMarkersRisco(oldArray => [...oldArray, data]);
                    })
                })
            })

        }
        // async function carregaMarkersFoco(){ //carrega os marcadores de Foco
        //     await firebase.database().ref('locaisFoco').on('value', (snapshot) =>{
        //         setMarkersFoco([]);

        //         snapshot.forEach((childItem) =>{
        //             let data = {
        //                 key: childItem.key,
        //                 coords:{
        //                     latitude: parseFloat(childItem.val().latitude),
        //                     longitude: parseFloat(childItem.val().longitude)
        //                 }
        //             };
        //             setMarkersFoco(oldArray => [...oldArray, data]);
        //         })
        //     });
        // }


        // async function carregaMarkersCaso(){ //carrega os marcadores de caso
        //     await firebase.database().ref('locaisCaso').on('value', (snapshot) =>{
        //         setMarkersCaso([]);

        //         snapshot.forEach((childItem) =>{
        //             let data = {
        //                 key: childItem.key,
        //                 coords:{
        //                     latitude: parseFloat(childItem.val().latitude),
        //                     longitude: parseFloat(childItem.val().longitude)
        //                 }
        //             };
        //             setMarkersCaso(oldArray => [...oldArray, data]);
        //         })
        //     });
        // }

        // async function carregaMarkersRisco(){ //carrega os marcadores de caso
        //     await firebase.database().ref('locaisRisco').on('value', (snapshot) =>{
        //         setMarkersRisco([]);

        //         snapshot.forEach((childItem) =>{
        //             let data = {
        //                 key: childItem.key,
        //                 coords:{
        //                     latitude: parseFloat(childItem.val().latitude),
        //                     longitude: parseFloat(childItem.val().longitude)
        //                 }
        //             };
        //             setMarkersRisco(oldArray => [...oldArray, data]);
        //         })
        //     });
        // }
        

        carregaLocalAtual();
        // carregaMarkersFoco();
        // carregaMarkersCaso();
        // carregaMarkersRisco();
    },[])

    return(
        <View>

            <MapView
                minZoomLevel={16}
                style={styles.mapa}
                region={region}
                showsUserLocation
                loadingEnabled
            >

                {
                    markersFoco.map((marker) => { //percorre o array de markers indicando onde há casos confimados de dengue
                        return(
                            <Marker  key={marker.key} coordinate={marker.coords}>
                                <Image source={require('../../assets/icones/mosquitoFoco3.png')} style={styles.icones}/>
                            </Marker>
                        );
                    })

                }

                {
                    markersCaso.map((marker) => {
                        return(
                            <Marker key={marker.key} coordinate={marker.coords}>
                                <Image source={require('../../assets/icones/infectado3.png')} style={styles.icones}/>
                            </Marker>
                        );
                    })
                }

                {
                    markersRisco.map((marker) => {
                        return(
                            <Marker key={marker.key} coordinate={marker.coords}>
                                <Image source={require('../../assets/icones/areaRisco3.png')} style={styles.icones}/>
                            </Marker>
                        );
                    })
                }

            </MapView>
        


        </View>
    );
}

const styles = StyleSheet.create({
    mapa:{
        width: '100%',
        height: 510 
        //height: 420 //dispositivo fisico
    },
    icones:{
        width: 40,
        height: 40
    },
})