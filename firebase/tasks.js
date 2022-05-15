import firestore from '@react-native-firebase/firestore';
import { sendNotification } from './notifications';

const UsersCollection = firestore().collection('Users');
const TeamsCollection = firestore().collection('Teams');
const TasksCollection = firestore().collection('Tasks');
const AllTasksListCollection = firestore().collection('AllTasksList');

export const taskTemplate = {
    name: '',
    deadline: '',
    description: '',
    completed: false,
    members: {},
    teams: {}
}

export const taskShortTemplate = {
    name: '',
    deadline: '',
    completed: false,
}

export async function createTask(task) {
    const key = TasksCollection.doc().id;
    const ref1 = TasksCollection.doc(key);
    const ref2 = AllTasksListCollection.doc(key);

    return firestore().runTransaction(async function (transaction) {
        const addedSet = new Set();
        const fetchTeamMembers = [];
        for (const memberKey in task.members) {
            addedSet.add(memberKey);
        }
        for (const teamKey in task.teams) {
            fetchTeamMembers.push(transaction.get(TeamsCollection.doc(teamKey)));
        }

        return Promise.all(fetchTeamMembers).then(function (snapshots) {
            for (const snapshot of snapshots) {
                const team = snapshot.data();
                for (const memberKey in team.members) {
                    addedSet.add(memberKey);
                }
            }
        }).then(function () {
            transaction.set(ref1, { ...taskTemplate, ...task });
            transaction.set(ref2, { ...taskShortTemplate, name: task.name, deadline: task.deadline });
            addedSet.forEach(function (memberKey) {
                transaction.set(UsersCollection.doc(memberKey), { tasks: { [`${key}`]: { ...taskShortTemplate, name: task.name, deadline: task.deadline } } }, { merge: true });
            });
            for (const teamKey in task.teams) {
                transaction.set(TeamsCollection.doc(teamKey), { tasks: { [`${key}`]: { ...taskShortTemplate, name: task.name, deadline: task.deadline } } }, { merge: true });
            }
        }).then(function () {
            const tokens = [];
            addedSet.forEach(function (memberKey) {
                tokens.push(UsersCollection.doc(memberKey).get().then(function (snapshot) { return snapshot.data().messagingTokens; }))
            });
            Promise.all(tokens).then(function (tokens) {
                sendNotification(tokens, "Task Assigned", "You have been assigned a new task");
            });
        });
    })
};

export async function getTask(key) {
    const task = await TasksCollection.doc(key).get();
    return { ...taskTemplate, ...task.data() };
}

export async function updateTask(key, newTask) {
    console.log(newTask);
    const ref1 = TasksCollection.doc(key);
    const ref2 = AllTasksListCollection.doc(key);
    return firestore().runTransaction(async (transaction) => {

        const oldTask = await transaction.get(ref1).then(function (doc) { return doc.data(); });

        console.log(oldTask);
        const members = new Map();
        const teams = new Map();

        const fetchTeamMembers = [];

        for (const memberKey in oldTask.members) {
            if (!newTask.members[memberKey])
                members.set(memberKey, false);
            else
                members.set(memberKey, true);
        }

        for (const teamKey in oldTask.teams) {
            if (!newTask.teams[teamKey])
                teams.set(teamKey, false);
            else
                teams.set(teamKey, true);
        }

        for (const teamKey in newTask.teams) {
            teams.set(teamKey, true);
        }

        for (const teamKey of teams.keys())
            fetchTeamMembers.push(transaction.get(TeamsCollection.doc(teamKey)));

        return Promise.all(fetchTeamMembers).then(function (snapshots) {
            for (const snapshot of snapshots) {
                const team = snapshot.data();
                for (const key in team.members) {
                    if (teams.get(snapshot.id))
                        members.set(key, true);
                    else
                        members.set(key, false);
                }
            }
            for (const memberKey in newTask.members)
                members.set(memberKey, true);
        }).then(function () {
            transaction.update(ref1, newTask);
            transaction.update(ref2, { name: newTask.name, deadline: newTask.deadline, completed: newTask.completed });
            members.forEach(function (value, memberKey) {
                if (value)
                    transaction.set(UsersCollection.doc(memberKey), { tasks: { [`${key}`]: { name: newTask.name, deadline: newTask.deadline, completed: newTask.completed } } }, { merge: true });
                else
                    transaction.set(UsersCollection.doc(memberKey), { tasks: { [`${key}`]: firestore.FieldValue.delete() } }, { merge: true });
            });
            teams.forEach(function (value, teamKey) {
                if (value)
                    transaction.set(TeamsCollection.doc(teamKey), { tasks: { [`${key}`]: { name: newTask.name, deadline: newTask.deadline, completed: newTask.completed } } }, { merge: true });
                else
                    transaction.set(TeamsCollection.doc(teamKey), { tasks: { [`${key}`]: firestore.FieldValue.delete() } }, { merge: true });
            });
        }).then(function () {
            const tokens = [];
            members.forEach(function (value, memberKey) {
                tokens.push(UsersCollection.doc(memberKey).get().then(function (snapshot) { return snapshot.data().messagingTokens; }));
            }
            );
            Promise.all(tokens).then(function (tokens) {
                sendNotification(tokens, "Task Updated", "Your task has been updated");
            });
        });
    })
};


export async function deleteTask(key) {
    const ref1 = TasksCollection.doc(key);
    const ref2 = AllTasksListCollection.doc(key);

    return firestore().runTransaction(async function (transaction) {
        const deletedSet = new Set();
        const fetchTeamMembers = [];

        const task = await transaction.get(ref1).then(function (snapshot) { return snapshot.data(); });
        for (const memberKey in task.members) {
            deletedSet.add(memberKey);
        }
        for (const teamKey in task.teams) {
            fetchTeamMembers.push(transaction.get(TeamsCollection.doc(teamKey)));
        }

        return Promise.all(fetchTeamMembers).then(function (snapshots) {
            for (const snapshot of snapshots) {
                const team = snapshot.data();
                for (const memberKey in team.members) {
                    deletedSet.add(memberKey);
                }
            }
        }).then(function () {
            transaction.delete(ref1);
            transaction.delete(ref2);
            deletedSet.forEach(function (memberKey) {
                transaction.set(UsersCollection.doc(memberKey), { tasks: { [`${key}`]: firestore.FieldValue.delete() } }, { merge: true });
            });
            for (const teamKey in task.teams) {
                transaction.set(TeamsCollection.doc(teamKey), { tasks: { [`${key}`]: firestore.FieldValue.delete() } }, { merge: true });
            }
        }).then(function () {
            const tokens = [];
            deletedSet.forEach(function (memberKey) {
                tokens.push(UsersCollection.doc(memberKey).get().then(function (snapshot) { return snapshot.data().messagingTokens; }));
            });
            Promise.all(tokens).then(function (tokens) {
                sendNotification(tokens, "Task Deleted", "Your task has been deleted");
            });
        });
    })
}

export async function getAllTasksShortInfo() {
    return AllTasksListCollection.get().then(snapshot => {
        const tasks = [];
        snapshot.forEach(doc => {
            tasks.push({ ...taskShortTemplate, ...doc.data(), key: doc.id });
        });
        return tasks;
    });
}