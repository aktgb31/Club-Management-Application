import React from "react";
import { View, TextInput, Text, StyleSheet, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Button from "../../components/button";
import Loading from "../loading";
import memberDetails from "../../cache/members";
import SuccessMessage from "../../components/successMessage";
import CreateAlert from "../../components/alert";

export default function AddMember({ navigation }) {
    const [email, setEmail] = React.useState("");
    const [submitClicked, setSubmitClicked] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    function changeEmail(text) {
        setEmail(text);
    }

    function submit() {
        setSubmitClicked(true);
        setIsLoading(true);

        memberDetails.addMember(email.trim().toLowerCase()).then(() => {
            setEmail("");
            setSubmitClicked(false);
            setIsLoading(false);
            SuccessMessage("Club Member added");
            navigation.goBack();
        }).catch((error) => {
            console.log(error.message);
            setSubmitClicked(false);
            setIsLoading(false);
            CreateAlert("Error", error.message);
        });
    }

    useFocusEffect(React.useCallback(() => {
        setSubmitClicked(false);
        setIsLoading(false);
        return () => { setSubmitClicked(false); setIsLoading(false); }
    }, []));

    if (isLoading)
        return <Loading />
    else
        return (
            <View>
                <Image source={require('../../assets/logo.png')} style={styles.buttonView} />
                <TextInput
                    style={styles.textInputstyling}
                    defaultValue={email}
                    placeholder="Enter NITC email of new member"
                    placeholderTextColor="#9E9E9E"
                    onChangeText={changeEmail}
                    editable={!submitClicked}>
                </TextInput>
                <Button title={"Add Member"} onPress={submit} />
            </View>
        )
}
const styles = StyleSheet.create({
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
    buttonView: {
        width: '60%',
        height: '50%',
        marginBottom: 35,
        marginTop: 35,
        marginLeft: '20%'
    },
});