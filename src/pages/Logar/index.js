import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';

import {Text, TextInput, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

export default function Logar(){

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { logar } = useContext(AuthContext); // <- em auth.js

    function lidarLogin(){
        logar(email, password)
    }

    return(
      <LinearGradient colors={['#61045f', '#20011f']} style={styles.linear}>
        
        <Image
          source={require('../../assets/imagens/mosquitoLogo.png')}
          style={styles.imgLogo}
        />
        
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Email"
          placeholderTextColor={'#FFF'}
          onChangeText={(texto) => setEmail(texto)}
          value={email}
        />
  
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Senha"
          placeholderTextColor={'#FFF'}
          secureTextEntry
          onChangeText={(texto) => setPassword(texto)}
          value={password}
        />
  
        <TouchableOpacity style={styles.btnLogar} onPress={lidarLogin}>
          <Text style={styles.textLogar}>Logar</Text>
        </TouchableOpacity>

        <TouchableWithoutFeedback onPress={() => navigation.navigate('Cadastrar')}>
            <Text style={styles.textoCadastrar}>cadastrar</Text>
        </TouchableWithoutFeedback>
       
      </LinearGradient>

    );

}

const styles = StyleSheet.create({                      
  linear:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'

  },
  imgLogo:{
      width: 100,
      height: 100,
      marginBottom: 13
      
  },
  input:{
      height: 45,
      width: 350,
      borderBottomWidth: 1, 
      borderColor: '#FFF',
      marginBottom: 30,
      textAlign: 'center',
      fontSize: 20,
      color: '#FFF'
  },
  btnLogar:{
      marginTop: 20,
      width: 125,
      borderWidth: 1,
      borderColor: '#FFF',   
      borderRadius: 23,
      marginBottom: 15
  },
  textLogar:{
      textAlign: 'center',
      fontSize: 25,
      padding: 6,
      color: '#FFF'
  },
  textoCadastrar:{
      fontSize: 17,
      color: '#4169e1',
  },

});