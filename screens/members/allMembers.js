import React from "react";
import { FlatList, View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from "react-native";
import { getAllUsersShortInfo } from "../../firebase/members";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../loading";
import { UserContext } from "../../components/userContext";
import Button from "../../components/button";

export default function AllMembers({ navigation }) {
    const [loading, setLoading] = React.useState(true);
    const isScreenActive = React.useRef(true);
    const { user } = React.useContext(UserContext);
    const [search, setSearch] = React.useState('');
    const [allUsersList, setAllUsersList] = React.useState([]);

    useFocusEffect(
        React.useCallback(() => {
            isScreenActive.current = true;
            getAllUsersShortInfo().then((users) => {
                if (isScreenActive.current) {
                    setAllUsersList(users.filter((user) => user.profilePic != ''));
                }
                setLoading(false);
            }).catch(err => { console.log(err.message) });

            return () => {
                setLoading(true);
                setSearch('');
                isScreenActive.current = false;
            }
        }, []));

    function keyExtractor(item, index) {
        return item.email;
    }

    function searchFilter(text) {
        setSearch(text);
    }

    function renderItem({ item }) {
        if (item.name.trim().toLowerCase().startsWith(search.trim().toLowerCase())) {
            return (<TouchableOpacity onPress={() => { navigation.push('View Member', { email: item.email }); }}>
                <View style={styles.box}>
                    <Image style={styles.image} source={{ uri: item.profilePic }} />
                    <View style={styles.boxContent}>
                        <Text style={styles.title}>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>)
        }
    }

    function listEmpty() {
        const count = allUsersList.filter(item => item.name.trim().toLowerCase().startsWith(search.trim().toLowerCase())).length;
        if (count === 0)
            return (<View><Text style={{ textAlign: "center" }}>No Members</Text></View>)
        else
            return <></>
    }

    if (loading)
        return (<Loading />)
    else
        return (<View style={{ flex: 1, backgroundColor: 'white' }}>
            <TextInput style={styles.textInputstyling}
                value={search}
                placeholder="Search Member ..."
                placeholderTextColor="#9E9E9E"
                onChangeText={(text) => searchFilter(text)}
            />
            <FlatList
                data={allUsersList}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}
                extraData={search}
                ListFooterComponent={listEmpty}
            />
            {user.secretary && <Button style={{ position: 'absolute', bottom: 0, left: 0 }} title={"Add Member"} onPress={() => { navigation.push('Add Member') }} />}

        </View>
        );
}
const styles = StyleSheet.create({
    image: {
        width: 40,
        height: 40,
        borderRadius: 16,
        borderColor: '#006EE9',
        borderWidth: 1,
    },
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
    }
});