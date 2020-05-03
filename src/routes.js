import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import Main from './components/Main';

export default function Routes() { 
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/main" component={Main} />
            </Switch>
        </BrowserRouter>
    )
}   