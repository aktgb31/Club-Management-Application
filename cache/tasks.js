import { createTask, deleteTask, getTask, updateTask } from "../firebase/tasks";
import checkBlank from "../components/utils";

class Tasks {
    async getTask(key) {
        return getTask(key);
    }
    async createTask(team) {
        const deadline=team.deadline;
        const description=team.description;
        const name=team.name;
        if( description && name ){
            return createTask(team);
        }
        else {
            throw new Error('Please Fill all Fields');
        }
    }
    async updateTask(key, team) {
        const deadline=team.deadline;
        const description=team.description;
        const name=team.name;
        if( description && name ){
            return updateTask(key, team);
        }
        else{
            throw new Error('Please Fill all Fields');
        }
    }
    async deleteTask(key) {
        return deleteTask(key);
    }
}

const tasks = new Tasks();
export default tasks;
