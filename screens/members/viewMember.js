import React from "react";
import { ScrollView } from "react-native";
import Button from "../../components/button";
import { UserContext } from "../../components/userContext";
import ViewUserData from "../../components/viewUserData";
import Loading from "../loading";
import { useFocusEffect } from "@react-navigation/native";
import memberDetails from "../../cache/members";
import SuccessMessage from "../../components/successMessage";


export default function ViewMember({ route, navigation }) {
    const [loading, setLoading] = React.useState(true);
    const currentUser = React.useContext(UserContext).user;
    const { email } = route.params;
    const [userData, setUserData] = React.useState(null);

    function deleteUser() {
        setLoading(true);
        memberDetails.deleteMember(email).then(() => {
            setLoading(false);
            SuccessMessage("Club Member deleted");
            navigation.goBack();
        }).catch((error) => {
            console.log(error.message);
        });
    }
    useFocusEffect(
        React.useCallback(() => {
            setLoading(true);
            memberDetails.getDetails(email).then((user) => {
                // .replace('=s96-c','=s480-c')
                let profileUrl = user.profilePic.replace('=s96-c', '=s480-c');
                // console.log(profileUrl);
                setUserData({ ...user, profilePic: profileUrl, teams: Object.entries(user.teams), tasks: Object.entries(user.tasks) });
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
                <ViewUserData user={userData} />
                {currentUser.secretary && currentUser.email != email && <Button title={'Delete'} onPress={deleteUser} />}
            </ScrollView>
        );
};