import React from "react";
import { Route } from "react-router-dom";

import Main from '../components/Main';

export default function RouteWrapper({ component: Component, ...rest }) {
    const Layout = Main;
    
    return (
        <Route 
            {...rest}
            render={props => (
                <Layout>
                    <Component {...props} />
                </Layout>
            )}
        />
    );
}