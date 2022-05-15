import { createEvent, checkUserByEmail, deleteEventBykey, deleteUserByEmail, getEventBykey, getEventShortInfoByEmail, updateEventDetails } from "../firebase/events";
import CreateAlert from "../components/alert";
import checkBlank from "../components/utils";

class EventDetails {
    async createEvent(event) {
        const description = event.description;
        const name = event.name;
        const venue = event.venue;
        if (name && description && venue && checkBlank(event)) {
            return createEvent(event);
        } else {
            throw new Error('Please Fill all Fields');
        }
    }
    async getDetails(key) {
        const details = await getEventBykey(key);
        return details;
    }
    async updateDetails(key, newDetails) {
        const description = newDetails.description;
        const name = newDetails.name;
        const venue = newDetails.venue;
        if (name && description && venue && checkBlank(newDetails)) {
            return updateEventDetails(key, newDetails);
        } else {
            throw new Error('Please Fill all Fields');
        }

    }
    async deleteEvent(key) {
        return deleteEventBykey(key);
    }
}

const eventDetails = new EventDetails();
export default eventDetails;