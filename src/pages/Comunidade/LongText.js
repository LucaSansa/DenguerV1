import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LongText = ({label, conteudo}) => {
    return(
        <View style={styles.line}>

            <Text style={[styles.conteudoLine, styles.label]}>{label}</Text>
            <Text style={[styles.conteudoLine, styles.conteudo]}>{conteudo}</Text>
            
        </View>
    );
}

const styles = StyleSheet.create({
    line:{
        //flexDirection: 'row',
    },
    conteudoLine:{
        paddingLeft: 5,
        fontSize: 16
    },
    label:{
        fontWeight: 'bold',
        flex: 2
    },
    conteudo:{
        flex: 3
    },
    longLabel:{
        fontSize: 12
    }
})

export default LongText;