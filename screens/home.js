import React from "react";
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from "react-native"
import { UserContext } from "../components/userContext";
import { useFocusEffect } from "@react-navigation/native";
import memberDetails from "../cache/members";
import Loading from "./loading";
import { view } from "../components/styling";

function Home({ navigation }) {
    const { user } = React.useContext(UserContext);
    const isScreenActive = React.useRef(true);
    const [loading, setLoading] = React.useState(true);
    const [userData, setUserData] = React.useState(null);

    useFocusEffect(
        React.useCallback(() => {
            isScreenActive.current = true;
            memberDetails.getDetails(user.email).then((data) => {
                if (isScreenActive.current) {
                    setUserData({ ...data, tasks: Object.entries(data.tasks) });
                    setLoading(false);
                }
            }).catch(err => {
                console.log(err.message);
            });
            return () => {
                setLoading(true);
                isScreenActive.current = false;
            }
        }, [])
    );

    function taskKey(items) {
        return items[0];
    }

    function renderTask({ item }) {
        const key = item[0];
        const data = item[1];
        return (<TouchableOpacity onPress={() => { navigation.push('View Task', { key: key }); }}>
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

    function listEmpty() {
        return (<View><Text style={view.textContent3}>No Assigned tasks</Text></View>)
    }
    if (loading)
        return <Loading />
    else
        return (
            <View style={{ flex: 1 }}>
                <Text style={view.name}>Welcome, {user.name}</Text>
                <View style={styles.containter}>
                    <View style={view.box3}>
                        <Text style={view.textContent3}>Tasks Assigned</Text>
                        {/* <View style={{ flex: 1 }}> */}
                        <FlatList
                            data={userData.tasks}
                            keyExtractor={taskKey}
                            renderItem={renderTask}
                            ListEmptyComponent={listEmpty}
                        />
                        {/* </View> */}
                    </View>
                </View>
            </View>)
}

export default Home;

const styles = StyleSheet.create({
    containter: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingBottom: 100
    }
})