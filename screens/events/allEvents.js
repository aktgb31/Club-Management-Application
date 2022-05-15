import React from "react";
import { FlatList, View, Text, TouchableOpacity, StyleSheet, StatusBar, TextInput, Image } from "react-native";
import { getAllEventsShortInfo } from "../../firebase/events";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../loading";
import { UserContext } from "../../components/userContext";
import Button from "../../components/button";
// import Button2 from "../../components/button2";


export default function AllEvents({ navigation }) {
    const [loading, setLoading] = React.useState(true);
    const isScreenActive = React.useRef(true);
    const { user } = React.useContext(UserContext);
    const [allEventsList, setAllEventsList] = React.useState([]);
    const [pageData, setPageData] = React.useState({ search: '', activeUpcoming: true });


    useFocusEffect(
        React.useCallback(() => {
            isScreenActive.current = true;
            getAllEventsShortInfo().then((Events) => {
                if (isScreenActive.current) {
                    setAllEventsList(Events);
                }
                setLoading(false);
            }).catch(err => { console.log(err.message) });

            return () => {
                // setPageData({ search:'', activeUpcoming:true});
                setLoading(true);
                isScreenActive.current = false;
            }
        }, []));

    function keyExtractor(item, index) {
        return item.key;
    }

    function searchFilter(text) {
        setPageData({ ...pageData, search: text });
    }

    function check(item) {
        return item.name.trim().toLowerCase().startsWith(pageData.search.trim().toLowerCase()) && (pageData.activeUpcoming ? (item.datetime.toDate()) >= (new Date()) : (item.datetime.toDate()) < (new Date()));
    }
    function renderItem({ item }) {
        if (check(item))
            return (<TouchableOpacity onPress={() => { navigation.navigate('View Event', { key: item.key }); }}>
                <View style={[styles.box, styles.shadowProp]}>
                    <View style={styles.boxContent}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.description}>{`${(item.datetime).toDate().toString()}`}</Text>
                        <Text style={styles.description}>{`Venue: ${item.venue}`}</Text>
                    </View>
                </View>
            </TouchableOpacity>)
    }
    function listEmpty() {
        const count = allEventsList.filter(item => check(item)).length;
        if (count === 0)
            return (<View><Text style={{ textAlign: "center" }}>No Events</Text></View>)
        else
            return <></>
    }
    if (loading)
        return (<Loading />)
    else
        return (<View style={{ flex: 1, backgroundColor: 'white' }}>
            <TextInput style={styles.textInputstyling}
                value={pageData.search}
                placeholder="Search Event ..."
                placeholderTextColor="#9E9E9E"
                onChangeText={searchFilter}
            />
            <View style={{ padding: 10, flexDirection: "row", justifyContent: "space-evenly", width: '94%', marginTop: -10 }}>
                <TouchableOpacity
                    onPress={() => { setPageData({ ...pageData, activeUpcoming: true }) }}
                    style={pageData.activeUpcoming ? styles.activeTab : styles.inActiveTab} >
                    <View><Text style={styles.text}>Upcoming</Text></View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { setPageData({ ...pageData, activeUpcoming: false }) }}
                    style={pageData.activeUpcoming ? styles.inActiveTab : styles.activeTab} >
                    <View><Text style={styles.text}>Past</Text></View>
                </TouchableOpacity>


            </View>
            <FlatList
                data={allEventsList}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}
                extraData={pageData}
                ListFooterComponent={listEmpty}
            />
            {user.secretary && <Button title={"Create Event"} onPress={() => { navigation.navigate('Create Event') }} />}
        </View>
        );
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