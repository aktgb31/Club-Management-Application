import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import EventNavigator from './eventStack';
import Login from '../screens/login';
import LogOut from "../screens/logOut";
import { UserContext } from "../components/userContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileNavigator from "./profileStack";
import MemberNavigator from "./memberStack";
import ClubProfileNavigator from "./clubStack";
import AlumniNavigator from "./alumniStack";
import TeamNavigator from "./teamStack";
import TaskNavigator from "./taskStack";
import getHeaderTitle from "../components/header";
import messaging from '@react-native-firebase/messaging';
import SuccessMessage from "../components/successMessage";
import HomeNavigator from "./homeStack";

export default function Navigator() {
    const { isLoggedIn } = React.useContext(UserContext);
    const [Navigator, setNavigator] = React.useState(createNativeStackNavigator());

    React.useLayoutEffect(() => {
        if (isLoggedIn)
            setNavigator(createDrawerNavigator());
        else
            setNavigator(createNativeStackNavigator());

    }, [isLoggedIn]);
    React.useEffect(() => {

        messaging().onNotificationOpenedApp(async (remoteMessage) => {
            SuccessMessage(remoteMessage.notification.body);
        });
        messaging().getInitialNotification().then(async (remoteMessage) => {
            if (remoteMessage)
                SuccessMessage(remoteMessage.notification.body);
        });

        const subscriber = messaging().onMessage(async (remoteMessage) => {
            SuccessMessage(remoteMessage.notification.body);
        });
        return subscriber;

    }, []);


    return (
        <NavigationContainer>
            < Navigator.Navigator screenOptions={({ route }) => ({ headerTitle: getHeaderTitle(route) })}>
                {isLoggedIn ? (
                    <Navigator.Group>
                        <Navigator.Screen name="Home" component={HomeNavigator} options={{ title: 'Home' }} />
                        <Navigator.Screen name="Profile" component={ProfileNavigator} options={{ title: 'My Profile' }} />
                        <Navigator.Screen name="Members" component={MemberNavigator} options={{ title: 'Members' }} />
                        <Navigator.Screen name="Events" component={EventNavigator} options={{ title: 'Events' }} />
                        <Navigator.Screen name="Teams" component={TeamNavigator} options={{ title: 'Teams' }} />
                        <Navigator.Screen name="Tasks" component={TaskNavigator} options={{ title: 'Tasks' }} />
                        <Navigator.Screen name="Alumni" component={AlumniNavigator} options={{ title: 'Alumni' }} />
                        <Navigator.Screen name="Club Details" component={ClubProfileNavigator} options={{ title: 'Club Profile' }} />
                        <Navigator.Screen name="Log Out" component={LogOut} options={{ title: 'Log Out' }} />
                    </Navigator.Group>
                ) : (
                    <Navigator.Group>
                        <Navigator.Screen name="Login" component={Login} options={{ title: 'Log In', headerTitleAlign: 'center' }} />
                    </Navigator.Group>
                )}
            </Navigator.Navigator>

        </NavigationContainer >
    )
}