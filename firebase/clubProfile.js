import firestore from '@react-native-firebase/firestore';

const clubProfileCollection = firestore().collection('ClubProfile');

export const clubTemplate = {
    name: '',
    secretary: '',
    description: '',
};


export async function getclubDetailsByKey(key) {
    const clubProfile = await clubProfileCollection.doc(key).get();
    // No check required as the user will be present if this request is made
    return { ...clubTemplate, ...clubProfile.data() };
}

export async function updateClubDetails(key, description) {
    await clubProfileCollection.doc(key).update({ description: description });
}

