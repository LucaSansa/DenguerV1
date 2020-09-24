import React, { useContext } from 'react';
import { View } from 'react-native';


import RenderMapAgent from '../../util/RenderMapAgent.js';
import Hud from '../../util/Hud';



export default function HomeAgente(){

    return(
        <View>
            
            <RenderMapAgent/>
            <Hud/>

        </View>
    );
}

