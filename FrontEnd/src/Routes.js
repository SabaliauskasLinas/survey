import React from 'react'
import { Route, HashRouter, Switch } from 'react-router-dom'
import Main from './components/Main'
import Page404 from './components/Page404'
import ScrollToTop from './components/ScollToTop'

function Routes() {
    return (
        <HashRouter>
            <ScrollToTop />
            <Switch>
                <Route exact path='/' component={ Main } />
                <Route exact path='/labas' component={ Main } />
                <Route path='*' component={ Page404 } />
            </Switch>
        </HashRouter>
    )
}

export default Routes
