import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, viewheet } from "react-native";
import { view } from "./styling";

export default function ViewTeamData({ teamData }) {
    const navigation = useNavigation();


    function renderMember(item) {
        const key = item[0];
        const data = item[1];
        return (<TouchableOpacity
            key={key}
            onPress={() => { navigation.push('View Member', { email: key }); }}>
            <View style={view.containter2}>
                <View style={view.box7}>
                    <Image style={styles.image} source={{ uri: data.profilePic }} />
                    <View style={styles.boxContent}>
                        <Text style={styles.title}>{data.name}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>)
    }

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

    return (

        <View style={view.screen}>
            <Text style={view.name}>{teamData.name}</Text>
            <Text style={view.textContent3}>{teamData.description}</Text>

            <View style={view.containter}>
                <View style={view.box3}>
                    <Text style={view.textContent3}>Team Members {"\n"}</Text>
                    {teamData.members.map((item) => { return renderMember(item); })}
                </View>
            </View>

            <View style={view.containter}>
                <View style={view.box3}>
                    <Text style={view.textContent3}>Tasks {"\n"}</Text>
                    {teamData.tasks.length > 0 ?
                        teamData.tasks.map((item) => { return renderTask(item); })
                        : <Text style={view.textContent3}>No Tasks Assigned</Text>}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 25,
        height: 25,
        borderRadius: 16,
        borderColor: '#006EE9',
        borderWidth: 1,
    },
    box: {
        width: '90%',
        marginLeft: '5%',
        padding: 6,
        marginBottom: 12,
        backgroundColor: 'white',
        flexDirection: 'row',
        borderRadius: 16,
        borderColor: '#9E9E9E',
        borderWidth: 1,
        elevation: 5
    },
    shadowProp: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    boxContent: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    title: {
        fontSize: 18,
        color: "#006EE9"
    },
    textInputstyling: {
        borderWidth: 1,
        margin: 16,
        width: '90%',
        marginLeft: '5%',
        fontSize: 18,
        paddingLeft: 8,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: '#9F9F9F',
        height: 45,
        color: '#006EE9'
    },
    containter: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',

    },
    containter2: {
        width: '120%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: 'white',
        // marginLeft:'-5%',
        marginBottom: 10,
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
    },
});