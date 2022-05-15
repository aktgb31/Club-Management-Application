import { createAlumni, deleteAlumniBykey, getAlumniBykey, updateAlumniDetails } from "../firebase/alumni";
import checkBlank from "../components/utils";
class AlumniDetails {
    async createAlumni(alumni) {
        const email = alumni.email;
        const phone = alumni.phone;
        var nameRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        var regex = new RegExp(nameRegex);
        let validation = regex.test(email);
        if (checkBlank(alumni) && phone.length == 10 && validation) {
            return createAlumni(alumni);
        } else {
            throw new Error('Please Fill all Fields, valid email and phone number');
        }
    }
    async getDetails(key) {
        const details = await getAlumniBykey(key);
        return details;
    }
    async updateDetails(key, newDetails) {
        const phone = newDetails.phone;
        const email = newDetails.email;
        var nameRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        var regex = new RegExp(nameRegex);
        let validation = regex.test(email);
        if (checkBlank(newDetails) && phone.length == 10 && validation) {
            return updateAlumniDetails(key, newDetails);
        } else {
            throw new Error('Please Fill all Fields, valid email and phone number');
        }
    }
    async deleteAlumni(key) {
        return deleteAlumniBykey(key);
    }
}

const alumniDetails = new AlumniDetails();
export default alumniDetails;