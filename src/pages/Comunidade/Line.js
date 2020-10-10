import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Line = ({label, conteudo}) => {
    return(
        <View style={styles.line}>

            <Text style={[styles.conteudoLine, styles.label]}>{label}</Text>
            <Text style={[styles.conteudoLine, styles.conteudo]}>{conteudo}</Text>
            
        </View>
    );
}

const styles = StyleSheet.create({
    line:{
        flexDirection: 'row',
    },
    conteudoLine:{
        paddingLeft: 8,
        fontSize: 18,
    },
    label:{
        fontWeight: 'bold',
        flex: 2,
        fontSize: 18
    },
    conteudo:{
        flex: 4
    },
    longLabel:{
        fontSize: 12
    }
})

export default Line;