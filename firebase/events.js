import firestore from '@react-native-firebase/firestore';

const EventsCollection = firestore().collection('Events');
const AllEventsListCollection = firestore().collection('AllEventsList');

export const eventTemplate = {
    name: '',
    description: '',
    venue: '',
    datetime: '',
};

export const eventShortTemplate = {
    name: '',
    datetime: '',
    venue: ''
};

export async function createEvent(event) {
    const key = EventsCollection.doc().id;
    const batch = firestore().batch();
    const ref1 = EventsCollection.doc(key);
    const ref2 = AllEventsListCollection.doc(key);
    batch.set(ref1, { ...eventTemplate, ...event });
    batch.set(ref2, { ...eventShortTemplate, name: event.name, datetime: event.datetime, venue: event.venue });
    return batch.commit();
}

export async function getEventBykey(key) {
    const event = await EventsCollection.doc(key).get();
    // No check required as the user will be present if this request is made
    return { ...eventTemplate, ...event.data() };
}

export async function deleteEventBykey(key) {
    const batch = firestore().batch();
    const ref1 = EventsCollection.doc(key);
    const ref2 = AllEventsListCollection.doc(key);
    batch.delete(ref1);
    batch.delete(ref2);
    return batch.commit();
}

export async function updateEventDetails(key, details) {
    const batch = firestore().batch();
    batch.update(EventsCollection.doc(key), details);
    batch.update(AllEventsListCollection.doc(key), { name: details.name, datetime: details.datetime, venue: details.venue });
    return batch.commit();
}

export async function getAllEventsShortInfo() {
    return AllEventsListCollection.get().then(snapshot => {
        const allEventsShortInfo = [];
        snapshot.forEach(doc => {
            allEventsShortInfo.push({ ...eventShortTemplate, ...doc.data(), key: doc.id });
        });
        return allEventsShortInfo;
    });
}

export async function getEventShortInfoBykey(key) {
    const event = await AllEventsListCollection.doc(key).get();
    // No check required as the user will be present if this request is made
    return event.data();
}

