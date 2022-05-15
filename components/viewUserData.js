import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { view } from "./styling";
export default function ViewUserData({ user }) {

    const navigation = useNavigation();

    function renderTask(item) {
        const key = item[0];
        const data = item[1];
        return (<TouchableOpacity
            key={key}
            onPress={() => { navigation.push('View Task', { key: key }); }}>
            <View style={view.containter2}>
                <View style={view.box7}>
                    <View style={view.boxtop}>
                        <Text style={view.textContent1}>Task Name</Text>
                    </View>
                    <View style={view.box6}>
                        <Text style={view.textContent2}>{data.name}</Text>
                    </View>
                </View>
                <View style={view.box7}>
                    <View style={view.boxmid}>
                        <Text style={view.textContent1}>Deadline</Text>
                    </View>
                    <View style={view.box6}>
                        <Text style={view.textContent2}>{data.deadline.toDate().toString()}</Text>
                    </View>
                </View>
                <View style={view.box7}>
                    <View style={view.boxend}>
                        <Text style={view.textContent1}>Task Status</Text>
                    </View>
                    <View style={view.box6}>
                        <Text style={view.textContent2}>{data.completed ? "Completed" : "Pending"}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>)
    }

    function renderTeam(item) {
        const key = item[0];
        const data = item[1];
        return (<TouchableOpacity
            key={key}
            onPress={() => { navigation.push('View Team', { key: key }); }}>
            <View style={view.containter2}>
                <View style={view.box5}>
                    <Text style={view.textContent1}>Team Name</Text>
                </View>
                <View style={view.box6}>
                    <Text style={view.textContent2}>{data.name}</Text>
                </View>
            </View>
        </TouchableOpacity>)
    }


    return (
        <View style={view.screen}>
            <Image style={view.image} source={{ uri: user.profilePic }} />
            <Text style={view.name}>{user.name}</Text>
            <Text style={view.email}>{user.email}</Text>

            <View style={view.containter}>
                <View style={view.box1}>
                    <Text style={view.textContent1}>Role</Text>
                    <Text style={view.textContent1}>Phone</Text>
                    <Text style={view.textContent1}>Branch</Text>
                    <Text style={view.textContent1}>Year</Text>
                </View>
                <View style={view.box2}>
                    <View style={view.inner}>
                        <Text style={view.textContent2}>{user.secretary ? "Secretary" : "Member"}</Text>
                        <Text style={view.textContent2}>{user.phone}</Text>
                        <Text style={view.textContent2}>{user.branch}</Text>
                        <Text style={view.textContent2}>{user.year}</Text>
                    </View>
                </View>
            </View>
            <View style={view.containter}>
                <View style={view.box3}>
                    <Text style={view.textContent3}>Teams Assigned</Text>
                    {
                        user.teams.length > 0 ? user.teams.map(item => { return renderTeam(item); }) : <Text style={view.textContent3}>No Teams Assigned</Text>
                    }
                </View>
            </View>
            <View style={view.containter}>
                <View style={view.box3}>
                    <Text style={view.textContent3}>Tasks Assigned</Text>
                    {
                        user.tasks.length > 0 ? user.tasks.map(item => { return renderTask(item); }) : <Text style={view.textContent3}>No Tasks Assigned</Text>
                    }
                </View>
            </View>

        </View>
    );
};
