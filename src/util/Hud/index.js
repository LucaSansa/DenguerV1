import React, { useContext } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';



import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../contexts/auth';


import { useNavigation } from '@react-navigation/native';//navegação

export default function Hud(){

    
    const navigation = useNavigation();//para usar navegação

    const {user, sair} = useContext(AuthContext);

    return(
        <LinearGradient colors={['#61045f', '#20011f']} style={styles.linear}>

        <TouchableOpacity style={styles.iconesHud} onPress={() => navigation.navigate('Registros')}>
            <Icon name="profile" color="#FFF" size={40}/>
            <Text style={styles.txtIconesHud}>Resgistros</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.iconesHud} onPress={() => navigation.navigate('Comunidade')}>
            <Icon2 name="ios-people-circle-sharp" color="#FFF" size={40}/>
            <Text style={styles.txtIconesHud}>Comunidade</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconesHud} onPress={() => sair()}>
            <Icon3 name="location-exit" color="#FFF" size={40}/>
            <Text style={styles.txtIconesHud}>Sair</Text>
        </TouchableOpacity>

    </LinearGradient>
    );
}


const styles = StyleSheet.create({
    linear:{

        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around', 
    },
    iconesHud:{
        width: 80,
        height: 80,
        marginTop: 12,
        alignItems: 'center'
    },
    txtIconesHud:{
        color: '#FFF',
        paddingTop: 4,      
    },

})