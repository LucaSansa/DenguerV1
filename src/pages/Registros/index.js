import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';



import firebase from '../../services/firebaseConnection';
import Enderecos from './Enderecos';


export default function Registros(){


    const [lista, setLista] = useState([]);
    const [loading, setLoading] = useState(true); // controla o loading
    //var aux = 0;
    const [conta, setConta] = useState(0);

    useEffect(() => {
        
        async function carregaLista(){
            await firebase.database().ref('locaisRisco').on('value', snapshot => {
                setLista([]);

                snapshot.forEach((childItem) =>{
                    let data ={
                        key: childItem.key,
                        latitude: childItem.val().latitude,
                        longitude: childItem.val().longitude,
                        enderecoFoco: childItem.val().enderecoFoco
                        
                    };
                    
                    setLista(oldArray => [...oldArray, data]);
                })


            });

            
        }

        // editando...
        async function contador(){
            await firebase.database().ref('locaisCaso').on('value', snapshot =>{
                let aux = 0;
                snapshot.forEach((childItem) =>{
                    
                    if(childItem.exists()){
                        aux = aux + 1;
                    }
                })
                setConta(aux);
                //alert(parseInt(conta));
            })
        }
        //

        //setLoading(true);
        carregaLista();
        contador();
        setLoading(false);

    }, []);





    return(

        <LinearGradient colors={['#61045f', '#20011f']} style={styles.linear}>


            <Text style={styles.titulo}>CASOS</Text>
            <Text style={styles.nCasos}>{parseInt(conta)}</Text>


            <View style={styles.areaAlertas}>
                <Text style={styles.tituloareaAlertas}>REGIOES DE ALERTA</Text>

                
                {
                    loading ? 
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size="large" color="#61045f"/>
                        </View>
                    :
                        null
                }

                
                <FlatList
                    data={lista}
                    renderItem={({item}) => <Enderecos data={item}/>}
                />
            </View>




        </LinearGradient>

    );
}

const styles = StyleSheet.create({
    linear:{
        flex: 1, 
        //justifyContent: 'center',
        alignItems: 'center'
    },
    titulo:{
        color: '#FFF',
        fontSize: 30,
        marginTop: 15
    },
    nCasos:{
        color: '#FFF',
        fontSize: 25,
        marginBottom: 20
    },
    tituloareaAlertas:{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20,
        fontSize: 25,
        color: '#61045f',
        fontWeight: 'bold'
    },  
    areaAlertas:{
        backgroundColor: '#FFF',
        width: '85%',
        height: 450,
        borderRadius: 8
    } 


})
