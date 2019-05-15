import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Details from './components/Details/Details'
import TodoList from './components/TodoList/TodoList'

export default (
    <Switch>
        
        <Route path = '/details/:id' component={Details}/>
        <Route path = '/home' component={TodoList}/>
       
    </Switch>

)