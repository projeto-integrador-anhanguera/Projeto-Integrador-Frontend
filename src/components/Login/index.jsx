import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import api from '../../services/api';

function Login({ history }) {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    
    async function handleSubmit(e) {
        e.preventDefault();

        const response = await api.post('/login', {
            name, password
        });

        if (response.status === 200) {
            history.push('/main');
        }
    }

    function renderRegister() {
        history.push('/');
    }

    return (
        <>
            <div className='page-login'>
                <h1 className='signin-login'>Sign In</h1>
                <div>
                    <form className='form-login' onSubmit={handleSubmit}>
                        <div className='div-main'>
                            <div className='input-name-login'>
                                <TextField required id='outlined-basic' label='Nome' variant='outlined' className='input-name-login grid-xs-12' value={name} onChange={event => setName(event.target.value)} />
                            </div>
                            <div className='input-password-login'>
                                <TextField required id='outlined-basic' label='Password' type="password" variant='outlined' className='input-password-login grid-xs-12' value={password} onChange={event => setPassword(event.target.value)} />
                            </div>
                            <div className='button-login'>
                                <Button variant='contained' color='primary' className='button-login grid-xs-12' type='submit'>
                                    Login
                                </Button>
                            </div>
                            <div className='button-login-register'>
                                <Button variant='contained' color='primary' className='button-login-register grid-xs-12' type='submit' onClick={() => renderRegister()}>
                                    Cadastre-se
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;