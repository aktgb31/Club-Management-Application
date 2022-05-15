import { useFocusEffect } from "@react-navigation/native";
import { View, FlatList, TouchableOpacity, StyleSheet, Text, TextInput } from "react-native";
import React from "react";
import Button from "../../components/button";
import { UserContext } from "../../components/userContext";
import { getAllTeamsShortInfo } from "../../firebase/teams";
import Loading from "../loading";

export default function AllTeams({ navigation }) {
    const [loading, setLoading] = React.useState(true);
    const isScreenActive = React.useRef(true);
    const { user } = React.useContext(UserContext);
    const [search, setSearch] = React.useState('');
    const [allTeamsList, setAllTeamsList] = React.useState([]);

    useFocusEffect(
        React.useCallback(() => {
            isScreenActive.current = true;
            getAllTeamsShortInfo().then((teams) => {
                if (isScreenActive.current) {
                    setAllTeamsList(teams);
                }
                setLoading(false);
            }).catch(err => { console.log(err.message); });
            return () => {
                // setSearch('');
                setLoading(true);
                isScreenActive.current = false;
            }
        }, []));

    function keyExtractor(item, index) {
        return item.key;
    }

    function searchFilter(text) {
        setSearch(text);
    }

    function renderItem({ item }) {
        if (item.name.trim().toLowerCase().startsWith(search.trim().toLowerCase()))
            return (<TouchableOpacity onPress={() => { navigation.push('View Team', { key: item.key }); }}>
                <View style={styles.box}>
                    <View style={styles.boxContent}>
                        <Text style={styles.title}>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>)

    }

    function listEmpty() {
        const count = allTeamsList.filter(item => item.name.trim().toLowerCase().startsWith(search.trim().toLowerCase())).length;
        if (count === 0)
            return (<View><Text style={{ textAlign: "center" }}>No Teams</Text></View>)
        else
            return <></>
    }
    if (loading)
        return (<Loading />)
    else
        return (<View style={{ flex: 1, backgroundColor: 'white' }}>
            <TextInput style={styles.textInputstyling}
                value={search}
                placeholder="Search Teams ..."
                placeholderTextColor="#9E9E9E"
                onChangeText={(text) => searchFilter(text)}
            />
            <FlatList
                data={allTeamsList}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ListFooterComponent={listEmpty}
                extraData={search}
            />
            {user.secretary && <Button title={"Create Team"} onPress={() => { navigation.push('Create Team') }} />}
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

});