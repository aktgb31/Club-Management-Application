import React from "react";
import auth from '@react-native-firebase/auth';
import Loading from "./loading";
import messaging from '@react-native-firebase/messaging';
import { GoogleSignin } from "../firebase/googleSignIn";
import { deleteFirebaseToken } from "../firebase/members";
import { UserContext } from "../components/userContext";

export default function LogOut() {
    const { user } = React.useContext(UserContext);
    React.useEffect(() => {
        Promise.all([auth().signOut(), GoogleSignin.signOut(), deleteFirebaseToken(user.email)]).then(() => {
            console.log('Logged Out');
        }).catch((err) => {
            console.log('Error in logging out', err.message);
        })
    }, []);

    return (<Loading />);

}