import React from "react";
import { Alert } from "react-native";

export default function CreateAlert(heading, message, onPress) {
    Alert.alert(heading, message, [{ text: 'OK', onPress: onPress }]);
}