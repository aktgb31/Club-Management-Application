import React from "react";
import { ScrollView, View, TextInput } from "react-native";
import Button from "../../components/button";
import { UserContext } from "../../components/userContext";
import Loading from "../loading";
import { useFocusEffect } from "@react-navigation/native";
import alumniDetails from "../../cache/alumni";
import { styles } from "../../components/styling";
import SuccessMessage from "../../components/successMessage";
import CreateAlert from "../../components/alert";

export default function UpdateAlumni({ route, navigation }) {
    const { key } = route.params;
    const [loading, setLoading] = React.useState(true);
    const { user } = React.useContext(UserContext);
    const [updatedAlumniDetails, setUpdatedAlumniDetails] = React.useState(null);
    const [submitClicked, setSubmitClicked] = React.useState(false);

    useFocusEffect(React.useCallback(() => {
        alumniDetails.getDetails(key).then((data) => {
            setUpdatedAlumniDetails({ ...data });
            setLoading(false);
        }).catch((error) => {
            console.log(error.message);
        });
        return () => { setLoading(true); }
    }, []));

    function changeName(text) {
        setUpdatedAlumniDetails({ ...updatedAlumniDetails, name: text });
    }
    function changeEmail(text) {
        setUpdatedAlumniDetails({ ...updatedAlumniDetails, email: text });
    }
    function changeBatch(text) {
        setUpdatedAlumniDetails({ ...updatedAlumniDetails, batch: text });
    }
    function changeBranch(text) {
        setUpdatedAlumniDetails({ ...updatedAlumniDetails, branch: text });
    }
    function changeLinkedin(text) {
        setUpdatedAlumniDetails({ ...updatedAlumniDetails, linkedin: text });
    }
    function changeCompany(text) {
        setUpdatedAlumniDetails({ ...updatedAlumniDetails, currentcompany: text });
    }
    function changePhone(text) {
        setUpdatedAlumniDetails({ ...updatedAlumniDetails, phone: text });
    }

    async function submit() {
        setSubmitClicked(true);
        setLoading(true);
        await alumniDetails.updateDetails(key, updatedAlumniDetails).then(() => {
            setSubmitClicked(false);
            setLoading(false);
            SuccessMessage("Alumni Details Updated");
            navigation.goBack();
        }).catch(err => {
            console.log(err.message);
            setLoading(false);
            CreateAlert("Error", err.message);
        });

    }
    if (loading)
        return (<Loading />);
    else
        return (
            <ScrollView>
                <View style={styles.containter}>
                    <View style={styles.box}>
                        <View style={styles.inner}>
                            <TextInput style={styles.textInputstyling} defaultValue={updatedAlumniDetails.name} placeholder="Enter name" editable={!submitClicked} onChangeText={changeName} />
                            <TextInput style={styles.textInputstyling} defaultValue={updatedAlumniDetails.email} placeholder="Enter email" editable={!submitClicked} onChangeText={changeEmail} />
                            <TextInput style={styles.textInputstyling} defaultValue={updatedAlumniDetails.batch} placeholder="Enter batch" editable={!submitClicked} onChangeText={changeBatch} />
                            <TextInput style={styles.textInputstyling} defaultValue={updatedAlumniDetails.branch} placeholder="Enter branch" editable={!submitClicked} onChangeText={changeBranch} />
                            <TextInput style={styles.textInputstyling} defaultValue={updatedAlumniDetails.linkedin} placeholder="Enter linkedin" editable={!submitClicked} onChangeText={changeLinkedin} />
                            <TextInput style={styles.textInputstyling} defaultValue={updatedAlumniDetails.currentcompany} placeholder="Enter Current Company" editable={!submitClicked} onChangeText={changeCompany} />
                            <TextInput style={styles.textInputstyling} defaultValue={updatedAlumniDetails.phone} placeholder="Enter phone" editable={!submitClicked} onChangeText={changePhone} />

                        </View>
                    </View>
                </View>
                <Button title={'Update'} onPress={submit} />
            </ScrollView>
        );
}
