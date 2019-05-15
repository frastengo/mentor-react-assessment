import axios from 'axios'


const initialState = {
    todos: [],
    loading: false,
}

const GET_ALL_TODOS = "GET_ALL_TODOS"
const ADD_TODO = "ADD_TODO"
const DELETE_TODO = "DELETE_TODO"
const EDIT_TODO = "EDIT_TODO"





export default function todoReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_TODOS + "_PENDING":
            return {...state, loading: true}
        case GET_ALL_TODOS + "_FULFILLED":
        //doesnt need to have ...state when making awhole new object
            return {loading: false, todos: action.payload}
        case GET_ALL_TODOS + "_REJECTED":
            return {...state, loading: false}

        case ADD_TODO + "_FULFILLED":
            return {loading: false, todos: action.payload}
        
        case EDIT_TODO + "_FULFILLED":
            return {loading: false, todos: action.payload}
        case DELETE_TODO + "_FULFILLED":
            return {loading: false, todos: action.payload}
        
        default:
            return state
    }
    
}
//add async after export if using await


export function getAllTodos(){
    let todos = axios.get('https://practiceapi.devmountain.com/api/tasks').then(res => res.data)
    
    return {
        type: GET_ALL_TODOS,
        payload: todos
    }
}

export function addTodo(task){
    let todos = axios.post('https://practiceapi.devmountain.com/api/tasks', {title: task}).then(res => res.data)
    
    return {
        type: ADD_TODO,
        payload: todos
    }
}

export function deleteTodo(taskId){
    let todos = axios.delete(`https://practiceapi.devmountain.com/api/tasks/${taskId}`).then(res => res.data)
    
    return {
        type: DELETE_TODO,
        payload: todos
    }
}

export function editTodo(taskId){
    let todos = axios.put(`https://practiceapi.devmountain.com/api/tasks/${taskId}`).then(res => res.data)
    
    return {
        type: EDIT_TODO,
        payload: todos
    }
}

