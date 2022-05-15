import React from "react";
import { View, ScrollView, TouchableOpacity, Text, TextInput, StyleSheet, Image, Switch } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Button from "../../components/button";
import Loading from "../loading";
import { getAllUsersShortInfo } from "../../firebase/members";
import CreateAlert from "../../components/alert";
import tasks from "../../cache/tasks";
import { getAllTeamsShortInfo } from "../../firebase/teams";
import DateTimePicker from "../../components/dateTimePicker";
import SuccessMessage from "../../components/successMessage";



export default function UpdateTask({ route, navigation }) {
    const { key } = route.params;
    const [task, setTask] = React.useState(null);
    const [members, setMembers] = React.useState([]);
    const [teams, setTeams] = React.useState([]);
    const isScreenActive = React.useRef(true);
    const [submitClicked, setSubmitClicked] = React.useState(false);
    const [assignedMembers, setAssignedMembers] = React.useState({});
    const [assignedTeams, setAssignedTeams] = React.useState({});

    const [loading, setLoading] = React.useState(true);
    const [dateTime, setDateTime] = React.useState(new Date(Date.now()));

    function changeName(text) {
        setTask({ ...task, name: text });
    }

    function changeDescription(text) {
        setTask({ ...task, description: text });
    }

    function toogleCompleted() {
        setTask({ ...task, completed: !task.completed });
    }

    function teamKeyExtractor(item, index) {
        return item.key;
    }

    function renderTeam({ item }) {
        const key = teamKeyExtractor(item);
        return (<TouchableOpacity
            key={key}
            disabled={submitClicked}
            onPress={() => {
                if (assignedTeams.hasOwnProperty(key)) {
                    const { [key]: removedValue, ...rest } = assignedTeams;
                    setAssignedTeams(rest);
                }
                else
                    setAssignedTeams({ ...assignedTeams, [key]: item });
            }}>
            <View style={assignedTeams.hasOwnProperty(key) ? styles.selectedBox : styles.box}>
                <View style={styles.boxContent}>
                    <Text style={styles.title}>{item.name}</Text>
                </View>
            </View>
        </TouchableOpacity>)
    }


    function memberKeyExtractor(item, index) {
        return item.email;
    }

    function renderMember({ item }) {
        const key = memberKeyExtractor(item);
        if (item.profilePic) {
            return (<TouchableOpacity
                key={key}
                disabled={submitClicked}
                onPress={() => {
                    if (assignedMembers.hasOwnProperty(key)) {
                        const { [key]: removedValue, ...rest } = assignedMembers;
                        setAssignedMembers(rest);
                    }
                    else
                        setAssignedMembers({ ...assignedMembers, [key]: item });
                }}>
                <View style={assignedMembers.hasOwnProperty(key) ? styles.selectedBox : styles.box}>
                    <Image style={styles.image} source={{ uri: item.profilePic }} />
                    <View style={styles.boxContent}>
                        <Text style={styles.title}>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>)
        }
    }

    function submit() {
        setSubmitClicked(true);
        setLoading(true);
        const taskData = { ...task, members: assignedMembers, teams: assignedTeams, deadline: dateTime };
        tasks.updateTask(key, taskData).then(() => {
            setSubmitClicked(false);
            setLoading(false);
            SuccessMessage("Task Updated");
            navigation.goBack();
        }).catch((err) => {
            setSubmitClicked(false);
            setLoading(false);
            console.log(err.message);
            CreateAlert("Error", err.message);
        })
    }

    useFocusEffect(
        React.useCallback(() => {
            isScreenActive.current = true;
            setDateTime(new Date(Date.now()));
            Promise.all([tasks.getTask(key), getAllTeamsShortInfo(), getAllUsersShortInfo()]).then(([taskData, teams, members]) => {

                if (isScreenActive.current) {
                    setTask({ name: taskData.name, deadline: taskData.deadline, description: taskData.description, completed: taskData.completed });
                    setMembers(members);
                    setTeams(teams);
                    setDateTime(taskData.deadline.toDate());
                    setAssignedMembers(taskData.members);
                    setAssignedTeams(taskData.teams);
                }
                setLoading(false);
            }
            ).catch((err) => {
                console.log(err.message);
            });
            return () => {
                setLoading(true);
                setSubmitClicked(false);
                setAssignedMembers({});
                setAssignedTeams({});
                setTask({});
                setMembers([]);
                isScreenActive.current = false;
            };
        }, []));

    if (loading)
        return <Loading />

    else
        return (
            <ScrollView style={{ backgroundColor: 'white', height: '100%' }}>
                <TextInput style={styles.textInputstyling} placeholder="Enter Task name" editable={!submitClicked} defaultValue={task.name} onChangeText={changeName} />

                <TextInput style={styles.textInputstyling} placeholder="Enter Task description" editable={!submitClicked} defaultValue={task.description} onChangeText={changeDescription} />

                <TextInput
                    style={styles.textInputstyling}
                    defaultValue={dateTime.toString()}
                    editable={false}>
                </TextInput>

                <DateTimePicker dateTime={dateTime} setDateTime={setDateTime} />

                <Text style={{ textAlign: 'center', margin: 5, fontSize: 22, color: 'black' }}>Teams</Text>

                {
                    teams.length > 0 ?
                        teams.map((item) => { return renderTeam({ item }) }) :
                        <Text style={{ textAlign: 'center', margin: 5, fontSize: 16, color: 'black' }}>No teams created</Text>
                }
                <Text style={{ textAlign: 'center', margin: 5, fontSize: 22, color: 'black' }}>Members</Text>
                {
                    members.length > 0 ?
                        members.map((item) => { return renderMember({ item }) }) :
                        <Text style={{ textAlign: 'center', margin: 5, fontSize: 16, color: 'black' }}>No members created</Text>
                }

                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly" }}>
                    <Text style={{ fontSize: 20, color: 'black' }}>Completed</Text><Switch disabled={submitClicked} onValueChange={toogleCompleted} value={task.completed} /></View>
                <View><Button disabled={submitClicked} title={"Update Task"} onPress={submit} /></View>
            </ScrollView>
        )
}

const styles = StyleSheet.create({
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
        elevation: 5,
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
        fontSize: 16,
        color: "#006EE9"
    },
    textInputstyling: {
        borderWidth: 1,
        margin: 8,
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
    description: {
        fontSize: 15,
        color: "#9A9A9A",
    },
    selectedBox: {
        width: '90%',
        marginLeft: '5%',
        padding: 6,
        marginBottom: 12,
        backgroundColor: '#EAF3FD',
        flexDirection: 'row',
        borderRadius: 16,
        borderColor: '#006EE9',
        borderWidth: 1,
        elevation: 5
    }
});