import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllAlumni from "../screens/alumni/allAlumni";
import CreateAlumni from "../screens/alumni/createAlumni";
import UpdateAlumni from "../screens/alumni/updateAlumni";
import ViewAlumni from "../screens/alumni/viewAlumni";

const Stack = createNativeStackNavigator();

export default function AlumniNavigator() {
    return (
        <Stack.Navigator initialRouteName="All Alumni" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="All Alumni" component={AllAlumni} />
            <Stack.Screen name="Create Alumni" component={CreateAlumni} />
            <Stack.Screen name="Update Alumni" component={UpdateAlumni} />
            <Stack.Screen name="View Alumni" component={ViewAlumni} />
        </Stack.Navigator>
    )
}