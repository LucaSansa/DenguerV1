import React, { useState, createContext, useEffect} from 'react';
import firebase from '../services/firebaseConnection';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext({});

function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function carregaUsuarioAtual(){
            const usuarioStorage = await AsyncStorage.getItem('Usuario_Atual');

            if(usuarioStorage){
                setUser(JSON.parse(usuarioStorage));
                setLoading(false);
            }
            setLoading(false)
        }
        
        carregaUsuarioAtual();
    }, []);

    //função para logar usuario
    async function logar(email, password){
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;
            await firebase.database().ref('usuarios').child(uid).once('value')
            .then((snapshot) =>{
                let data = {
                    uid: uid,
                    nome: snapshot.val().nome,
                    email: snapshot.val().email,
                    tipo: snapshot.val().tipo
                };

                setUser(data);
                setaUsuarioAtual(data);
                confereTipo();
            })
        })
        .catch((error) => {
            alert('Credenciais invalidas');
        });
    }

    //função para cadastrar usuario
    async function cadastrar(email, password, nome){
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((value) =>{   
            let uid = value.user.uid;
            firebase.database().ref('usuarios').child(uid).set({
                nome: nome,
                email: email,
                tipo: ''
            })
            .then(() =>{
                let data = {
                    uid: uid,
                    nome: nome,
                    email: email,
                };
                setUser(data);
                setaUsuarioAtual(data);
            })
        })
        .catch((error) =>{
            alert(error.code);
        })
    }

    function confereTipo(){ // ira conferir se o usuario é um agente endemico ou um usuario comum
        if(user && user.tipo === 'agente'){
            return false;
        }else{
            return true;
        }
    }

    async function setaUsuarioAtual(data){
        await AsyncStorage.setItem('Usuario_Atual', JSON.stringify(data));
    }

    async function sair(){
        await firebase.auth().signOut();
        await AsyncStorage.clear()
        .then(() => {
            setUser(null);
        })
    }

    return(
        <AuthContext.Provider value={{signed: !!user, user, cadastrar, logar, sair, confereTipo, loading}}>
            {children}
        </AuthContext.Provider>
    );

}

export default AuthProvider;