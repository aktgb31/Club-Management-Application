import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewMember from "../screens/members/viewMember";
import ViewTeam from "../screens/teams/viewTeam";
import UpdateTeam from "../screens/teams/updateTeam";
import ViewTask from "../screens/tasks/viewTask";
import UpdateTask from "../screens/tasks/updateTask";
import Home from "../screens/home";


const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator initialRouteName="HomePage" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomePage" component={Home} />
            <Stack.Screen name="View Member" component={ViewMember} />
            <Stack.Screen name="View Team" component={ViewTeam} />
            <Stack.Screen name="Update Team" component={UpdateTeam} />
            <Stack.Screen name="View Task" component={ViewTask} />
            <Stack.Screen name="Update Task" component={UpdateTask} />
        </Stack.Navigator>
    )
}