import React from 'react';
import auth from '@react-native-firebase/auth';
import Loading from '../screens/loading';
import { afterLoginUpdate, checkUserByEmail, getUserShortInfoByEmail } from '../firebase/members';
import CreateAlert from './alert';
import messaging from '@react-native-firebase/messaging';

const initialState = {
    isLoggedIn: false,
    user: null,
};
export const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
    const [initialising, setInitialising] = React.useState(true);
    const [user, setUser] = React.useState(initialState);

    React.useEffect(() => {
        const subscriber = auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('User is signed in: ', user.email);
                // Fetching and saving short data of current user
                checkUserByEmail(user.email).then((res) => {
                    if (!res)
                        throw new Error('User not found');
                    else
                        return user.email;
                }).then(getUserShortInfoByEmail).then(async (userDetails) => {
                    const token = await messaging().getToken();
                    await afterLoginUpdate(user.email, { name: user.displayName, profilePic: user.photoURL, key: user.uid, token: token }),
                        loggedIn({ ...userDetails, email: user.email, name: user.displayName, profilePic: user.photoURL });
                }).catch((error) => {
                    console.log(error.message);
                    auth().signOut().then(() => {
                        CreateAlert('Unauthorised Access', 'Please contact the club-secretary to get access to the app.');
                    });
                });
            }
            else { loggedOut(); }
        });
        return subscriber;
    }, [])

    function loggedIn(newUser) {
        setUser((previousValue) => { return { ...previousValue, user: newUser, isLoggedIn: true }; });
        setInitialising(false);
    }
    function loggedOut() {
        setUser({ ...initialState });
        setInitialising(false);
    }

    if (initialising)
        return (<Loading />);
    else
        return (
            < UserContext.Provider value={{ ...user, loggedIn, loggedOut }}>
                {children}
            </UserContext.Provider >
        )
}