import React from "react";
import { ScrollView, View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { UserContext } from "../../components/userContext";
import Loading from "../loading";
import tasks from "../../cache/tasks";
import Button from "../../components/button";
import ViewTaskData from "../../components/viewTaskData";
import CreateAlert from "../../components/alert";
import SuccessMessage from "../../components/successMessage";

export default function ViewTask({ route, navigation }) {

    const key = route.params.key;
    const [taskData, setTaskData] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const { user } = React.useContext(UserContext);
    const isScreenActive = React.useRef(true);

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            isScreenActive.current = true;
            tasks.getTask(key).then((data) => {
                if (isScreenActive.current) {
                    setTaskData({ ...data, teams: Object.values(data.teams), members: Object.values(data.members) });
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

    function updateTask() {
        navigation.push("Update Task", { key: key });
    }

    function deleteTask() {
        setLoading(true);
        tasks.deleteTask(key).then(() => {
            setLoading(false);
            SuccessMessage("Task Deleted");
            navigation.goBack();
        }).catch((error) => {
            setLoading(false);
            console.log(error.message);
            CreateAlert("Error", "Could not delete task");
        });
    }

    if (loading)
        return <Loading />

    else
        return (
            <ScrollView >
                <ViewTaskData taskData={taskData} />
                {!taskData.completed && <View style={{ padding: 10, flexDirection: "row", justifyContent: "space-evenly", width: '94%' }}>
                    {user.secretary && <Button title={'Update'} onPress={updateTask} />}
                    {user.secretary && <Button title={'Delete'} onPress={deleteTask} />}
                </View>}
            </ScrollView>
        )
}