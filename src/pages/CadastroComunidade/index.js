import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from '../../services/firebaseConnection';

import { useNavigation } from '@react-navigation/native';

export default function CadastroComunidade(){

    const [observacao, setObservacao] = useState();
    const [localizacao, setLocalizacao] = useState();
    const [referencia, setReferencia] = useState();

    const navigation = useNavigation();


    async function cadastrarObsComunidade(){
        let local = await firebase.database().ref('comunidade');
        let chave = await local.push().key;

        local.child(chave).set({
            observacao: observacao,
            localizacao: localizacao,
            referencia: referencia
        })

        // setObservacao('');
        // setLocalizacao('');
        // setReferencia('');
    }


    function limpaCampos(){
        setObservacao('');
        setLocalizacao('');
        setReferencia('');
    }



    return(

        <View style={styles.container}>

            <Text style={styles.tituloComunidade}>Deixe seu comentario, alerta ou sugestão!</Text>

            <TextInput
                placeholder="Comentario"
                style={styles.input}
                onChangeText={(texto) => setObservacao(texto)}
                value={observacao}
            />
  
            <TextInput
                placeholder="Rua"
                style={styles.input}
                onChangeText={(texto) => setLocalizacao(texto)}
                value={localizacao}
            />

            <TextInput
                style={styles.input}
                placeholder="Ponto de Referencia"
                onChangeText={(texto) => setReferencia(texto)}
                value={referencia}
            />



            <View style={styles.areaBotao}>

                <TouchableOpacity style={styles.btn} onPress={limpaCampos}>
                    <Text style={styles.textoBtn}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={cadastrarObsComunidade}>
                    <Text style={styles.textoBtn}>Salvar</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        //flex: 1,
        marginTop: 30,
        alignItems: 'center',
    },
    input:{
        borderWidth: 1,
        width: 380,
        marginTop: 20,
        fontSize: 18
    },
    areaBotao:{
        flexDirection: 'row',
        marginTop: 40,
        height: 80
        
    },
    btn:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#61045f',
        margin: 20,
        borderRadius: 10,
        backgroundColor: '#61045f'
    },
    textoBtn:{
        fontSize: 18,
        color: '#FFF'
    },
    tituloComunidade:{
        fontSize: 20,
        fontWeight: 'bold'
    }

})