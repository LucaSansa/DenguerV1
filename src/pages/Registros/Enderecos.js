import React, { useContext, useRef, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Textinput, Modal} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';

export default function Enderecos(props){

    const {confereTipo, user} = useContext(AuthContext);
    let tipoConta = confereTipo();

    const [modalVisible, setModalVisible] = useState(false);
    const [endUpdate, setEndUpdate] = useState(props.data.enderecoFoco);
    

    async function deleteRisco(key){
        
        await firebase.database().ref('locaisRisco').child(key).remove();
    }

    async function editRisco(key){
        
        await firebase.database().ref('locaisRisco').child(key).update({
            enderecoFoco: endUpdate
        });
        fecharModal();
        
        
    }

    function abrirModal(){
        setModalVisible(true);
        
    }

    function fecharModal(){
        setModalVisible(false);
    }

    return(
        
        <View style={styles.container}>

            <Modal
                visible={modalVisible}
                //transparent={true}
            >
                <View style={styles.centeredView}>

                    <View style={styles.modalView}>

                        <Text style={styles.txtEdit}>Voce está alterando um endereço</Text>
                        <TextInput
                            onChangeText={(texto) => setEndUpdate(texto)}
                            value={endUpdate}
                            style={styles.inputEdit}
                            
                            />

                        <View style={styles.areaBtn}>    
                            <TouchableOpacity style={styles.btnExcluir} onPress={fecharModal}>
                                <Text style={styles.txtExcluir}>Sair</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.btnExcluir, styles.btnEditar]} onPress={() => editRisco(props.data.key)}>
                                <Text style={styles.txtExcluir}>Salvar</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>

            </Modal>


                <Text style={styles.endereco}>{props.data.enderecoFoco}</Text>    


            {
                
                tipoConta ?

                    null
                :
                
                    <View style={styles.areaBtn}>

                        <TouchableOpacity style={styles.btnExcluir} onPress={() => deleteRisco(props.data.key)}>
                            <Text style={styles.txtExcluir}>Excluir</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.btnExcluir, styles.btnEditar]} onPress={abrirModal}>
                            <Text style={styles.txtExcluir}>Editar</Text>
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
        //alignItems: 'center',
        //marginBottom: 15,
        //borderBottomWidth: 1,
        //borderBottomColor: '#131313'
        borderWidth: 1,
        marginLeft: 5, 
        marginRight: 5,
        marginBottom: 15
    },
    endereco:{
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10
    },
    areaBtn:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
        marginBottom: 15
    },
    btnExcluir:{
        borderWidth: 1,
        width: 70,
        height: 30,
        borderRadius: 8,
        justifyContent: 'center',
        backgroundColor: '#FF0000'
    },
    btnEditar:{
        backgroundColor: '#008000'
    },  
    txtExcluir:{
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFF'
    },
    inputEdit:{
        borderWidth: 1
    },
    txtEdit:{
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },





    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      modalView: {       
        backgroundColor: "white",
        padding: 15,
        justifyContent: 'center',        
      },





})