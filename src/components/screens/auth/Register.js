import { TextField, Button, Card } from '@mui/material';
import styles from '../Screens.module.css';
import { Link } from 'react-router-dom'
import { BsPersonCircle } from "react-icons/bs";
import { useState } from 'react';

function Register() {

    const [alertMessage, setAlertMessage] = useState()
    const [user, setUser] = useState({})
    const [passwordConfirmAlert, setPasswordConfirmAlert] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    return (
        <section className={styles.containerRegister}>

            <form className={styles.formRegister} >

                <BsPersonCircle style={{ fontSize: 70, margin: 10 }} />
                <h1>Cadastro</h1>

                <div className={styles.inputs} >

                    <div className={styles.inputContainer} >
                        <TextField
                            type='text'
                            label="Nome de usuário"
                            variant="standard" />
                    </div>

                    <div className={styles.inputContainer} >
                        <TextField
                            type='email'
                            label="E-mail"
                            variant="standard" />
                    </div>

                    <div className={styles.inputContainer} >
                        <TextField
                            type='text'
                            label="Nome"
                            variant="standard" />
                    </div>

                    <div className={styles.inputContainer} >
                        <TextField
                            type='email'
                            label="Sobrenome"
                            variant="standard" />
                    </div>

                    <div className={styles.inputContainer} >
                        <TextField
                            type='password'
                            label="Senha"
                            variant="standard" />
                    </div>

                    <div className={styles.inputContainer} >
                        <TextField
                            type='password'
                            label="Confirmar senha"
                            variant="standard" />
                    </div>

                </div>

                <Button style={{marginTop: 20}} variant="contained" >Cadastrar-se</Button>
                <Link className={styles.registerLink} to="/login/">Login</Link>

            </form>


        </section>);
}

export default Register;