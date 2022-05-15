import React from "react";
import { ScrollView, View } from "react-native";
import Button from "../../components/button";
import { UserContext } from "../../components/userContext";
import ViewEventData from "../../components/viewEventData";
import Loading from "../loading";
import { useFocusEffect } from "@react-navigation/native";
import eventDetails from "../../cache/events";
import CreateAlert from "../../components/alert";
import SuccessMessage from "../../components/successMessage";


export default function ViewEvent({ route, navigation }) {
    const [loading, setLoading] = React.useState(true);
    const { user } = React.useContext(UserContext);
    const { key } = route.params;
    const [eventData, setEventData] = React.useState(null);
    const isScreenActive = React.useRef(true);

    useFocusEffect(
        React.useCallback(() => {
            isScreenActive.current = true;
            eventDetails.getDetails(key).then((event) => {
                if (isScreenActive.current) {
                    setEventData(event);
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


    function updateEvent() {
        navigation.navigate("Update Event", { key: key });
    }

    function deleteEvent() {
        setLoading(true);
        eventDetails.deleteEvent(key).then(() => {
            setLoading(false);
            SuccessMessage("Event Deleted");
            navigation.goBack();
        }).catch((error) => {
            console.log(error.message);
            CreateAlert("Error", "Could not delete event");
        });
    }

    if (loading)
        return (<Loading />);
    else
        return (
            <ScrollView>
                <ViewEventData event={eventData} />
                <View style={{ padding: 10, flexDirection: "row", justifyContent: "space-evenly", width: '94%' }}>
                    {user.secretary && <Button title={'Update'} onPress={updateEvent} />}
                    {user.secretary && <Button title={'Delete'} onPress={deleteEvent} />}
                </View>
            </ScrollView>
        );
};