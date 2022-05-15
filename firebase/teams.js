import firestore from '@react-native-firebase/firestore';

const UsersCollection = firestore().collection('Users');
const TeamsCollection = firestore().collection('Teams');
const AllTeamsListCollection = firestore().collection('AllTeamsList');
const TasksCollection = firestore().collection('Tasks');

export const teamTemplate = {
    name: '',
    description: '',
    members: {},
    tasks: {}
}

export const teamShortTemplate = {
    name: '',
}

export async function createTeam(team) {
    const key = TeamsCollection.doc().id;
    const batch = firestore().batch();
    const ref1 = TeamsCollection.doc(key);
    const ref2 = AllTeamsListCollection.doc(key);
    batch.set(ref1, { ...teamTemplate, ...team });
    batch.set(ref2, { ...teamShortTemplate, name: team.name });
    for (const memberKey in team.members)
        batch.set(UsersCollection.doc(memberKey), { teams: { [key]: { ...teamShortTemplate, name: team.name } } }, { merge: true });

    return batch.commit();
}

export async function getTeam(key) {
    const team = await TeamsCollection.doc(key).get();
    return { ...teamTemplate, ...team.data() };
}

export async function updateTeam(key, newTeam) {
    const ref1 = TeamsCollection.doc(key);
    const ref2 = AllTeamsListCollection.doc(key);
    return firestore().runTransaction(async (transaction) => {

        const oldTeam = await transaction.get(ref1).then(doc => doc.data());
        const tasks = oldTeam.tasks;
        for (const memberKey in oldTeam.members)
            if (!newTeam.members[memberKey])
                transaction.set(UsersCollection.doc(memberKey), { teams: { [key]: firestore.FieldValue.delete() } }, { merge: true });

        for (const memberKey in newTeam.members)
            transaction.set(UsersCollection.doc(memberKey), { teams: { [key]: { name: newTeam.name } } }, { merge: true });

        for (const taskKey in tasks)
            transaction.set(TasksCollection.doc(taskKey), { tasks: { [key]: { name: newTeam.name } } }, { merge: true });

        transaction.update(ref1, { ...newTeam });
        transaction.update(ref2, { name: newTeam.name });
    });

}
export async function deleteTeam(key) {
    const ref1 = TeamsCollection.doc(key);
    const ref2 = AllTeamsListCollection.doc(key);
    return firestore().runTransaction(async (transaction) => {
        const team = await transaction.get(ref1).then(doc => doc.data());
        const tasks = team.tasks;
        for (const memberKey in team.members)
            transaction.set(UsersCollection.doc(memberKey), { teams: { [key]: firestore.FieldValue.delete() } }, { merge: true });

        for (const taskKey in tasks)
            transaction.set(TasksCollection.doc(taskKey), { teams: { [key]: firestore.FieldValue.delete() } }, { merge: true });

        transaction.delete(ref1);
        transaction.delete(ref2);
    });
}

export async function getAllTeamsShortInfo() {
    return AllTeamsListCollection.get().then(snapshot => {
        const teams = [];
        snapshot.forEach(doc => {
            teams.push({ ...teamShortTemplate, ...doc.data(), key: doc.id });
        });
        return teams;
    });
}