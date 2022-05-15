import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, ScrollView, Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { view } from "./styling";


export default function ViewTaskData({ taskData }) {
    function teamKeyExtractor(item) {
        return item.key;
    }

    function renderTeam(item) {
        const key = item.key;
        return (<TouchableOpacity
            onPress={() => { navigation.push('View Team', { key: key }); }}>
            <View style={view.containter2}>
                <View style={view.box7}>
                    <View style={styles.boxContent}>
                        <Text style={styles.title}>{item.name}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>)
    }


    function memberKeyExtractor(item) {
        return item.email;
    }

    function renderMember(item) {
        const key = item.email;

        return (<TouchableOpacity
            onPress={() => { navigation.push('View Member', { email: key }); }}>
            <View style={view.containter2}>
                <View style={view.box7}>
                    <Image style={styles.image} source={{ uri: item.profilePic }} />
                    <View style={styles.boxContent}>
                        <Text style={styles.title}>{item.name}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity >)
    }


    const navigation = useNavigation();
    return (
        <View style={view.screen}>
            <Text style={view.name}>{taskData.name}</Text>

            <View style={view.containter2}>
                <View style={view.box7}>
                    <View style={view.boxtop}>
                        <Text style={view.textContent1}>Description</Text>
                    </View>
                    <View style={view.box6}>
                        <Text style={view.textContent2}>{taskData.description}</Text>
                    </View>
                </View>
                <View style={view.box7}>
                    <View style={view.boxmid}>
                        <Text style={view.textContent1}>Deadline</Text>
                    </View>
                    <View style={view.box6}>
                        <Text style={view.textContent2}>{taskData.deadline.toDate().toString()}</Text>
                    </View>
                </View>
                <View style={view.box7}>
                    <View style={view.boxend}>
                        <Text style={view.textContent1}>Task Status</Text>
                    </View>
                    <View style={view.box6}>
                        <Text style={view.textContent2}>{taskData.completed ? "Completed" : "Pending"}</Text>
                    </View>
                </View>
            </View>
            <Text style={view.textContent3}>Assigned Teams:</Text>
            {taskData.teams.length > 0 ?
                taskData.teams.map((team) => {
                    return (<View key={teamKeyExtractor(team)}>{renderTeam(team)}</View>)
                }) : <Text style={view.textContent3}>No teams assigned</Text>
            }
            <Text style={view.textContent3}>Assigned Members:</Text>
            {taskData.members.length > 0 ?
                taskData.members.map((member) => {
                    return (<View key={memberKeyExtractor(member)}>{renderMember(member)}</View>)
                }) : <Text style={view.textContent3}>No members assigned</Text>
            }
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