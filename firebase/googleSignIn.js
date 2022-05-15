import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';

const key = require('../android/app/google-services.json')['client'][0]['oauth_client'][2]['client_id'];
GoogleSignin.configure({ webClientId: key })

module.exports = { GoogleSignin, GoogleSigninButton };
