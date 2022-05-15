import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyProfile from "../screens/myProfile";
import UpdateProfile from "../screens/updateProfile";
import ViewMember from "../screens/members/viewMember";
import ViewTeam from "../screens/teams/viewTeam";
import UpdateTeam from "../screens/teams/updateTeam";
import ViewTask from "../screens/tasks/viewTask";
import UpdateTask from "../screens/tasks/updateTask";


const Stack = createNativeStackNavigator();

export default function ProfileNavigator() {
    return (
        <Stack.Navigator initialRouteName="My Profile" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="My Profile" component={MyProfile} />
            <Stack.Screen name="Update Profile" component={UpdateProfile} />
            <Stack.Screen name="View Member" component={ViewMember} />
            <Stack.Screen name="View Team" component={ViewTeam} />
            <Stack.Screen name="Update Team" component={UpdateTeam} />
            <Stack.Screen name="View Task" component={ViewTask} />
            <Stack.Screen name="Update Task" component={UpdateTask} />
        </Stack.Navigator >
    )
}