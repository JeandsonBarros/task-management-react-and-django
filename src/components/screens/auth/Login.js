import { TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import '../screens.css';
import style from '../Screens.module.css';
import { useNavigate } from "react-router-dom";
import { login } from '../../../services/AuthService';
import { BsPersonCircle } from "react-icons/bs";
import { getToken, } from '../../../services/TokenService';

function Login() {

    let navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alertMessage, setAlertMessage] = useState()

    useEffect(() => {
       
        if (getToken())
            return navigate("/");
    })

    async function loginSubmit(event) {
        event.preventDefault();
        const data = await login(email, password);

        if (data === 200)
            return navigate("/");
        else
            setAlertMessage(data)
    }

    return (

        <form onSubmit={loginSubmit} className={style.formLogin}>

            <div className={style.cardLogin}>

                <BsPersonCircle style={{ fontSize: 70, margin: 10 }} />
                <h1 >Login</h1>

                <div className={style.inputContainer}>
                    <TextField
                        className={style.textFieldContainer}
                        onChange={event => {
                            setEmail(event.target.value)
                        }}
                        type='text'
                        label="E-mail"
                        variant="standard" />
                </div>

                <div className={style.inputContainer}>
                    <TextField
                        onChange={event => {
                            setPassword(event.target.value)
                        }}
                        className={style.textFieldContainer}
                        type='password'
                        label="Senha"
                        variant="standard" />
                </div>

                <Button type='submit' sx={{mt:10}} variant="contained" >Entrar</Button>
                <Link className={style.registerLink} to="/registro/">Resgistro</Link>

            </div>

        </form >
    );
}

export default Login;