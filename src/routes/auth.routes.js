import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

//importação das paginas
import Logar from '../pages/Logar';
import Cadastrar from '../pages/Cadastrar';

const AuthStack = createStackNavigator();

function AuthRoutes(){
    return(
        <AuthStack.Navigator>

            <AuthStack.Screen
                name="Logar"
                component={Logar}
                options={{headerShown: false}}
            /> 

            <AuthStack.Screen
                name="Cadastrar"
                component={Cadastrar}
                options={{headerShown: false}}
            />

        </AuthStack.Navigator>
    );
}

export default AuthRoutes;