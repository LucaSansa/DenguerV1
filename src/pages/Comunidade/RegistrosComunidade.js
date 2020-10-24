import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from '../../services/firebaseConnection';
import { AuthContext } from '../../contexts/auth';


import Line from './Line';
//import LongText from './LongText____';
import LongText from './LongText';

export default function RegistrosComunidade(props){

    const {confereTipo, user} = useContext(AuthContext);

    let tipoConta = confereTipo();


    async function checar(key){
        await firebase.database().ref('comunidade').child(key).update({
            localizacao: props.data.localizacao,
            observacao: props.data.observacao,
            referencia: props.data.referencia,
            status: "CHECADO"
        });
    }

    async function deletar(key){
        await firebase.database().ref('comunidade').child(key).remove();
    }


    return(
        
        

        <View style={[props.data.status === "CHECADO" ? styles.conteinerChecado : styles.container]}>

            {
                tipoConta ? 
            
                    null

                :

                <View style={styles.areaBtn}>

                    <TouchableOpacity style={styles.btnChecar} onPress={() => checar(props.data.key)}>
                        <Text style={{fontWeight: 'bold'}}>CHECAR</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnDeletar} onPress={() => deletar(props.data.key)}>
                        <Text style={{fontWeight: 'bold'}}>DELETAR</Text>
                    </TouchableOpacity>

                </View>                

            }

            <Line label="Status: " conteudo={props.data.status}/>
            <Line label="Endereço: " conteudo={props.data.localizacao}/>
            <Line label="Referencia: " conteudo={props.data.referencia}/>
            <LongText label="Comentario: " conteudo={props.data.observacao}/>
        </View>


    );
}

const styles = StyleSheet.create({
    container:{

        paddingBottom: 10,
        backgroundColor: '#D3D3D3',
        marginBottom: 15
        
    },
    conteinerChecado:{
        paddingBottom: 10,
        backgroundColor: '#90EE90',
        marginBottom: 15
    },

    areaBtn:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 20
    },

    btnChecar:{
        width: 100,
        borderWidth: 2,
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#008000'
    },

    btnDeletar:{
        width: 100,
        borderWidth: 2,
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#FF0000'
    }

})



