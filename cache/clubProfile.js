import { getclubDetailsByKey, updateClubDetails } from "../firebase/clubProfile";
import CreateAlert from "../components/alert";
class ClubDetails {

    async getDetails(key) {
        const details = await getclubDetailsByKey(key);
        return details;
    }
    async updateClubDetails(key, newDetails) {
        if (newDetails)
            return updateClubDetails(key, newDetails);
        else {
            throw new Error('Please Fill all Fields');
        }
    }
}

const clubDetails = new ClubDetails();
export default clubDetails;