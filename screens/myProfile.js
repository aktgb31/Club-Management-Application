import React from "react";
import { ScrollView,View } from "react-native";
import Button from "../components/button";
import { UserContext } from "../components/userContext";
import ViewUserData from "../components/viewUserData";
import Loading from "./loading";
import { useFocusEffect } from "@react-navigation/native";
import memberDetails from "../cache/members";

export default function MyProfile({ navigation }) {
    const [loading, setLoading] = React.useState(true);
    const { user } = React.useContext(UserContext);
    const [userData, setUserData] = React.useState(null);
    const isScreenActive = React.useRef(true);

    useFocusEffect(
        React.useCallback(() => {
            isScreenActive.current = true;
            memberDetails.getDetails(user.email).then((data) => {
                if (isScreenActive.current) {
                    console.log(data);
                    // .replace('=s96-c','=s480-c')
                    let profileUrl = data.profilePic.replace('=s96-c', '=s480-c');
                    // console.log(profileUrl);
                    setUserData({ ...data, profilePic: profileUrl, teams: Object.entries(data.teams), tasks: Object.entries(data.tasks) });
                    setLoading(false);
                }
            }).catch((err) => { console.log(err) });
            return () => { isScreenActive.current = false; setLoading(true); }
        }, []));
    if (loading)
        return (<Loading />);
    else
        return (
            <View style={{flex:1}}>
                <ScrollView>
                    <ViewUserData user={userData} />
                </ScrollView>
                <View>
                    <Button title={'Update'} onPress={() => { navigation.navigate('Update Profile') }} />
                </View>
            </View>
        )
}