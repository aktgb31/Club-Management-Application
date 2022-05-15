import React from "react";
import { ToastAndroid } from "react-native";

export default function SuccessMessage(message) {
    ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
}