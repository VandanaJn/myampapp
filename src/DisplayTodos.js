import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { deleteTodo } from './graphql/mutations'

class DisplayTodos extends Component {
  constructor() {
    super()
    console.log(this.props)
    this.DeleteTodo = this.DeleteTodo.bind(this)
  }

  async DeleteTodo(event) {
    console.log(event.target.id)
    try {
      await API.graphql(
        graphqlOperation(
          deleteTodo, {
            input:
              { id: event.target.id }
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
        <table>
          <thead>
            <tr>
              <th>
                Task
          </th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.todos.map((value, idex) => (
                <tr key={value.id}>

                  <td>{value.name}</td>
                  <td>{value.description}</td>
                  <td><button id={value.id} onClick={this.DeleteTodo}>Delete</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>);
  }
}

export default DisplayTodos