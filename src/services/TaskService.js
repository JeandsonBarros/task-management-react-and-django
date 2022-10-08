import { getToken } from "./TokenService";
import api from './api'

export async function getTasks(offset=0, search='', bySearch='name') {
    try {

        const response = await api.get(`/task/?limit=10&offset=${offset}&${bySearch}=${search}`,
            {
                headers: {
                    'Authorization': `token ${getToken()}`,
                }
            });

            return response.data

    } catch (error) {
        console.log(error);
    }
}

export async function postTask(task) {
    try {

        const response = await api.post('/task/', task,
            {
                headers: {
                    'Authorization': `token ${getToken()}`,
                }
            });

            return response.data

    } catch (error) {
        console.log(error);
    }
}

export async function putTask(task, id) {
    try {

        const response = await api.put(`/task/${id}/`, task,
            {
                headers: {
                    'Authorization': `token ${getToken()}`,
                }
            });

            return response.data

    } catch (error) {
        console.log(error);
    }
}

export async function deleteTask(id) {
    try {

        const response = await api.delete(`/task/${id}/`,
            {
                headers: {
                    'Authorization': `token ${getToken()}`,
                }
            });

            return response.status

    } catch (error) {
        console.log(error);
    }
}