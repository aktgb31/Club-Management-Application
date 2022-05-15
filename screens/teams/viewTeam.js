import React from "react";
import { ScrollView, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import teams from "../../cache/teams";
import CreateAlert from "../../components/alert";
import Loading from "../loading";
import ViewTeamData from "../../components/viewTeamData";
import { UserContext } from "../../components/userContext";
import Button from "../../components/button";
import SuccessMessage from "../../components/successMessage";

export default function ViewTeam({ route, navigation }) {
    const key = route.params.key;
    const [teamData, setTeamData] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const { user } = React.useContext(UserContext);
    const isScreenActive = React.useRef(true);

    useFocusEffect(React.useCallback(() => {
        setLoading(true);
        isScreenActive.current = true;
        teams.getTeam(key).then((data) => {
            if (isScreenActive.current) {
                setTeamData({ name: data.name, description: data.description, tasks: Object.entries(data.tasks), members: Object.entries(data.members) });
                setLoading(false);
            }
        }).catch((error) => {
            console.log(error.message);
        });
        return () => {
            setLoading(true);
            isScreenActive.current = false;
        }
    }, []));

    function updateTeam() {
        navigation.push('Update Team', { key: key })
    }

    function deleteTeam() {
        teams.deleteTeam(key).then(() => {
            setLoading(false);
            SuccessMessage("Team Deleted");
            navigation.goBack();
        }).catch((error) => {
            console.log(error.message);
            CreateAlert("Error", "Could not delete team");
        });
    }

    if (loading)
        return <Loading />
    else
        return (
            <ScrollView>
                <ViewTeamData teamData={teamData} />
                <View style={{ padding: 10, flexDirection: "row", justifyContent: "space-evenly", width: '94%' }}>
                    {user.secretary && <Button title={'Update'} onPress={updateTeam} />}
                    {user.secretary && <Button title={'Delete'} onPress={deleteTeam} />}
                </View>
            </ScrollView>
        )
};

