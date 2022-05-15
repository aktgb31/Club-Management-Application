import React from "react";
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Button from "../../components/button";
import { getAllTasksShortInfo } from "../../firebase/tasks";
import Loading from "../loading";
import { UserContext } from "../../components/userContext";

export default function AllTasks({ navigation }) {
    const [loading, setLoading] = React.useState(true);
    const isScreenActive = React.useRef(true);
    const { user } = React.useContext(UserContext);
    const [allTasksList, setAllTasksList] = React.useState([]);
    const [showCompleted, setShowCompleted] = React.useState(false);

    useFocusEffect(
        React.useCallback(() => {
            isScreenActive.current = true;
            getAllTasksShortInfo().then((tasks) => {
                console.log(tasks);
                if (isScreenActive.current) {
                    setAllTasksList(tasks);
                }
                setLoading(false);
            }).catch(err => { console.log(err.message); });
            return () => { ; setLoading(true); isScreenActive.current = false; }
        }, []));

    function keyExtractor(item, index) {
        return item.key;
    }

    function renderItem({ item }) {
        if (item.completed == showCompleted)
            return (<TouchableOpacity onPress={() => { navigation.push('View Task', { key: item.key }); }}>
                <View style={styles.box}>
                    <View style={styles.boxContent}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.description}>{`Task Deadline: ${item.deadline.toDate().toString()}`}</Text>
                        <Text style={styles.description}>{`Task Status: ${item.completed ? 'Completed' : 'Pending'}`}</Text>
                    </View>
                </View>
            </TouchableOpacity>)
    }

    function listEmpty() {
        const count = allTasksList.filter(item => item.completed == showCompleted).length;
        if (count === 0)
            return (<View><Text style={{ textAlign: "center" }}>No tasks</Text></View>)
        else
            return <></>
    }
    if (loading)
        return (<Loading />)
    else
        return (
            <View style={{ flex: 1 }}>
                <View style={{ padding: 10, flexDirection: "row", justifyContent: "space-evenly", width: '90%' }}>
                    <TouchableOpacity
                        onPress={() => { setShowCompleted(false); }}
                        style={!showCompleted ? styles.activeTab : styles.inActiveTab} >
                        <View><Text style={styles.text}>Pending</Text></View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => { setShowCompleted(true); }}
                        style={!showCompleted ? styles.inActiveTab : styles.activeTab} >
                        <View><Text style={styles.text}>Completed</Text></View>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={allTasksList}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 70, marginTop: 10 }}
                    extraData={showCompleted}
                    ListEmptyComponent={listEmpty}
                />
                {user.secretary && <Button title={"Create Task"} onPress={() => { navigation.push('Create Task') }} />}
            </View>)

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
        fontSize: 24,
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
    description: {
        fontSize: 15,
        color: "#9A9A9A",
    },
    activeTab: {
        padding: 10,
        margin: 10,
        backgroundColor: '#006EE9',
        alignItems: 'center',
        width: '50%',
        left: '23%',
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 10,
        minWidth: "40%",
        textAlign: "center",
    },
    inActiveTab: {
        padding: 10,
        margin: 10,
        backgroundColor: 'grey',
        alignItems: 'center',
        width: '50%',
        left: '23%',
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 10,
        minWidth: "40%",
        textAlign: "center",
    },
    text: {
        color: '#EAF3FD',
        fontSize: 18
    }

});