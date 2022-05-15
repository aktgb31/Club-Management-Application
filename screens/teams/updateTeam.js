import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Image, TextInput, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import teams from "../../cache/teams";
import Loading from "../loading";
import { getAllUsersShortInfo } from "../../firebase/members";
import CreateAlert from "../../components/alert";
import Button from "../../components/button";
import { view, styles } from "../../components/styling";
import SuccessMessage from "../../components/successMessage";

export default function UpdateTeam({ route, navigation }) {
    const { key } = route.params;
    const [team, setTeam] = React.useState(null);
    const [members, setMembers] = React.useState([]);
    const isScreenActive = React.useRef(true);
    const [submitClicked, setSubmitClicked] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [selectedTeamMembers, setSelectedTeamMembers] = React.useState({});

    function changeName(text) {
        setTeam({ ...team, name: text });
    }
    function changeDescription(text) {
        setTeam({ ...team, description: text });
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
                    if (selectedTeamMembers.hasOwnProperty(key)) {
                        const { [key]: removedValue, ...rest } = selectedTeamMembers;
                        setSelectedTeamMembers(rest);
                    }
                    else
                        setSelectedTeamMembers({ ...selectedTeamMembers, [key]: item });
                }}>
                <View style={selectedTeamMembers.hasOwnProperty(key) ? styles1.selectedBox : styles1.box}>
                    <Image style={styles1.image} source={{ uri: item.profilePic }} />
                    <View style={styles1.boxContent}>
                        <Text style={styles1.title}>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>)
        }
    }

    function submit() {
        setSubmitClicked(true);
        setLoading(true);
        const taskData = { ...team, members: selectedTeamMembers };
        teams.updateTeam(key, taskData).then(() => {
            setSubmitClicked(false);
            setLoading(false);
            SuccessMessage("Team updated");
            navigation.goBack();
        }).catch((err) => {
            setSubmitClicked(false);
            setLoading(false);
            console.log(err.message);
            CreateAlert("Error", err.message);
        })
    }

    useFocusEffect(React.useCallback(() => {
        setSubmitClicked(false);
        isScreenActive.current = true;
        Promise.all([teams.getTeam(key), getAllUsersShortInfo()]).then(([teamData, usersList]) => {
            console.log(usersList);
            if (isScreenActive.current) {
                setTeam({ name: teamData.name, description: teamData.description });
                setSelectedTeamMembers(teamData.members);
                setMembers(usersList);
                setLoading(false);
            }
        }).catch((error) => {
            console.log(error.message);
        });
        return () => { setLoading(true); isScreenActive.current = false; setSubmitClicked(false); }
    }, []));

    if (loading)
        return <Loading />
    else
        return (
            <ScrollView>
                <TextInput style={styles.textInputstyling} placeholder="Enter Team Name" placeholderTextColor="#9E9E9E" defaultValue={team.name} editable={!submitClicked} onChangeText={changeName}></TextInput>
                <TextInput style={styles.textInputstyling} placeholder="Enter Team Description" placeholderTextColor="#9E9E9E" defaultValue={team.description} editable={!submitClicked} onChangeText={changeDescription}></TextInput>
                <View style={view.containter}>
                    <View style={view.box3}>
                        <Text style={{ textAlign: 'center', margin: 5, fontSize: 22, color: 'black' }}>Team Members</Text>
                        {
                            members.length > 0 ?
                                members.map((item) => { return renderMember({ item }) }) :
                                <Text>No members created</Text>
                        }
                    </View>
                </View>

                <Button styles={styles1.button} title="Update Team" onPress={submit} />
            </ScrollView>
        )
}
const styles1 = StyleSheet.create({
    image: {
        width: 30,
        height: 30,
        borderRadius: 16,
        borderColor: 'grey',
        borderColor: 'black',
        borderWidth: 1,
    },
    box: {
        width: '90%',
        marginLeft: '5%',
        padding: 8,
        marginBottom: 10,
        backgroundColor: '#DCDCDC',
        flexDirection: 'row',
        borderRadius: 20,
    },
    selectedBox: {
        width: '90%',
        marginLeft: '5%',
        padding: 8,
        marginBottom: 10,
        backgroundColor: '#707B7C',
        flexDirection: 'row',
        borderRadius: 20,
    }
    ,
    boxContent: {
        flex: 1,
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    title: {
        fontSize: 18,
        color: "#151515",
    },
});