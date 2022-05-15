import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllTeams from "../screens/teams/allTeams";
import CreateTeam from "../screens/teams/createTeam";
import ViewTeam from "../screens/teams/viewTeam";
import UpdateTeam from "../screens/teams/updateTeam";
import ViewMember from "../screens/members/viewMember";
import ViewTask from "../screens/tasks/viewTask";
import UpdateTask from "../screens/tasks/updateTask";

const Stack = createNativeStackNavigator();

export default function TeamNavigator() {
    return (
        <Stack.Navigator initialRouteName="All Teams" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="All Teams" component={AllTeams} />
            <Stack.Screen name="Create Team" component={CreateTeam} />
            <Stack.Screen name="View Team" component={ViewTeam} />
            <Stack.Screen name="Update Team" component={UpdateTeam} />
            <Stack.Screen name="View Member" component={ViewMember} />
            <Stack.Screen name="View Task" component={ViewTask} />
            <Stack.Screen name="Update Task" component={UpdateTask} />
        </Stack.Navigator>
    );
}