import React, {Component} from 'react'


import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addTodo, deleteTodo, editTodo} from '../../ducks/todoReducer'

const complete = {
    textDecoration: 'line-through'
}



class Details extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            todos: [],
            
            todo: null,
            title: null,
            description: null,
            completed: null,
            
            
            
        }
    }

    componentDidMount(){
        const {id} = this.props.match.params
        const {todos} = this.props.todos
        console.log(todos)
        console.log(id)
        const filteredTodos = todos.filter(todo => todo.id == id)
        console.log(filteredTodos[0])
       
        
        this.setState({
            title: filteredTodos[0].title,
            description: filteredTodos[0].description,
            completed: filteredTodos[0].completed
          

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
        const {id} = this.props.match.params
        console.log(id)
        console.log('STATE', this.state)
        console.log('PROPS', this.props.todos)
        const {todos} = this.props.todos
        console.log('todos destructured',todos)
        const mappedTodos = todos.map(todo => {
            return <div className='mapped-todos' key={todo.id}>
                <h3 style={(todo.completed) ? complete : {}}>{todo.title} </h3>
                
                <div className='button-container'>
                    <button onClick={() => this.setState({completed: !this.state.completed})} disabled={todo.completed} >Complete</button>
                    <button onClick={(e) => this.delete(todo.id)}>X</button>
                </div>
            </div>
        })


        return (
        <div className='todo'>
            
            <div className='main-to-do'>
                <Link to='/home'>Back to Tasks</Link>
                <h2 >Task</h2>
                <input 
                    style={(this.state.completed) ? complete : {}}
                    type='text'
                    value={this.state.title}
                    onChange={(e)=>this.setState({title: e.target.value})}
                    disabled={this.state.completed}

                />
                <button onClick={() => this.setState({completed: !this.state.completed})} disabled={this.state.completed} >Complete</button>
                <button onClick={this.add}>Add new To-do</button>
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
    
    addTodo: addTodo,
    deleteTodo: deleteTodo,
    editTodo: editTodo
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Details);