import React, { Component } from 'react'
import { API, graphqlOperation } from 'aws-amplify';
import { createTodo } from './graphql/mutations'

class TodoForm extends Component {

    constructor() {
        super()
        this.state = { name: '', description: '' }
        this.handleChange = this.handleChange.bind(this)
        this.AddTodo = this.AddTodo.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

   async  AddTodo(event) {
         event.preventDefault()
        try {
            await API.graphql(
                graphqlOperation(
                    createTodo, {
                        input:
                            { name: this.state.name, description:this.state.description}
                    }
                ))
            this.props.refreshToDo()
        } catch (err) {
            console.log('error: ', err)
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.AddTodo}>
                    <input type="text" placeholder="Task name" name="name" onChange={this.handleChange} />
                    <input type="text" placeholder="Description" name="description" onChange={this.handleChange} />
                    <button>Add ToDo</button>
                </form>
            </div>
        )
    }
}

export default TodoForm