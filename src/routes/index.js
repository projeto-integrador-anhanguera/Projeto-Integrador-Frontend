import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RouteWrapper from './routes';

import RegisterUser from '../components/RegisterUser';
import Login from '../components/Login';
import Statistics from '../components/Statistics';
import User from '../components/User';
import RegisterCar from '../components/RegisterCar';

export default function Routes() { 
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/register" exact component={RegisterUser} />
                <Route path="/login" component={Login} />
                <RouteWrapper path="/estatisticas" component={Statistics} />
                <RouteWrapper path="/usuario" component={User} />
                <RouteWrapper path="/veiculos" component={RegisterCar} /> 
            </Switch>
        </BrowserRouter>
    )
}   