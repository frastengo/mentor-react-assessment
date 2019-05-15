import React, {Component} from 'react'
import './TodoList.css'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAllTodos, addTodo, deleteTodo, editTodo} from '../../ducks/todoReducer'

const complete = {
    textDecoration: 'line-through'
}



class TodoList extends Component {
    constructor(){
        super()
        
        this.state = {
            todos: [],
            task: '',
            
            
            
        }
    }

    componentDidMount(){
        this.props.getAllTodos()

        this.setState({
            todos: this.props.todos
        })
       
        
    
    }

    add = () => {
        const {task} = this.state
        this.props.addTodo(task)


        // if (this.state.task !== ''){
        //     const {task} = this.state
        //     console.log(task)
            
        //     this.props.addTodo(task)
        //     this.setState({
        //         task: ''
        //     })

        // } else {
        //     this.setState({
        //         task: ''
        //     })
        // }

    }

    edit = (todoId) => {
        this.props.editTodo(todoId)
    }

    delete = (todoId) => {
        console.log(todoId)
        this.props.deleteTodo(todoId)



    }
    render(){
        console.log('STATE', this.state)
        console.log('PROPS', this.props.todos)
        const {todos} = this.props.todos
        console.log('todos destructured',todos)
        const mappedTodos = todos.map(todo => {
            return <div  className='mapped-todos' key={todo.id}>
                <Link to={`/details/${todo.id}`} ><h3 style={(todo.completed) ? complete : {}}>{todo.title} </h3></Link>
                
                <div className='button-container'>
                    <button onClick={(e) => this.edit(todo.id)} disabled={todo.completed} >Complete</button>
                    <button onClick={(e) => this.delete(todo.id)}>X</button>
                </div>
            </div>
        
        })


        return (
        <div className='todo'>
            
            <div className='main-to-do'>
                <h1>TO-DO:</h1>
                <input 
                    type='text'
                    
                    onChange={(e)=>this.setState({task: e.target.value})}

                />
                <button onClick={this.add}>Add new To-do</button>
            </div>

            <div className='mapped-todos-container'>
                    {mappedTodos}
            </div>

            {/* {this.props.loading ? (
                <div>Loading . . .</div>
            ):(
                <div className='mapped-todos-container'>
                    {mappedTodos}
                </div>

            )} */}
        </div>
        )

            
    }
}

const mapStateToProps = reduxState => {
    return {
      todos: reduxState.todos
    };
  };
  
  const mapDispatchToProps = {
    getAllTodos: getAllTodos,
    addTodo: addTodo,
    deleteTodo: deleteTodo,
    editTodo: editTodo
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(TodoList);