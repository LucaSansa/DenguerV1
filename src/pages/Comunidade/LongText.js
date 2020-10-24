import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Button} from 'react-native';



export default function LongText1(props){

    const [isExpanded, setIsExpanded] = useState(false);

    function changeIsExpanded(isExpanded){
        if(isExpanded){
            setIsExpanded(false);
        }
        if(isExpanded == false){
            setIsExpanded(true);
        }
    }


    return(
        <View style={styles.line}>

            <Text style={[styles.conteudoLine, styles.label]}>{props.label}</Text>


            <TouchableWithoutFeedback onPress={() => changeIsExpanded(isExpanded)}>

                <View>
                    <Text style={[
                        styles.conteudoLine, 
                        styles.conteudo,
                        isExpanded ? styles.expanded : styles.collapsed
                        ]}>{props.conteudo}</Text>
                </View>

            </TouchableWithoutFeedback>

            
        </View>
    )
}


const styles = StyleSheet.create({
    line:{
        //flexDirection: 'row',
    },
    conteudoLine:{
        paddingLeft: 8,
        fontSize: 18
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
    },
    collapsed:{
        maxHeight: 20
    },
    expanded:{
        flex: 1
    }
})

