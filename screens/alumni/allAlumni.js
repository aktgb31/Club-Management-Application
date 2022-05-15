import React from "react";
import { FlatList, View, Text, TouchableOpacity, StyleSheet, StatusBar, TextInput } from "react-native";
import { getAllAlumniShortInfo } from "../../firebase/alumni";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../loading";
import { UserContext } from "../../components/userContext";
import Button from "../../components/button";

export default function AllAlumni({ navigation }) {
    const [loading, setLoading] = React.useState(true);
    const isScreenActive = React.useRef(true);
    const { user } = React.useContext(UserContext);
    const [search, setSearch] = React.useState('');
    const [allAlumniList, setAllAlumniList] = React.useState([]);

    useFocusEffect(
        React.useCallback(() => {
            isScreenActive.current = true;
            getAllAlumniShortInfo().then((Alumni) => {
                if (isScreenActive.current) {
                    setAllAlumniList(Alumni);
                }
                setLoading(false);
            }).catch(err => { console.log(err.message) });

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
            return (<TouchableOpacity onPress={() => { navigation.navigate('View Alumni', { key: item.key }); }}>
                <View style={styles.box}>
                    <View style={styles.boxContent}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.description}>{`Company: ${item.currentcompany}`}</Text>
                    </View>
                </View>
            </TouchableOpacity>)
    }
    function listEmpty() {
        const count = allAlumniList.filter(item => item.name.trim().toLowerCase().startsWith(search.trim().toLowerCase())).length;
        if (count === 0)
            return (<View><Text style={{ textAlign: "center" }}>No Alumni</Text></View>)
        else
            return <></>
    }

    if (loading)
        return (<Loading />)
    else
        return (<View style={{ flex: 1, backgroundColor: 'white' }}>
            <TextInput style={styles.textInputstyling}
                value={search}
                placeholder="Search Alumni ..."
                placeholderTextColor="#9E9E9E"
                onChangeText={(text) => searchFilter(text)}
            />

            <FlatList
                data={allAlumniList}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}
                extraData={search}
                ListFooterComponent={listEmpty}
            />
            {user.secretary && <Button title={"Create Alumni"} onPress={() => { navigation.navigate('Create Alumni') }} />}
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
    description: {
        color: 'grey',
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
    }
});