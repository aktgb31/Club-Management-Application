import { createTeam, deleteTeam, getTeam, updateTeam } from "../firebase/teams";
import checkBlank from "../components/utils";
import CreateAlert from "../components/alert";
class Teams {
    async getTeam(key) {
        return getTeam(key);
    }
    async createTeam(team) {
        const length = Object.keys(team).length;
        const memberslength = Object.keys(team.members).length;
        console.log(team);
        const description =team.description
        const name =team.name
        if (description && name && length == 4 && memberslength > 0) {
            return createTeam(team);
        } else {
            throw new Error('Please Fill all Fields');
        }

    }
    async updateTeam(key, team) {
        const length = Object.keys(team.members).length;
        const name=team.name;
        const description =team.description
        if (checkBlank(team) && name && description && length > 0) {
            return updateTeam(key, team);
        } else {
            throw new Error('Please Fill all Fields');
        }

    }
    async deleteTeam(key) {
        return deleteTeam(key);
    }
}

const teams = new Teams();
export default teams;