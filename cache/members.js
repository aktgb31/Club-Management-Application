import { addMemberByEmail, checkUserByEmail, deleteUserByEmail, getUserByEmail, updateUserDetails } from "../firebase/members";

class MemberDetails {

    async addMember(email) {
        var nameRegex = '[a-z0-9._%+-]+@nitc.ac.in$';
        var regex = new RegExp(nameRegex);
        let validation = regex.test(email);
        console.log(validation);
        if (validation) {
            console.log('Email pattern correct');
            return checkUserByEmail(email).then((res) => {
                if (res)
                    throw new Error("User already exists");
                else
                    addMemberByEmail(email);
            });
        } else {
            throw new Error("Enter Nitc Email");
        }
    }
    async getDetails(email) {
        const details = await getUserByEmail(email);
        return details;
    }
    async updateDetails(email, newDetails) {
        const phone = newDetails.phone;
        const batch = newDetails.branch;
        const year = newDetails.year;
        var nameRegex = '[0-9]$';
        var regex = new RegExp(nameRegex);
        let validationPhone = regex.test(phone);
        let validationYear = regex.test(year);
        if ((phone.length === 10) && validationPhone && validationYear && batch && year) {
            return updateUserDetails(email, newDetails);
        } else {
            throw new Error("Please Fill all the fields, Make Sure to add only 10 digit in Phone and only digits in Year");
        }
    }
    async deleteMember(email) {
        return deleteUserByEmail(email);
    }
}

const memberDetails = new MemberDetails();
export default memberDetails;