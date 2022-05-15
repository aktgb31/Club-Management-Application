import React from "react";
import { ScrollView, View, TextInput, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Button from "../../components/button";
import Loading from "../loading";
import eventDetails from "../../cache/events";
import { styles, view } from "../../components/styling";
import CreateAlert from "../../components/alert";
import { eventTemplate } from "../../firebase/events";
import SuccessMessage from "../../components/successMessage";
import DateTimePicker from "../../components/dateTimePicker";


export default function CreateEvent({ navigation }) {
    const [event, setEvent] = React.useState({ ...eventTemplate });
    const [submitClicked, setSubmitClicked] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const isScreenActive = React.useRef(true);
    const [dateTime, setDateTime] = React.useState(new Date(Date.now()));

    function changeName(text) {
        setEvent({ ...event, name: text });
    }
    function changeVenue(text) {
        setEvent({ ...event, venue: text });
    }

    function changeDescription(text) {
        setEvent({ ...event, description: text })
    }
    function submit() {
        setSubmitClicked(true);
        setIsLoading(true);
        // setEvent({ ...event, datetime: dateTime });
        eventDetails.createEvent({ ...event, datetime: dateTime }).then(() => {
            setSubmitClicked(false);
            setIsLoading(false);
            setEvent({ ...eventTemplate });
            SuccessMessage("Event Created");
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
        setSubmitClicked(false);
        setDateTime(new Date(Date.now()));
        setIsLoading(false);
        return () => {
            setSubmitClicked(false);
            setIsLoading(false);
            setEvent({ ...eventTemplate });
            isScreenActive.current = false;
        }
    }, []));

    if (isLoading)
        return <Loading />
    else
        return (
            <ScrollView style={{ backgroundColor: "white" }}>
                <View style={styles.containter}>
                    <View style={styles.box}>
                        <View style={styles.inner}>
                            <TextInput
                                style={styles.textInputstyling}
                                defaultValue={event.name}
                                placeholder="Enter name of the new event"
                                onChangeText={changeName}
                                editable={!submitClicked}>
                            </TextInput>
                            <TextInput
                                style={styles.textInputstyling}
                                defaultValue={event.venue}
                                placeholder="Enter the venue of the event"
                                onChangeText={changeVenue}
                                editable={!submitClicked}>
                            </TextInput>

                            <TextInput
                                style={styles.textInputstyling}
                                defaultValue={dateTime.toString()}
                                editable={false}>
                            </TextInput>

                            <DateTimePicker dateTime={dateTime} setDateTime={setDateTime} />

                            <TextInput
                                style={styles.textInputstyling}
                                defaultValue={event.description}
                                placeholder="Enter the description of the event"
                                multiline={true}
                                onChangeText={changeDescription}
                                editable={!submitClicked}>
                            </TextInput>
                        </View>
                    </View>
                </View>
                <Button title={"Create Event"} onPress={submit} />

            </ScrollView>


        )
}

