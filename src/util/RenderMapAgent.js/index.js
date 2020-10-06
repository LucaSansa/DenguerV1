import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
//import LinearGradient from 'react-native-linear-gradient';
import Geocoder from 'react-native-geocoder';
import firebase from '../../services/firebaseConnection';
//import { TouchableOpacity } from 'react-native-gesture-handler';

export default function RenderMapAgent(){
    
    const [markersFoco, setMarkersFoco] = useState([]); //recebe Focos
    const [markersCaso, setMarkersCaso] = useState([]); //recebe Casos
    const [markersRisco, setMarkersRisco] = useState([]);
    const [region, setRegion] = useState();
    

    //teste
    /*const [lat, setLat] = useState();
    const [long, setLong] = useState();*/

    useEffect(() =>{
        async function localAgente(){  // captura a localização atualizada do Agente endemico
            await Geolocation.watchPosition(
                async({coords:{latitude, longitude}}) =>{ //UTLIZAR ESTA SINTAXE!! capitura o local atual
                    setRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    });
                },
                () => {},   
                {
                    timeout: 20000,
                    maximumAge: 20000
                }
            )

        }

        async function carregaMarkersFoco(){ //carrega os marcadores de Foco
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
            });
        }


        async function carregaMarkersCaso(){ //carrega os marcadores de caso
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
            });
        }

        async function carregaMarkersRisco(){ //carrega os marcadores de caso
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
            });
        }
        

        localAgente();
        carregaMarkersFoco();
        carregaMarkersCaso();
        carregaMarkersRisco();
    },[])

    //FUNÇOES DE CADASTROS
    async function cadastrarFoco(lat, long){
        let locais = await firebase.database().ref('locaisFoco');
        let chave = (await locais.push()).key;

        locais.child(chave).set({
            latitude: lat,
            longitude: long
        })
    }

    async function cadastrarCaso(lat, long){
        let locais = await firebase.database().ref('locaisCaso');
        let chave = (await locais.push()).key;

        locais.child(chave).set({
            latitude: lat,
            longitude: long
        })

    }

    async function cadastrarZonaRisco(lat, long){
        let locais = await firebase.database().ref('locaisRisco');
        let chave = (await locais.push()).key;

        const convercao={
            lat: lat,
            lng: long
        }

        let end = await Geocoder.geocodePosition(convercao);
        let endereco = end[0].formattedAddress;
        console.log(end[0].formattedAddress);
        
        locais.child(chave).set({
            latitude: lat,
            longitude: long,
            enderecoFoco: endereco


        })

    }

    async function deleteFoco(key){
        await firebase.database().ref('locaisFoco').child(key).remove();
    }

    async function deleteCaso(key){
        await firebase.database().ref('locaisCaso').child(key).remove();
    }

    async function deleteRisco(key){
        await firebase.database().ref('locaisRisco').child(key).remove();
    }



    //CHAMA AS FUNÇOES DE CADASTRO COM AS LOCALIZAÇÕES ATUALIZADAS COMO PARAMETROS
    function teste(){
        cadastrarFoco(region.latitude, region.longitude);

    }

    function teste2(){
        cadastrarCaso(region.latitude, region.longitude);
    }

    function teste3(){
        cadastrarZonaRisco(region.latitude, region.longitude);
    }
    //--------------------------------------------------------------------------------
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
                            <Marker  key={marker.key} coordinate={marker.coords} onPress={() => deleteFoco(marker.key)}>
                                <Image source={require('../../assets/icones/mosquitoFoco3.png')} style={styles.icones}/>
                            </Marker>
                        );
                    })

                }

                {
                    markersCaso.map((marker) => {
                        return(
                            <Marker key={marker.key} coordinate={marker.coords} onPress={() => deleteCaso(marker.key)}>
                                <Image source={require('../../assets/icones/infectado3.png')} style={styles.icones}/>
                            </Marker>
                        );
                    })
                }

                {
                    markersRisco.map((marker) => {
                        return(
                            <Marker key={marker.key} coordinate={marker.coords} onPress={() => deleteRisco(marker.key)}>
                                <Image source={require('../../assets/icones/areaRisco3.png')} style={styles.icones}/>
                            </Marker>
                        );
                    })
                }

            </MapView>

            <View style={styles.areaInteracaoMapa}>
                <TouchableOpacity style={styles.btnCadastraFoco} onPress={teste}>
                    <Image
                        source={require('../../assets/icones/mosquitoFoco3.png')}
                        style={styles.icones}
                        
                    />
                    <Text style={styles.textoIcone}>Foco</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnCadastraFoco} onPress={teste2}>
                    <Image
                        source={require('../../assets/icones/infectado3.png')}
                        style={styles.icones}
                    />
                    <Text style={styles.textoIcone}>Caso</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnCadastraFoco} onPress={teste3}>
                    <Image
                        source={require('../../assets/icones/areaRisco3.png')}
                        style={styles.icones}
                    />
                    <Text style={styles.textoIcone}>Alerta</Text>
                </TouchableOpacity>


            </View>
      
        </View>
    );
};

const styles = StyleSheet.create({
    mapa:{
        width: '100%',
        height: 450
        //height: 350 dispositivo fisico
    },
    areaInteracaoMapa:{
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#a978a5',
        paddingTop: 8,
    },
    icones:{
        width: 40,
        height: 40
    },
    btnCadastraFoco:{
        
    },
    textoIcone:{
        alignItems: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },


})

