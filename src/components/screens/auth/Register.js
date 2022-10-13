import { Alert, Button, CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';

import { register } from '../../../services/AuthService';
import PasswordField from '../../layouts/PasswordField';
import styles from './Auth.module.css';

function Register() {

    const navigate = useNavigate()
    const [alertMessage, setAlertMessage] = useState()
    const [user, setUser] = useState({})

    const [passwordConfirmAlert, setPasswordConfirmAlert] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [passwordLengthAlert, setPasswordLengthAlert] = useState(false)

    const [progress, setProgress] = useState(false)

    function setUserValue(key, value) {

        let userTemp = user
        user[key] = value
        setUser(userTemp)

    }

    async function registerSubmit(event) {
        event.preventDefault()

        setProgress(true)

        const keys = ['username', 'email', 'first_name', 'last_name', 'password']

        const checks = keys.find(key => {
            return !user[key]
        })

        if (checks)
            return setAlertMessage("Don't leave empty fields")

        if (user.password.length <= 8)
            return setPasswordLengthAlert(true)

        if (user.password !== passwordConfirm)
            return setPasswordConfirmAlert('Password does not match')

        const data = await register(user)

        if (data === 201)
            navigate('/')
        else
            setAlertMessage(data)

        setProgress(false)
    }

    return (
        <section className={styles.containerRegister}>

            <form onSubmit={registerSubmit} className={styles.formUser} >

                <BsPersonCircle style={{ fontSize: 70, margin: 10 }} />

                <h1>Registration</h1>

                {alertMessage &&
                    <Alert sx={{ mt: 1, padding: 1 }} severity='error'>

                        {alertMessage}

                    </Alert>
                }

                <div className={styles.inputs} >

                    <div>
                        <TextField
                            fullWidth
                            type='text'
                            label="Username"
                            variant="standard"
                            onChange={event => setUserValue('username', event.target.value)} />
                    </div>

                    <div>
                        <TextField
                            fullWidth
                            type='email'
                            label="E-mail"
                            variant="standard"
                            onChange={event => setUserValue('email', event.target.value)} />
                    </div>

                    <div>
                        <TextField
                            fullWidth
                            type='text'
                            label="First name"
                            variant="standard"
                            onChange={event => setUserValue('first_name', event.target.value)} />
                    </div>

                    <div>
                        <TextField
                            fullWidth
                            type='text'
                            label="Last name"
                            variant="standard"
                            onChange={event => setUserValue('last_name', event.target.value)} />
                    </div>

                    <div>
                        <PasswordField
                            error={passwordLengthAlert}
                            label="Password"
                            relp="Password must be 8 characters or more"
                            setValue={(text) => {
                                setUserValue('password', text)
                            }}
                        />
                    </div>

                    <div>
                        <PasswordField
                            error={passwordConfirmAlert ? true : false}
                            label="Confirm password"
                            relp={passwordConfirmAlert}
                            value={passwordConfirm}
                            setValue={setPasswordConfirm}
                        />
                    </div>

                </div>

                {progress && <CircularProgress />}

                <Button style={{ marginTop: 20 }} type='submit' variant="contained" >Sign up</Button>
                <Link className={styles.registerLink} to="/login/">Login</Link>

            </form>


        </section >);
}

export default Register;