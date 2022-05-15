import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export default function Button2({ title, onPress }) {
    return (
        < TouchableOpacity onPress={onPress} style={styles.button} >
            <View >
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 10,
        backgroundColor: 'red',
        alignItems: 'center',
        width: '50%',
        left: '23%',
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 10,
        minWidth: "40%",
        textAlign: "center",
    },
    text: {
        color: '#EAF3FD',
        fontSize: 18
    }
})