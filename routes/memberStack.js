import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllMembers from "../screens/members/allMembers";
import AddMember from "../screens/members/addMember";
import ViewMember from "../screens/members/viewMember";
import ViewTeam from "../screens/teams/viewTeam";
import UpdateTeam from "../screens/teams/updateTeam";
import ViewTask from "../screens/tasks/viewTask";
import UpdateTask from "../screens/tasks/updateTask";


const Stack = createNativeStackNavigator();

export default function MemberNavigator() {
    return (
        <Stack.Navigator initialRouteName="All Members" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="All Members" component={AllMembers} />
            <Stack.Screen name="Add Member" component={AddMember} />
            <Stack.Screen name="View Member" component={ViewMember} />
            <Stack.Screen name="View Team" component={ViewTeam} />
            <Stack.Screen name="Update Team" component={UpdateTeam} />
            <Stack.Screen name="View Task" component={ViewTask} />
            <Stack.Screen name="Update Task" component={UpdateTask} />
        </Stack.Navigator>
    )
}