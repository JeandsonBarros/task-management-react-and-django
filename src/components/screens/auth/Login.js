import { Alert, Button, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';

import { login } from '../../../services/AuthService';
import { getToken } from '../../../services/TokenService';
import PasswordField from '../../layouts/PasswordField';
import style from './Auth.module.css';

function Login() {

    let navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alertMessage, setAlertMessage] = useState()
    const [progress, setProgress] = useState(false)

    useEffect(() => {

        if (getToken())
            return navigate("/");
    })

    async function loginSubmit(event) {
        event.preventDefault();

        setProgress(true)

        const data = await login(email, password);

        if (data === 200)
            return navigate("/");
        else
            setAlertMessage(data)

        setProgress(false)
    }

    return (

        <form onSubmit={loginSubmit} className={style.formLogin}>

            <div className={style.cardLogin}>

                <BsPersonCircle style={{ fontSize: 70, margin: 10 }} />
                <h1 >Login</h1>

                {alertMessage &&
                    <Alert sx={{ mt: 1, padding: 1 }} severity='error'>

                        {alertMessage}

                    </Alert>
                }

                <TextField
                    id='email'
                    sx={{ mb: 3, mt: 3 }}
                    className={style.textFieldContainer}
                    onChange={event => setEmail(event.target.value)}
                    type='text'
                    label="E-mail or Username"
                    variant="standard" />

                <PasswordField
                    id='password'
                    label='Password'
                    value={password}
                    setValue={setPassword}
                />

                {progress && <CircularProgress sx={{ mt: 2 }} />}

                <Button type='submit' sx={{ mt: 5 }} variant="contained" >Login</Button>
                <Link className={style.registerLink} to="/register/">Sign up</Link>

            </div>

        </form >
    );
}

export default Login;