import React from "react";
import { ScrollView, View, TextInput, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Button from "../../components/button";
import Loading from "../loading";
import alumniDetails from "../../cache/alumni";
import { styles } from "../../components/styling";
import { alumniTemplate } from "../../firebase/alumni";
import SuccessMessage from "../../components/successMessage";
import CreateAlert from "../../components/alert";

export default function CreateAlumni({ navigation }) {
    const [alumni, setAlumni] = React.useState({ ...alumniTemplate });
    const [submitClicked, setSubmitClicked] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const isScreenActive = React.useRef(true);

    function changeName(text) {
        setAlumni({ ...alumni, name: text });
    }
    function changeEmail(text) {
        setAlumni({ ...alumni, email: text });
    }
    function changeBatch(text) {
        setAlumni({ ...alumni, batch: text });
    }
    function changeBranch(text) {
        setAlumni({ ...alumni, branch: text });
    }
    function changelinkedin(text) {
        setAlumni({ ...alumni, linkedin: text })
    }
    function changecurrentcompany(text) {
        setAlumni({ ...alumni, currentcompany: text })
    }
    function changePhone(text) {
        setAlumni({ ...alumni, phone: text })
    }
    function submit() {
        setSubmitClicked(true);
        setIsLoading(true);
        alumniDetails.createAlumni(alumni).then(() => {
            setSubmitClicked(false);
            setAlumni({ ...alumniTemplate });
            setIsLoading(false);
            SuccessMessage("Alumni Created");
            navigation.goBack();
        }).catch((error) => {
            console.log(error.message);
            setSubmitClicked(false);
            setIsLoading(false);
            CreateAlert("Error", error.message);
        });
    }

    useFocusEffect(React.useCallback(() => {
        isScreenActive.current = true;
        setIsLoading(false);
        return () => {
            setSubmitClicked(false);
            setIsLoading(false);
            setAlumni({ ...alumniTemplate });
            isScreenActive.current = false;
        }
    }, []));

    if (isLoading)
        return <Loading />
    else
        return (
            <ScrollView>
                <View style={styles.containter}>
                    <View style={styles.box}>
                        <View style={styles.inner}>
                            <TextInput style={styles.textInputstyling} defaultValue={alumni.name} placeholder="Enter name" editable={!submitClicked} onChangeText={changeName} />
                            <TextInput style={styles.textInputstyling} defaultValue={alumni.email} placeholder="Enter email" editable={!submitClicked} onChangeText={changeEmail} />
                            <TextInput style={styles.textInputstyling} defaultValue={alumni.batch} placeholder="Enter batch" editable={!submitClicked} onChangeText={changeBatch} />
                            <TextInput style={styles.textInputstyling} defaultValue={alumni.branch} placeholder="Enter branch" editable={!submitClicked} onChangeText={changeBranch} />
                            <TextInput style={styles.textInputstyling} defaultValue={alumni.linkedin} placeholder="Enter linkedin" editable={!submitClicked} onChangeText={changelinkedin} />
                            <TextInput style={styles.textInputstyling} defaultValue={alumni.currentcompany} placeholder="Enter Current Company" editable={!submitClicked} onChangeText={changecurrentcompany} />
                            <TextInput style={styles.textInputstyling} defaultValue={alumni.phone} placeholder="Enter phone" editable={!submitClicked} onChangeText={changePhone} />
                        </View>
                    </View>
                </View>
                <Button title={"Create Alumni"} onPress={submit} />
            </ScrollView>


        )
}
