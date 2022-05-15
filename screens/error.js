import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";

export default function Error({ route }) {
    const { errorMessage } = route.params;
    const [message, setMessage] = React.useState(errorMessage || "Oops! Something went wrong");
    return (
        <View style={styles.container}>
            <Image source={require('../assets/error.png')}></Image>
            <Text>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center'
    }
})