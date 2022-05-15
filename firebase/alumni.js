import firestore from '@react-native-firebase/firestore';

const AlumniCollection = firestore().collection('Alumni');
const AllAlumniListCollection = firestore().collection('AllAlumniList');

export const alumniTemplate = {
    name: '',
    email: '',
    batch: '',
    branch: '',
    linkedin: '',
    currentcompany: '',
    phone: '',
};

export const alumniShortTemplate = {
    name: '',
    currentcompany: ''
};

export async function createAlumni(alumni) {
    console.log(alumni);
    const key = AlumniCollection.doc().id;
    const batch = firestore().batch();
    const ref1 = AlumniCollection.doc(key);
    const ref2 = AllAlumniListCollection.doc(key);
    batch.set(ref1, { ...alumniTemplate, ...alumni });
    batch.set(ref2, { ...alumniShortTemplate, name: alumni.name, currentcompany: alumni.currentcompany });
    return batch.commit();
}

export async function getAlumniBykey(key) {
    const alumni = await AlumniCollection.doc(key).get();
    return { ...alumniTemplate, ...alumni.data() };
}

export async function deleteAlumniBykey(key) {
    const batch = firestore().batch();
    const ref1 = AlumniCollection.doc(key);
    const ref2 = AllAlumniListCollection.doc(key);
    batch.delete(ref1);
    batch.delete(ref2);
    return batch.commit();
}

export async function updateAlumniDetails(key, details) {
    const batch = firestore().batch();
    AlumniCollection.doc(key).update(details);
    AllAlumniListCollection.doc(key).update({ name: details.name, currentcompany: details.currentcompany });
    return batch.commit();
}

export async function getAllAlumniShortInfo() {
    return AllAlumniListCollection.get().then(snapshot => {
        const allAlumniShortInfo = [];
        snapshot.forEach(doc => {
            allAlumniShortInfo.push({ ...alumniShortTemplate, ...doc.data(), key: doc.id });
        });
        return allAlumniShortInfo;
    });
}

export async function getAlumniShortInfoBykey(key) {
    const alumni = await AllAlumniListCollection.doc(key).get();
    // No check required as the user will be present if this request is made
    return alumni.data();
}

