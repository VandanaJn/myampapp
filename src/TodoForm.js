import React, { Component } from 'react'
import { API, graphqlOperation } from 'aws-amplify';
import { createTodo, deleteTodo, updateTodo } from './graphql/mutations'

class TodoForm extends Component {

    constructor(props) {
        super(props)
        this.state = { id: null, name: '', description: '', insert: true }
        this.handleChange = this.handleChange.bind(this)
        this.addTodo = this.addTodo.bind(this)
        this.updateTodo = this.updateTodo.bind(this)
        this.deleteTodo = this.deleteTodo.bind(this)
    }

    async componentDidMount() {
        
        if (this.props.name !== undefined) {
            this.setState({
                id: this.props.id,
                name: this.props.name,
                description: this.props.description,
                insert: this.props.id === undefined ? true : false
            })
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    async addTodo(event) {
        event.preventDefault()
        try {
            await API.graphql(
                graphqlOperation(
                    createTodo, {
                        input:
                            { name: this.state.name, description: this.state.description }
                    }
                ))
            this.props.refreshToDo()
            this.setState({ id: '', name: '', description: '', insert: true })

        } catch (err) {
            console.log('error: ', err)
        }
    }

    async updateTodo(event) {
        event.preventDefault()
        try {
            await API.graphql(
                graphqlOperation(
                    updateTodo, {
                        input:
                            { id: this.state.id, name: this.state.name, description: this.state.description }
                    }
                ))
            this.props.refreshToDo()

        } catch (err) {
            console.log('error: ', err)
        }
    }

    async deleteTodo(event) {
        event.preventDefault()
        try {
            await API.graphql(
                graphqlOperation(
                    deleteTodo, {
                        input:
                            { id: this.state.id }
                    }
                ))
            this.props.refreshToDo()
        } catch (err) {
            console.log('error: ', err)
        }
    }

    render() {
        let formDiv

        if (this.state.insert) {
            formDiv =
                <form>
                    <input type="text" placeholder="Task name" name="name" value={this.state.name} onChange={this.handleChange} />
                    <input type="text" placeholder="Description" name="description" value={this.state.description} onChange={this.handleChange} />
                    <button onClick={this.addTodo}>Add ToDo</button>
                </form>
        } else {
            formDiv =
                <form>
                    <input type="text" placeholder="Task name" name="name" value={this.state.name} onChange={this.handleChange} />
                    <input type="text" placeholder="Description" name="description" value={this.state.description} onChange={this.handleChange} />
                    <button onClick={this.updateTodo}>Update ToDo</button>
                    <button onClick={this.deleteTodo}>Delete</button>
                </form>
        }

        return (
            <div>
                {formDiv}
            </div>
        )
    }
}

export default TodoForm