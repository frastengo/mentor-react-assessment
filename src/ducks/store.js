
import {createStore, applyMiddleware, combineReducers} from 'redux'
import todoReducer from './todoReducer'

import promiseMiddleware from 'redux-promise-middleware'


const rootReducer = combineReducers({
    todos:  todoReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));