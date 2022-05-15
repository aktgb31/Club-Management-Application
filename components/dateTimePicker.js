import React from "react";
import DatePicker from "react-native-date-picker";
import { View } from "react-native";

export default function DateTimePicker({ dateTime, setDateTime }) {
    return (
        <View style={{ alignItems: "center", margin: 10 }}>
            <DatePicker date={dateTime} onDateChange={setDateTime} mode={"datetime"} minimumDate={new Date()} />
        </View>
    )

}