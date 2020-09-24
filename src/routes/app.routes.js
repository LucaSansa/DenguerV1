import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home';
import HomeAgente from '../pages/HomeAgente';
import { AuthContext } from '../contexts/auth';

import Registros from '../pages/Registros';
import Comunidade from '../pages/Comunidade';
import CadastroComunidade from '../pages/CadastroComunidade';

const AppStack = createStackNavigator();


function AppRoutes(){

    const {confereTipo, user} = useContext(AuthContext);

    let tipoConta = confereTipo();

    let nomeUsuario = `${user.nome}`;

    let nomeAgente = 'AGENTE ENDEMICO: ' + `${user.nome}`;

    return(
        <AppStack.Navigator>

            {
                tipoConta ? //if(tipoConta === true)
                    <AppStack.Screen name={nomeUsuario} component={Home}
                        options={{
                            headerStyle:{
                                backgroundColor: '#61045f',
                                borderBottomColor: 1
                            },
                            headerTintColor: '#FFF',
                        }}
                    /> 
                    : //if(tipoConta !== true)
                    <AppStack.Screen name={nomeAgente} component={HomeAgente}
                        options={{
                            headerStyle:{
                                backgroundColor: '#61045f',
                                borderBottomWidth: 1,
                                
                            },
                            headerTintColor: '#FFF'
                            
                            
                        }}
                     />
            }

            <AppStack.Screen name="Registros"component={Registros}
                options={{
                    headerStyle:{
                        backgroundColor: '#a978a5',
                        borderBottomWidth: 1,
                        borderBottomColor: '#131313'
                    },
                    headerTintColor: '#FFF'
                }}
            />

            <AppStack.Screen name="Comunidade"component={Comunidade}
                options={{
                    headerStyle:{
                        backgroundColor: '#a978a5',
                        borderBottomColor: 1, 
                        borderBottomColor: '#131313'
                    },
                    headerTintColor: '#FFF'
                }}
            />

            <AppStack.Screen name="CadastroComunidade" component={CadastroComunidade}
                options={{headerShown: false}}              
            />

        </AppStack.Navigator>
    );
}

export default AppRoutes;