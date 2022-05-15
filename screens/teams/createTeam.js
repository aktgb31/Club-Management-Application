import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image } from "react-native";
import Loading from "../loading";
import { getAllUsersShortInfo } from "../../firebase/members";
import Button from "../../components/button";
import teams from "../../cache/teams";
import CreateAlert from "../../components/alert";
import SuccessMessage from "../../components/successMessage";
import { teamTemplate } from "../../firebase/teams";
// import styles from "../../components/styling";


export default function CreateTeam({ navigation }) {
    const [team, setTeam] = React.useState({ ...teamTemplate });
    const [members, setMembers] = React.useState([]);
    const isScreenActive = React.useRef(true);
    const [submitClicked, setSubmitClicked] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
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
                <View style={selectedTeamMembers.hasOwnProperty(key) ? styles.selectedBox : styles.box}>
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
        setIsLoading(true);
        const teamData = { ...team, members: selectedTeamMembers };
        teams.createTeam(teamData).then(() => {
            setSubmitClicked(false);
            setTeam({ ...teamTemplate })
            setSelectedTeamMembers({});
            setIsLoading(false);
            SuccessMessage("Teams Created");
            navigation.goBack();
        }).catch((err) => {
            setSubmitClicked(false);
            setIsLoading(false);
            console.log(err.message);
            CreateAlert("Error", err.message);
        })
    }

    useFocusEffect(React.useCallback(() => {
        setSubmitClicked(false);
        isScreenActive.current = true;
        getAllUsersShortInfo().then((users) => {
            if (isScreenActive.current) {
                setMembers(users);
            }
            setIsLoading(false);
        }).catch(err => { console.log(err.message); });
        return () => {
            setSubmitClicked(false);
            setIsLoading(true);
            isScreenActive.current = false;
        }
    }, []));

    if (isLoading)
        return <Loading />

    else
        return (
            <ScrollView>
                <View style={styles.containter}>
                    <View style={styles.inner}>
                        <TextInput style={styles.textInputstyling} placeholder="Enter Team Name" editable={!submitClicked} onChangeText={changeName}></TextInput>
                        <TextInput style={styles.textInputstyling} placeholder="Enter Team Description" editable={!submitClicked} onChangeText={changeDescription}></TextInput>
                    </View>
                </View>

                <Text style={{ textAlign: 'center', margin: 5, fontSize: 22, color: 'black' }}>Team Members</Text>
                {
                    members.length > 0 ?
                        members.map((item) => { return renderMember({ item }) }) :
                        <Text>No members created</Text>
                }
                <Button title={"Create Team"} onPress={submit} />
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