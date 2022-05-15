import React from "react";
import { View, Text, Image } from "react-native";
import { view } from "./styling";

export default function ViewEventData({ event }) {
    return (
        <View style={view.screen}>
            <Text style={view.name}>{event.name}</Text>
            <Text style={view.email}>{event.venue}</Text>

            <View style={view.containter2}>
                <View style={view.box7}>
                    <View style={view.boxtop}>
                        <Text style={view.textContent1}>Venue</Text>
                    </View>
                    <View style={view.box6}>
                        <Text style={view.textContent2}>{event.venue}</Text>
                    </View>
                </View>
                <View style={view.box7}>
                    <View style={view.boxmid}>
                        <Text style={view.textContent1}>DateTime</Text>
                    </View>
                    <View style={view.box6}>
                        <Text style={view.textContent2}>{event.datetime.toDate().toString()}</Text>
                    </View>
                </View>
                <View style={view.box7}>
                    <View style={view.boxend}>
                        <Text style={view.textContent1}>Description</Text>
                    </View>
                    <View style={view.box6}>
                        <Text style={view.textContent2}>{event.description}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

