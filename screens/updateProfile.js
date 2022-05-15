import React from "react";
import { ScrollView, StyleSheet, View, Text, TextInput } from "react-native";
import Button from "../components/button";
import { UserContext } from "../components/userContext";
import Loading from "./loading";
import { useFocusEffect } from "@react-navigation/native";
import memberDetails from "../cache/members";
import CreateAlert from "../components/alert";
import SuccessMessage from "../components/successMessage";

export default function UpdateProfile({ navigation }) {
    const [loading, setLoading] = React.useState(true);
    const { user } = React.useContext(UserContext);
    const [updatedUserDetails, setUpdatedUserDetails] = React.useState(null);
    const [submitClicked, setSubmitClicked] = React.useState(false);
    const isScreenActive = React.useRef(true);

    useFocusEffect(React.useCallback(() => {
        isScreenActive.current = true;
        memberDetails.getDetails(user.email).then((data) => {
            if (isScreenActive)
                setUpdatedUserDetails({ ...data }); {
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

    function changePhone(text) {
        setUpdatedUserDetails({ ...updatedUserDetails, phone: text });
    }
    function changeBranch(text) {
        setUpdatedUserDetails({ ...updatedUserDetails, branch: text });
    }
    function changeYear(text) {
        setUpdatedUserDetails({ ...updatedUserDetails, year: text });
    }
    async function submit() {
        setSubmitClicked(true);
        setLoading(true);
        await memberDetails.updateDetails(user.email, updatedUserDetails).then(() => {
            setSubmitClicked(false);
            setLoading(false);
            SuccessMessage("Details Updated");
            navigation.goBack();
        }).catch(err => {
            console.log(err.message);
            setLoading(false);
            setSubmitClicked(false);
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
                            <Text style={styles.textstyling}>Phone </Text>
                            <Text style={styles.textstyling}>Branch </Text>
                            <Text style={styles.textstyling}>Year </Text>
                        </View>
                    </View>
                    <View style={styles.box2}>
                        <View style={styles.inner}>
                            <TextInput style={styles.textInputstyling} keypadType="numeric" maxLength={10} placeholder="Enter 10 digit number" defaultValue={updatedUserDetails.phone} editable={!submitClicked} onChangeText={changePhone} />
                            <TextInput style={styles.textInputstyling} defaultValue={updatedUserDetails.branch} placeholder="Enter Branch" editable={!submitClicked} onChangeText={changeBranch} />
                            <TextInput style={styles.textInputstyling} keypadType="numeric" maxLength={4} defaultValue={updatedUserDetails.year} placeholder="Enter Batch Year" editable={!submitClicked} onChangeText={changeYear} />
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
        width: '30%',
        padding: 7,
    },
    box2: {
        width: '60%',
        padding: 7,
    },
    textstyling: {
        margin: 16,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#9F9F9F'
    },
    textInputstyling: {
        margin: 8,
        fontSize: 16,
        paddingLeft: 8,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: '#9F9F9F',
        borderRadius: 10,
        height: 40,
        borderWidth: 1,
        color: '#006EE9'
    }
});