import React from "react";
import { ScrollView, View, Text, TextInput } from "react-native";
import Button from "../../components/button";
import { UserContext } from "../../components/userContext";
import Loading from "../loading";
import { useFocusEffect } from "@react-navigation/native";
import eventDetails from "../../cache/events";
import { styles } from "../../components/styling";
import SuccessMessage from "../../components/successMessage";
import CreateAlert from "../../components/alert";
import DateTimePicker from "../../components/dateTimePicker";

export default function UpdateEvent({ route, navigation }) {
    const { key } = route.params;
    const [loading, setLoading] = React.useState(true);
    const { user } = React.useContext(UserContext);
    const [updatedEventDetails, setUpdatedEventDetails] = React.useState(null);
    const [submitClicked, setSubmitClicked] = React.useState(false);
    const [dateTime, setDateTime] = React.useState(new Date(Date.now()));
    const isScreenActive = React.useRef(true);

    useFocusEffect(React.useCallback(() => {
        isScreenActive.current = true;
        setSubmitClicked(false);

        eventDetails.getDetails(key).then((data) => {
            if (isScreenActive.current) {
                setUpdatedEventDetails({ ...data });
                setDateTime(data.datetime.toDate());
                setLoading(false);
            }
        }).catch((error) => {
            console.log(error.message);
        });
        return () => {
            setLoading(true);
            isScreenActive.current = true
        }
    }, []));

    function changeName(text) {
        setUpdatedEventDetails({ ...updatedEventDetails, name: text });
    }
    function changeVenue(text) {
        setUpdatedEventDetails({ ...updatedEventDetails, venue: text });
    }

    function changeDescription(text) {
        setUpdatedEventDetails({
            ...updatedEventDetails, description: text
        });
    }

    async function submit() {
        setSubmitClicked(true);
        setLoading(true);
        // setUpdatedEventDetails({ ...updatedEventDetails, datetime: dateTime });
        await eventDetails.updateDetails(key, { ...updatedEventDetails, datetime: dateTime }).then(() => {
            setSubmitClicked(false);
            setLoading(false);
            SuccessMessage("Event details updated");
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
            <ScrollView style={{ backgroundColor: "white" }}>
                <View style={styles.containter}>
                    <View style={styles.box}>
                        <View style={styles.inner}>
                            <TextInput style={styles.textInputstyling}
                                defaultValue={updatedEventDetails.name}
                                placeholder="Enter name of the new event"
                                editable={!submitClicked}
                                onChangeText={changeName} />
                            <TextInput style={styles.textInputstyling}
                                defaultValue={updatedEventDetails.venue}
                                placeholder="Enter the venue of the event"
                                editable={!submitClicked}
                                onChangeText={changeVenue} />
                            <TextInput
                                style={styles.textInputstyling}
                                defaultValue={dateTime.toString()}
                                editable={false}>
                            </TextInput>

                            <DateTimePicker dateTime={dateTime} setDateTime={setDateTime} />

                            <TextInput style={styles.textInputstyling}
                                defaultValue={updatedEventDetails.description}
                                placeholder="Enter the description of the event"
                                editable={!submitClicked}
                                onChangeText={changeDescription} />
                        </View>
                    </View>
                </View>
                <Button title={'Update'} onPress={submit} />
            </ScrollView>
        );
}