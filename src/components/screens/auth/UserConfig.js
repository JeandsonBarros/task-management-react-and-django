import { useState, useEffect } from 'react';
import { updateUser, getUser, deleteUser } from '../../../services/AuthService'
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Card, Accordion } from '@mui/material';

function UserConfig() {

    const navigate = useNavigate()
    const [confirmModalVisible, setConfirmModalVisible] = useState(false)

    const [alertMessage, setAlertMessage] = useState()

    const [user, setUser] = useState()

    const [passwordConfirmAlert, setPasswordConfirmAlert] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [password, setPassword] = useState('')

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
            return setAlertMessage({ text: "Não deixe campos vazios!", status: 500 })

        const data = await updateUser(user)
        if (data === 200)
            setAlertMessage({ text: "Dados atualizados com sucesso!", status: 200 })
        else
            setAlertMessage({ text: "Erro ao atualizar dados!", status: 500 })
    }

    function setUserValue(key, value) {

        let userTemp = user
        user[key] = value
        setUser(userTemp)

    }

    async function passwordUpdate(event) {
        event.preventDefault()

        if (!password || !passwordConfirm) {
            return setPasswordConfirmAlert({ text: "Não deixe campos vazios", status: 'error' })
        }

        if (password !== passwordConfirm) {
            return setPasswordConfirmAlert({ text: 'Senhas não correspondem', status: 'error' })
        }

        const data = await updateUser({ password })
        if (data === 200)
            setPasswordConfirmAlert({ text: "Senha atualizada com sucesso!", status: 'success' })
        else
            setPasswordConfirmAlert({ text: "Erro ao atualizar senha!", status: 'error' })

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
                <form onSubmit={userEdit} className="formRegister">

                    <h1>Cadastro</h1>

                    <div className='inputs'>

                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nome da tarefa"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={user.username}
                            onChange={event => setUserValue('username', event.target.value)}
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nome da tarefa"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={user.email}
                            onChange={event => setUserValue('email', event.target.value)}
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nome da tarefa"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={user.first_name}
                            onChange={event => setUserValue('first_name', event.target.value)}
                        />

                        <TextField
                            autoFocus
                            margin="dense"
                            label="Nome da tarefa"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={user.last_name}
                            onChange={event => setUserValue('last_name', event.target.value)}
                        />

                    </div>

                    <Button type="submit" css={{ margin: '25px auto', width: 20 }} shadow auto>
                        Atualizar
                    </Button>

                </form>
            )
        }

        return <></>

    }

    return (
        <section className='centerItems'>

            {alertMessage && <Card css={{ mt: 10 }}>
                <Card.Body >
                    <span
                        size={20}
                        color={alertMessage.status === 200 ? 'green' : 'error'} >

                        {alertMessage.text}

                    </span>
                </Card.Body>
            </Card>}

            {formUser()}

            <div>

                <form onSubmit={passwordUpdate}>

                    {/*  <span color={passwordConfirmAlert.status} >{passwordConfirmAlert.text}</span> */}


                    <TextField
                        autoFocus
                        margin="dense"
                        label="Senha"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    />

                    <p></p>

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Confirmar senha"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={passwordConfirm}
                        onChange={event => setPasswordConfirm(event.target.value)}
                    />

                    <Button type="submit" css={{ margin: '25px auto' }} shadow auto>
                        Redefinir
                    </Button>

                </form>


            </div>

            <div >

                <p > Deletar conta: </p>

                <Button
                    
                    onClick={() => setConfirmModalVisible(true)}
                    color="error"
                   >
                    Deletar
                </Button>

                {/* <ModalConfirm
                    visible={confirmModalVisible}
                    setVisible={setConfirmModalVisible}
                    title="Deletar conta"
                    message="Realmente deseja deletar sua conta?"
                    action={deleteAccount}
                /> */}

            </div>

        </section>
    );
}

export default UserConfig;