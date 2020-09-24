import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { AuthContext } from '../../contexts/auth';


export default function RegistrosComunidade(props){

    const {confereTipo, user} = useContext(AuthContext);

    let tipoConta = confereTipo();


    return(
        
        <View style={styles.container}>
            <Text style={styles.textoObs}>Comentario: {props.data.observacao}</Text> 
            <Text style={styles.textoLocalizacao}>Rua: {props.data.localizacao}</Text>
            <Text style={styles.textoReferencia}>Ponto Referencia: {props.data.referencia}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        //justifyContent: 'center',
        textAlign: 'center',
        //marginBottom: 15,
        borderBottomWidth: 1,
        //marginLeft: 10,
        borderBottomColor: '#131313',
        marginBottom: 10,
        marginTop: 10
    },
    textoObs:{
        fontSize: 20,
        paddingBottom: 5,
        marginLeft: 10
    },
    textoLocalizacao:{
        fontSize: 20,
        paddingBottom: 5,
        marginLeft: 10
    },
    textoReferencia:{
        fontSize: 20,
        paddingBottom: 5,
        marginLeft: 10
    }
    
})