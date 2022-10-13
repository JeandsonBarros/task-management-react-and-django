import { useState, useEffect } from 'react';
import { updateUser, getUser, deleteUser } from '../../../services/AuthService'
import { useNavigate } from 'react-router-dom';
import {
    Button,
    TextField,
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
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


    useEffect(() => {
        getUser().then(data => setUser(data))
    }, [])

    async function userEdit(event) {
        event.preventDefault()

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
    }

    function setUserValue(key, value) {

        let userTemp = user
        user[key] = value
        setUser({...userTemp})

    }

    async function passwordUpdate(event) {
        event.preventDefault()

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

    }

    async function deleteAccount() {
        console.log('deletar');
        const data = await deleteUser()

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