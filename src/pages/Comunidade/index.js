import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import firebase from '../../services/firebaseConnection';


import { useNavigation } from '@react-navigation/native';

import RegistrosComunidade from './RegistrosComunidade';


export default function Comunidade(){

    const navigation = useNavigation();

    const [lista, setLista] = useState([]);


    useEffect(() => {
        
        async function carregaLista1(){
            await firebase.database().ref('comunidade').on('value', snapshot => {
                setLista([]);

                snapshot.forEach((childItem) =>{
                    let data ={
                        key: childItem.key,
                        localizacao: childItem.val().localizacao,
                        observacao: childItem.val().observacao,
                        referencia: childItem.val().referencia,
                        status: childItem.val().status
                    };

                    setLista(oldArray => [...oldArray, data]);
                })


            });
            
        }
        //setLoading(true);
        carregaLista1();


    }, []);


    return(

        <LinearGradient colors={['#61045f', '#20011f']} style={styles.linear}>


            <View style={styles.areaInputComunidade}>
                
                <FlatList
                    data={lista}
                    renderItem={({item}) => <RegistrosComunidade data={item}/>}
                />

            </View>

            <TouchableOpacity style={styles.btnAdicionar} onPress={() => navigation.navigate('CadastroComunidade')}>
                <Icon name="add-circle-sharp" color="#FFF" size={40}/>
            </TouchableOpacity>
            <Text style={styles.textoAdicionar}>Adicionar Localidade</Text>

        </LinearGradient>


    );
}

const styles = StyleSheet.create({
    linear:{
        flex: 1,
        alignItems: 'center'
    },
    btnAdicionar:{
        marginTop: 15,
        
    },
    areaInputComunidade:{
        width: '85%',
        // height: 470,
        height: '80%',
        borderRadius: 8,
        marginTop: 20,

    },
    textoAdicionar:{
        color: '#FFF'
    }
})