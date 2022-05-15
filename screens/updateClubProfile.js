import React from "react";
import { ScrollView, StyleSheet, View, Text, TextInput } from "react-native";
import Button from "../components/button";
import Loading from "./loading";
import { useFocusEffect } from "@react-navigation/native";
import clubDetails from "../cache/clubProfile";
import SuccessMessage from "../components/successMessage";
import CreateAlert from "../components/alert";

export default function UpdateClubProfile({ navigation }) {
    const [loading, setLoading] = React.useState(true);
    const [description, setdescription] = React.useState(null);
    const [submitClicked, setSubmitClicked] = React.useState(false);

    useFocusEffect(React.useCallback(() => {
        clubDetails.getDetails('CSEA').then((data) => {
            setdescription(data.description);
            setLoading(false);
        }).catch((error) => {
            console.log(error.message);
        });
        return () => { setLoading(true); }
    }, []));

    function changeDesciption(text) {
        setdescription(text);
    }
    async function submit() {
        setSubmitClicked(true);
        setLoading(true);
        await clubDetails.updateClubDetails('CSEA', description).then(() => {
            setSubmitClicked(false);
            setLoading(false);
            SuccessMessage("Club Profile Updated");
            navigation.goBack();
        }).catch(err => {
            setLoading(false);
            console.log(err.message)
            CreateAlert("Error", err.message);
        });

    }
    if (loading)
        return (<Loading />);
    else
        return (
            <ScrollView>
                <View style={styles.containter}>
                    <View style={styles.box1}>
                        <View style={styles.inner}>
                            <Text style={styles.textstyling}>Description </Text>
                        </View>
                    </View>
                    <View style={styles.box2}>
                        <View style={styles.inner}>
                            <TextInput style={styles.textInputstyling} multiline={true} defaultValue={description} editable={!submitClicked} onChangeText={changeDesciption} />
                        </View>
                    </View>
                </View>
                <Button title={'Update'} onPress={submit} />
            </ScrollView>
        );
}

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    containter: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    box1: {
        width: '98%',
        padding: 7,
    },
    box2: {
        width: '100%',
        padding: 7,
    },
    textstyling: {
        margin: 12,
        fontSize: 22,
        fontWeight: 'bold',
        color: 'black'
    },
    textInputstyling: {
        margin: 8,
        fontSize: 16,
        paddingLeft: 8,
        backgroundColor: '#d3d3d3',
        textAlignVertical: 'top',
        borderRadius: 10,
        color: 'black'
    }
});