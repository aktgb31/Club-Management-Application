import React from "react";
import { GoogleSignin, GoogleSigninButton } from '../firebase/googleSignIn';

import { StyleSheet, View, Image } from 'react-native';

import auth from '@react-native-firebase/auth';
import Loading from "./loading";
import { checkUserByEmail } from "../firebase/members";
import CreateAlert from "../components/alert";

export default function Login({ navigation }) {
    const [loading, setLoading] = React.useState(false);

    async function onGoogleButtonPress() {
        // Get the users ID token
        const { idToken, user } = await GoogleSignin.signIn().catch(err => { console.log(err) });
        setLoading(true);
        if (user) {
            const check = await checkUserByEmail(user.email);
            if (check) {
                const googleCredential = auth.GoogleAuthProvider.credential(idToken);
                return auth().signInWithCredential(googleCredential);
            }
            else {
                setLoading(false);
                GoogleSignin.signOut().then((err) => { });
                return CreateAlert('Unauthorised Access', 'Please contact the club-secretary to get access to the app.');
            }
        }
        else {
            setLoading(false);
            CreateAlert('Unable to sign-in', 'Please check your internet connection and try again.');
        }
    }

    if (loading)
        return (<Loading />);
    else
        return (
            <View style={styles.container}>
                <Image source={require('../assets/logo.png')} style={styles.buttonView} />
                <GoogleSigninButton
                    style={{ width: 220, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => { onGoogleButtonPress().then(() => { console.log('Signed in with Google!') }).catch(err => console.log(err.message)) }}
                />
            </View>
        )

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '90%',
    },
    buttonView: {
        width: 300,
        height: 300,
    },
});