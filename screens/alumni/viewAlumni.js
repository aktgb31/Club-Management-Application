import React from "react";
import { ScrollView, View, Text } from "react-native";
import Button from "../../components/button";
import { UserContext } from "../../components/userContext";
import ViewAlumniData from "../../components/viewAlumniData";
import Loading from "../loading";
import { useFocusEffect } from "@react-navigation/native";
import alumniDetails from "../../cache/alumni";


export default function ViewAlumni({ route, navigation }) {
    const [loading, setLoading] = React.useState(true);
    const { user } = React.useContext(UserContext);
    const { key } = route.params;
    const [alumniData, setAlumniData] = React.useState(null);

    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            alumniDetails.getDetails(key).then((alumni) => {
                setAlumniData(alumni);
                setLoading(false);
            }).catch(err => {
                console.log(err.message);
            });
            return () => { setLoading(true); }
        }, []));



    if (loading)
        return (<Loading />);
    else
        return (
            <ScrollView>
                <ViewAlumniData alumni={alumniData} />
                <View style={{ padding: 10, flexDirection: "row", justifyContent: "space-evenly", width: '94%' }}>
                    {user.secretary && <Button title={'Update'} onPress={() => { navigation.navigate('Update Alumni', { key: key }) }} />}
                    {user.secretary && <Button title={'Delete'} onPress={() => { alumniDetails.deleteAlumni(key).then(() => { navigation.goBack(); }) }} />}
                </View>
            </ScrollView>
        );
};