import 'react-native-gesture-handler';// For drawer navigation
import React from "react";
import messaging from '@react-native-firebase/messaging';
import Navigator from './routes/drawer';
import { UserContextProvider } from './components/userContext';

messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

function App() {
    return (<UserContextProvider><Navigator /></UserContextProvider>)
}

export default App;
