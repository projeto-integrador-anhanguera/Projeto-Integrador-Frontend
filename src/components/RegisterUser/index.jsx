import React, { memo, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '../Button';
import SnackbarComponent from '../Snackbar';
import api from '../../services/api';

function RegisterUser({ history }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [userCreate, setUserCreate] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        
        const response = await api.post('/register', {
            name, email, lastName, password
        });

        if (response.status === 200) {
            setUserCreate(true)
            setTimeout(() => {
                history.push('/');
            }, 1000)
        } else {
            setUserCreate(false)
        }
    }

    function renderLogin() {
        history.push('/');
    }

    return (
        <>
            <div className='page-register'>
                <h1 className='signup-register'>Sign Up</h1>
                <div>
                    <form className='form-register' onSubmit={handleSubmit}>
                        <div className='div-main'>
                            <div className='input-register'>
                                <TextField required id='outlined-basic' label='Nome' variant='outlined' className='input-name' value={name} onChange={event => setName(event.target.value)} />
                                <TextField required id='outlined-basic' label='Sobrenome' variant='outlined' className='input-name' value={lastName} onChange={event => setLastName(event.target.value)} />
                            </div>
                            <div className='input-email'>
                                <TextField required id='outlined-basic' label='email@example.com' variant='outlined' className='input-email grid-xs-12' value={email} onChange={event => setEmail(event.target.value)} />
                            </div>
                            <div className='input-password'>
                                <TextField 
                                    required 
                                    id='outlined-basic' 
                                    label='Password' 
                                    type="password" 
                                    variant='outlined' 
                                    className='input-password grid-xs-12' 
                                    value={password} 
                                    onChange={event => setPassword(event.target.value)}
                                    inputProps={{ minLength: 7 }}
                                />
                            </div>
                            <div className='align-buttons-register'>
                                <Button variant='contained' color='primary' className='button-register grid-xs-12' type='submit' text='Cadastre-se' />
                                <Button variant='contained' color='primary' className='button-register-login grid-xs-12' type='submit' onClick={() => renderLogin()} text='Login' />
                            </div>
                        </div>
                    </form>
                </div>
                {userCreate ? <SnackbarComponent severity='success' message='Usuário cadastrado com sucesso.' /> : null}
            </div>
        </>
    );
}

export default memo(RegisterUser);