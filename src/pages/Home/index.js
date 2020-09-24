import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../../contexts/auth';


import RenderMap from '../../util/RenderMap';
import Hud from '../../util/Hud';

export default function Home(){
    const {user, sair} = useContext(AuthContext);

    
    

    return(
        <View>


            <RenderMap/>
            <Hud/>

            
        </View>
    );
}

