import React from "react";
import { ScrollView, View, FlatList, TouchableOpacity, Text, TextInput, StyleSheet, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Button from "../../components/button";
import Loading from "../loading";
import { getAllTeamsShortInfo } from "../../firebase/teams";
import { getAllUsersShortInfo } from "../../firebase/members";
import CreateAlert from "../../components/alert";
import tasks from "../../cache/tasks";
import { taskTemplate } from "../../firebase/tasks";
import SuccessMessage from "../../components/successMessage";
import DateTimePicker from "../../components/dateTimePicker";

export default function CreateTask({ navigation }) {
    const [task, setTask] = React.useState({ ...taskTemplate });
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

    function teamKeyExtractor(item) {
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


    function memberKeyExtractor(item) {
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
        tasks.createTask(taskData).then(() => {
            setSubmitClicked(false);
            setTask({ ...taskTemplate });
            setAssignedMembers({});
            setAssignedTeams({});
            setLoading(false);
            SuccessMessage("Task Created");
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
            Promise.all([getAllTeamsShortInfo(), getAllUsersShortInfo()]).then(([teams, members]) => {
                if (isScreenActive.current) {
                    setTeams(teams);
                    setMembers(members);
                    setAssignedMembers({});
                    setAssignedTeams({});
                }
                setLoading(false);
            }
            ).catch((err) => {
                console.log(err.message);
            });
            return () => {
                setLoading(true);
                setSubmitClicked(false);
                setTask({ ...taskTemplate });
                setMembers([]);
                setAssignedMembers({});
                setAssignedTeams({});
                isScreenActive.current = false;
            };
        }, []));

    if (loading)
        return <Loading />

    else
        return (
            <ScrollView style={{ backgroundColor: 'white', height: '100%' }}>
                <TextInput style={styles.textInputstyling} placeholder="Enter Task name" defaultValue={task.name} editable={!submitClicked} onChangeText={changeName} />
                <TextInput style={styles.textInputstyling} placeholder="Enter Task description" defaultValue={task.description} editable={!submitClicked} onChangeText={changeDescription} />


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
                        <Text>No teams created</Text>
                }
                <Text style={{ textAlign: 'center', margin: 5, fontSize: 22, color: 'black' }}>Members</Text>
                {
                    members.length > 0 ?
                        members.map((item) => { return renderMember({ item }) }) :
                        <Text>No members created</Text>
                }
                <View><Button title={"Create Task"} onPress={submit} /></View>
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
        fontSize: 16,
        paddingLeft: 8,
        backgroundColor: '#d3d3d0',
        borderRadius: 10,
        height: 40,
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