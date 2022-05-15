import React from "react";
import { UserContext } from "../components/userContext";
import Loading from "./loading";
import Button from "../components/button";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, StyleSheet, View, Text, Image } from "react-native";
import clubDetails from "../cache/clubProfile";
import { view } from "../components/styling";

export default function ViewClubProfile({ navigation }) {
    const [loading, setLoading] = React.useState(true);
    const currentUser = React.useContext(UserContext).user;
    const [clubData, setClubData] = React.useState(null);
    const isScreenActive = React.useRef(true);

    useFocusEffect(
        React.useCallback(() => {
            isScreenActive.current = true;
            clubDetails.getDetails('club').then((club) => {
                if (isScreenActive.current) {
                    setClubData(club);
                    setLoading(false);
                }
            }).catch(err => {
                console.log(err.message);
            });
            return () => {
                setLoading(true);
                isScreenActive.current = false;
            }
        }, []));

    if (loading)
        return (<Loading />);
    else
        return (
            <ScrollView style={styles.screen}>
                <Image source={require('../assets/logo.png')} style={styles.buttonView} />
                <View style={view.containter}>
                    <View style={view.box1}>

                        <Text style={view.textContent1}>Club Name</Text>
                        <Text style={view.textContent1}>Club Secretary</Text>
                        <Text style={view.textContent1}>Club Description</Text>

                    </View>
                    <View style={view.box2}>

                        <Text style={view.textContent2}>{clubData.name}</Text>
                        <Text style={view.textContent2}>{clubData.secretary}</Text>
                        <Text style={view.textContent2}>{clubData.description}</Text>

                    </View>
                </View>
                <View style={styles.buttonupdate}>
                    {currentUser.secretary && <Button title={'Update'} onPress={() => { navigation.navigate('Update Club Profile') }} />}
                </View>
            </ScrollView>
        );
};

const styles = StyleSheet.create({
    screen: {
        padding: 20,
    },
    buttonView: {
        width: 300,
        height: 300,
        alignSelf: 'center',
    },
    containter: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10
    },
});