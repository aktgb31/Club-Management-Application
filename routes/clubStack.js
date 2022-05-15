import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewClubProfile from "../screens/clubProfile";
import UpdateClubProfile from "../screens/updateClubProfile";


const Stack = createNativeStackNavigator();

export default function ProfileNavigator() {
    return (
        <Stack.Navigator initialRouteName="Club Profile" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Club Profile" component={ViewClubProfile} />
            <Stack.Screen name="Update Club Profile" component={UpdateClubProfile} />
        </Stack.Navigator>
    )
}