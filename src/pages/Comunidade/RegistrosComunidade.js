import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { AuthContext } from '../../contexts/auth';


import Line from './Line';
import LongText from './LongText';
import LongText1 from './LongText1';

export default function RegistrosComunidade(props){

    const {confereTipo, user} = useContext(AuthContext);

    let tipoConta = confereTipo();


    return(
        

        <View style={styles.container}>
            <Line label="Endereço: " conteudo={props.data.localizacao}/>
            <Line label="Referencia: " conteudo={props.data.referencia}/>
            <LongText1 label="Comentario: " conteudo={props.data.observacao}/>
        </View>


    );
}

const styles = StyleSheet.create({
    container:{

        paddingBottom: 10,
        backgroundColor: '#D3D3D3',
        marginBottom: 15
        
    }
})



