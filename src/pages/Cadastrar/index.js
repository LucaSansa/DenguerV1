import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../../contexts/auth';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';

export default function Cadastrar(){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');



    const { cadastrar } = useContext(AuthContext);

    function lidarCadastro(){
      if(password !== '' && password2 !== '' && password === password2){
        cadastrar(email, password, nome);
      }else{
        alert('Confirme a senha!');
      }
    }



    return(
        <LinearGradient colors={['#61045f', '#20011f']} style={styles.linear}>
        
        <Image
          source={require('../../assets/imagens/mosquitoLogo.png')}
          style={styles.imgLogo}
        />

        <View style={styles.areaInput}>
          <Icon name="person" color="#FFF" size={30} style={{marginRight: -30}}/>

          <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#FFF"
          underlineColorAndroid="transparent"
          onChangeText={(texto) => setNome(texto)}
          value={nome}
        />
        </View>

        <View style={styles.areaInput}>
          <Icon2 name="email-outline" color="#FFF" size={30} style={{marginRight: -30}}/>

          <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#FFF"
          onChangeText={(texto) => setEmail(texto)}
          value={email}
        />
        </View>

        <View style={styles.areaInput}> 
          <Icon3 name="lock" color="#FFF" size={30} style={{marginRight: -30}}/>

          <TextInput
          style={styles.input}
          placeholder="Defina uma senha"
          placeholderTextColor="#FFF"
          secureTextEntry
          underlineColorAndroid="transparent"
          onChangeText={(texto) => setPassword(texto)}
          value={password}
        />

        </View>

        <View style={styles.areaInput}> 
          <Icon3 name="lock" color="#FFF" size={30} style={{marginRight: -30}}/>

          <TextInput
          style={styles.input}
          placeholder="Repita a senha"
          placeholderTextColor="#FFF"
          secureTextEntry
          underlineColorAndroid="transparent"
          onChangeText={(texto) => setPassword2(texto)}
          value={password2}
        />

        </View>


        <TouchableOpacity style={styles.btnCadastrar} onPress={lidarCadastro}>
          <Text style={styles.textobtnCadastrar}>Cadastrar</Text>
        </TouchableOpacity>
  
      </LinearGradient>
    );
}

const styles = StyleSheet.create({
  linear:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',       

  },
  imgLogo:{
      width: 100,
      height: 100,
      //marginBottom: 13  
      marginTop: -90,
      marginBottom: 30
  },
  areaInput:{
    flexDirection: 'row'
  },
  input:{
    
      height: 45, 
      width: 250,
      borderBottomWidth: 1, 
      borderColor: '#FFF',
      marginBottom: 30,
      textAlign: 'center',
      fontSize: 20,
      color: '#FFF'
  },
  btnCadastrar:{
      marginTop: 20,
      width: 145,
      borderWidth: 1,
      borderColor: '#FFF',   
      borderRadius: 23,
      marginBottom: 20
  },
  textobtnCadastrar:{
      textAlign: 'center',
      fontSize: 25,
      padding: 6,
      color: '#FFF'

  },
});