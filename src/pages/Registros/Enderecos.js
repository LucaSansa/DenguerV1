import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { AuthContext } from '../../contexts/auth';


export default function Enderecos(props){

    const {confereTipo, user} = useContext(AuthContext);

    let tipoConta = confereTipo();

    return(
        
        <View style={styles.container}>
            
                <Text style={styles.endereco}>{props.data.enderecoFoco}</Text>    

            {
                
                tipoConta ?

                    null
                :
                
                    <Button
                    title="Excluir"
                    onPress={() => alert(props.data.key)}
                    />
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
    }
})