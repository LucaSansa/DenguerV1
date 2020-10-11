import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';

export default function Enderecos(props){

    const {confereTipo, user} = useContext(AuthContext);

    let tipoConta = confereTipo();

    // async function deletaEnderecoRisco(key){
    //     await firebase.database().ref('locaisRisco').child(key).remove();
    // }

    async function deleteRisco(key){
        await firebase.database().ref('locaisRisco').child(key).remove();
    }



    return(
        
        <View style={styles.container}>
            
                <Text style={styles.endereco}>{props.data.enderecoFoco}</Text>    

            {
                
                tipoConta ?

                    null
                :
                
                    // <Button
                    // title="Excluir"
                    // onPress={() => alert('OK')}
                    // />
                    <View style={styles.areaBtn}>

                        <TouchableOpacity style={styles.btnExcluir} onPress={() => deleteRisco(props.data.key)}>
                            <Text style={styles.txtExcluir}>Excluir</Text>
                        </TouchableOpacity>

                    </View>
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        //justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#131313'
    },
    endereco:{
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10
    },
    areaBtn:{
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 15
    },
    btnExcluir:{
        borderWidth: 1,
        width: 70,
        height: 30,
        borderRadius: 8,
        justifyContent: 'center'
    },
    txtExcluir:{
        textAlign: 'center',
    }
})