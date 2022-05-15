import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllTasks from "../screens/tasks/allTasks";
import CreateTask from "../screens/tasks/createTask";
import ViewTask from "../screens/tasks/viewTask";
import UpdateTask from "../screens/tasks/updateTask";
import ViewMember from "../screens/members/viewMember";
import ViewTeam from "../screens/teams/viewTeam";
import UpdateTeam from "../screens/teams/updateTeam";

const Stack = createNativeStackNavigator();

export default function TaskNavigator() {
    return (
        <Stack.Navigator initialRouteName="All Tasks" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="All Tasks" component={AllTasks} />
            <Stack.Screen name="Create Task" component={CreateTask} />
            <Stack.Screen name="View Task" component={ViewTask} />
            <Stack.Screen name="Update Task" component={UpdateTask} />
            <Stack.Screen name="View Member" component={ViewMember} />
            <Stack.Screen name="View Team" component={ViewTeam} />
            <Stack.Screen name="Update Team" component={UpdateTeam} />
        </Stack.Navigator>
    );
}