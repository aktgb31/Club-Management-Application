import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllEvents from "../screens/events/allEvents";
import CreateEvent from "../screens/events/createEvent";
import UpdateEvent from "../screens/events/updateEvent";
import ViewEvent from "../screens/events/viewEvent";

const Stack = createNativeStackNavigator();

export default function EventNavigator() {
    return (
        <Stack.Navigator initialRouteName="All Events" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="All Events" component={AllEvents} />
            <Stack.Screen name="Create Event" component={CreateEvent} />
            <Stack.Screen name="Update Event" component={UpdateEvent} />
            <Stack.Screen name="View Event" component={ViewEvent} />
        </Stack.Navigator>
    )
}