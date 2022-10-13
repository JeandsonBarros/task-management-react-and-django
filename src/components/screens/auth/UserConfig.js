import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    LinearProgress,
    TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteUser, getUser, updateUser } from '../../../services/AuthService';
import PasswordField from '../../layouts/PasswordField';
import styles from './Auth.module.css';

function UserConfig() {

    const navigate = useNavigate()

    const [alertMessage, setAlertMessage] = useState()

    const [user, setUser] = useState()

    const [passwordConfirmAlert, setPasswordConfirmAlert] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [password, setPassword] = useState('')

    const [confirmModalVisible, setConfirmModalVisible] = useState(false)

    const [progress, setProgress] = useState(false)

    useEffect(() => {
        getDataUser()
    }, [])

    async function getDataUser() {
        setProgress(true)

        const userData = await getUser()
        setUser(userData)

        setProgress(false)
    }

    async function userEdit(event) {
        event.preventDefault()

        setProgress(true)

        const keys = ['username', 'email', 'first_name', 'last_name']

        const checks = keys.find(key => {
            return !user[key]
        })

        if (checks)
            return setAlertMessage({ text: "Don't leave empty fields!", status: 'error' })

        const data = await updateUser(user)

        if (data === 'success')
            setAlertMessage({ text: "Data successfully updated!", status: 'success' })
        else
            setAlertMessage({ text: data, status: 'error' })

        setProgress(false)
    }

    function setUserValue(key, value) {

        let userTemp = user
        user[key] = value
        setUser({ ...userTemp })

    }

    async function passwordUpdate(event) {
        event.preventDefault()

        setProgress(true)

        if (!password || !passwordConfirm) {
            return setPasswordConfirmAlert({ text: "Don't leave empty fields!", status: 'error' })
        }

        if (password !== passwordConfirm) {
            return setPasswordConfirmAlert({ text: 'Passwords do not match', status: 'error' })
        }

        const data = await updateUser({ password })

        if (data === 'success')
            setPasswordConfirmAlert({ text: "Password updated successfully!", status: 'success' })
        else
            setPasswordConfirmAlert({ text: data, status: 'error' })

        setProgress(false)

    }

    async function deleteAccount() {
        setProgress(true)

        const data = await deleteUser()

        setProgress(false)

        if (data === 204)
            navigate('/login/')
        else
            setAlertMessage({ text: "Erro ao deletar conta!", status: 500 })

    }

    function formUser() {
        if (user) {
            return (
                <form onSubmit={userEdit} className={styles.formUser}>

                    {alertMessage &&

                        <Alert
                            sx={{ mt: 1, padding: 1 }}
                            severity={alertMessage.status === 'success' ? 'success' : 'error'}>

                            {alertMessage.text}

                        </Alert>

                    }

                    <h1>Account details</h1>

                    <div className={styles.inputs}>

                        <div>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Username"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={user.username}
                                onChange={event => setUserValue('username', event.target.value)}
                            />
                        </div>

                        <div>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="E-mail"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={user.email}
                                onChange={event => setUserValue('email', event.target.value)}
                            />
                        </div>

                        <div>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="First name"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={user.first_name}
                                onChange={event => setUserValue('first_name', event.target.value)}
                            />
                        </div>

                        <div>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Last name"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={user.last_name}
                                onChange={event => setUserValue('last_name', event.target.value)}
                            />
                        </div>

                    </div>

                    <Button type="submit" css={{ margin: '25px auto', width: 20 }} variant="contained">
                        Update
                    </Button>

                </form>
            )
        }

        return <></>

    }

    return (
        <section className={styles.containerRegister}>

            {progress && <LinearProgress sx={{ width: '100%' }} />}

            {formUser()}

            <div>

                <form onSubmit={passwordUpdate} className={styles.formUser}>

                    {passwordConfirmAlert &&
                        <Alert
                            sx={{ mt: 1, padding: 1 }}
                            severity={passwordConfirmAlert.status === 'success' ? 'success' : 'error'}>

                            {passwordConfirmAlert.text}

                        </Alert>
                    }

                    <h3>Password update</h3>

                    <div className={styles.inputs}>

                        <PasswordField
                            label='Password'
                            value={password}
                            setValue={setPassword}
                        />

                        <p></p>

                        <PasswordField
                            label='Confirma password'
                            value={passwordConfirm}
                            setValue={setPasswordConfirm}
                        />

                    </div>

                    <Button type="submit" css={{ margin: '25px auto' }} variant="contained">
                        Update
                    </Button>

                </form>

            </div>

            <div className={styles.formUser}>

                <h3> Delete account: </h3>

                <Button
                    variant="contained"
                    onClick={() => setConfirmModalVisible(true)}
                    color="error"
                >
                    Delete
                </Button>

                <Dialog
                    open={confirmModalVisible}
                    onClose={() => setConfirmModalVisible(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Delete account
                    </DialogTitle>

                    <DialogContent>

                        <DialogContentText id="alert-dialog-description">
                            when you delete this account all data will be permanently deleted, do you really want to delete it?
                        </DialogContentText>

                    </DialogContent>

                    <DialogActions>

                        <Button variant="contained" onClick={() => setConfirmModalVisible(false)}>Cancel</Button>

                        <Button variant="contained" onClick={deleteAccount} color='error' autoFocus>
                            Delete
                        </Button>

                    </DialogActions>

                </Dialog>

            </div>

        </section>
    );
}

export default UserConfig;