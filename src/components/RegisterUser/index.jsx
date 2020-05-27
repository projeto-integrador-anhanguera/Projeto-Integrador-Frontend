import React, { memo, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import api from '../../services/api';

function RegisterUser({ history }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        
        const response = await api.post('/register', {
            name, email, lastName, password
        });

        if (response.status === 200) {
            history.push('/login');
        } 
    }

    function renderLogin() {
        history.push('/login');
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
                                <TextField required id='outlined-basic' label='Email' variant='outlined' className='input-email grid-xs-12' value={email} onChange={event => setEmail(event.target.value)} />
                            </div>
                            <div className='input-password'>
                                <TextField required id='outlined-basic' label='Password' type="password" variant='outlined' className='input-password grid-xs-12' value={password} onChange={event => setPassword(event.target.value)} />
                            </div>
                            <div className='button-register'>
                                <Button variant='contained' color='primary' className='button-register grid-xs-12' type='submit'>
                                    Cadastre-se
                                </Button>
                            </div>
                            <div className='button-register-login'>
                                <Button variant='contained' color='primary' className='button-register-login grid-xs-12' type='submit' onClick={() => renderLogin()}>
                                    Login
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default memo(RegisterUser);