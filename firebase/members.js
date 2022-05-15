import firestore from '@react-native-firebase/firestore';

const UsersCollection = firestore().collection('Users');
const AllUsersListCollection = firestore().collection('AllUsersList');
const TeamsCollection = firestore().collection('Teams');
const TasksCollection = firestore().collection('Tasks');

export const userTemplate = {
    key: '',
    name: 'User',
    email: '',
    secretary: false,
    phone: '',
    branch: '',
    year: '',
    profilePic: '',
    tasks: {},
    teams: {},
    messagingTokens: '',
};

export const userShortTemplate = {
    name: 'User',
    profilePic: '',
    secretary: '',
};

export async function checkUserByEmail(email) {
    const user = await AllUsersListCollection.doc(email).get();
    return user.exists;
}

export async function addMemberByEmail(email) {
    const batch = firestore().batch();
    const ref1 = UsersCollection.doc(email);
    const ref2 = AllUsersListCollection.doc(email);
    batch.set(ref1, { ...userTemplate, email: email, secretary: false });
    batch.set(ref2, { ...userShortTemplate, secretary: false });
    return batch.commit();
}

export async function getUserByEmail(email) {
    const user = await UsersCollection.doc(email).get();
    // No check required as the user will be present if this request is made
    return { ...userTemplate, ...user.data() };
}

export async function deleteUserByEmail(email) {

    const ref1 = UsersCollection.doc(email);
    const ref2 = AllUsersListCollection.doc(email);
    return firestore().runTransaction(async (transaction) => {
        const member = await transaction.get(ref1).then((doc) => { return doc.data() });
        console.log(member);
        const teams = member.teams;
        const tasks = member.tasks;

        for (const teamKey in teams)
            transaction.set(TeamsCollection.doc(teamKey), { members: { [email]: firestore.FieldValue.delete() } }, { merge: true });

        for (const taskKey in tasks)
            transaction.set(TasksCollection.doc(taskKey), { members: { [email]: firestore.FieldValue.delete() } }, { merge: true });
        transaction.delete(ref1);
        transaction.delete(ref2);
    })
}

export async function afterLoginUpdate(email, { name, profilePic, key, token }) {
    // const batch = firestore().batch();
    // const ref1 = UsersCollection.doc(email);
    // const ref2 = AllUsersListCollection.doc(email);
    // batch.update(ref1, { name, email, profilePic, key, messagingTokens: token });
    // batch.update(ref2, { name, profilePic });
    // return batch.commit();

    const ref1 = UsersCollection.doc(email);
    const ref2 = AllUsersListCollection.doc(email);
    return firestore().runTransaction(async (transaction) => {
        const userData = await transaction.get(ref1).then((doc) => { return doc.data() });

        for (const teamKey in userData.teams)
            transaction.set(TeamsCollection.doc(teamKey), { members: { [email]: { name, profilePic } } }, { merge: true });

        for (const taskKey in userData.tasks)
            transaction.set(TasksCollection.doc(taskKey), { members: { [email]: { name, profilePic } } }, { merge: true });

        transaction.update(ref1, { name, email, profilePic, key, messagingTokens: token });
        transaction.update(ref2, { name, profilePic });
    }).then(() => { console.log('After Login Update transaction successfull') });
}
export async function updateUserDetails(email, details) {
    await UsersCollection.doc(email).update(details);
}

export async function getAllUsersShortInfo() {
    return AllUsersListCollection.get().then(snapshot => {
        const users = [];
        snapshot.forEach(doc => {
            users.push({ ...userShortTemplate, ...doc.data(), email: doc.id });
        });
        return users;
    });
}

export async function getUserShortInfoByEmail(email) {
    const user = await AllUsersListCollection.doc(email).get();
    // No check required as the user will be present if this request is made
    return user.data();
}

export async function deleteFirebaseToken(email) {
    await UsersCollection.doc(email).update({ messagingTokens: firestore.FieldValue.delete() });
}