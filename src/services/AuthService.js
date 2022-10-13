import { setToken, getToken, removeToken } from "./TokenService";
import api from './api'

export async function login(username, password) {
    try {
        const response = await api.post('/auth/login/', { username, password })

        if (response.status === 200) {
            setToken(response.data.token)
            return 200
        } else {
            return "Check that the credentials are correct."
        }

    } catch (error) {
        console.log(error);
        return "Error logging in, check that the credentials are correct."
    }
}

export async function register(user) {
    try {

        const response = await api.post('/auth/register/', user)

        if (response.status === 201) {
            const status = await login(user.username, user.password)
            return status === 200 ? 201 : status
        } else {
            return 'Error registering'
        }

    } catch (error) {

        if (error.response.data.email)
            return 'Email must be unique.'

        else if (error.response.data.username)
            return error.response.data.username

        return 'Error registering'
    }
}

export async function updateUser(user) {
    try {

        await api.patch('/auth/update/', user,
            {
                headers: {
                    'Authorization': `token ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

        return 'success'

    } catch (error) {

        if (error.response.data.email)
            return 'Email must be unique.'

        else if (error.response.data.username)
            return error.response.data.username

        else if (error.response.data.password)
            return error.response.data.password

        return 'Update error'
    }
}

export async function getUser() {
    try {

        const response = await api.get("/auth/user/",
            {
                headers: {
                    'Authorization': `token ${getToken()}`,
                }
            })

        return response.data
    } catch (error) {
        console.log(error);
        return { username: 'unavailable', email: 'unavailable' }
    }
}

export async function deleteUser() {
    try {

        const response = await api.delete("/auth/delete/",
            {
                headers: {
                    'Authorization': `token ${getToken()}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
        logout()
        return response.status
    } catch (error) {
        console.log(error);
        return error.status
    }
}

export function logout() {
    removeToken()
}