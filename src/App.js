import React, { Component } from 'react';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react';
import { API, graphqlOperation } from 'aws-amplify';
import { listTodos } from './graphql/queries'
import DisplayTodos from './DisplayTodos';
import TodoForm from './TodoForm';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

class App extends Component {
  constructor() {
    super()
    this.state = { todos: [] }
    this.refreshToDo = this.refreshToDo.bind(this)
  }

  async refreshToDo() {
    const data = await API.graphql(graphqlOperation(listTodos))
    this.setState({
      todos: data.data.listTodos.items
    })
  }

  async componentDidMount() {
    this.refreshToDo()

  }

  render() {

    return (

      <div>
        <Container fluid >
          <Jumbotron fluid>
            <h1> To do Application</h1>
          </Jumbotron>
        </Container>
        <Container>
          <TodoForm refreshToDo={this.refreshToDo} />
          <DisplayTodos todos={this.state.todos} refreshToDo={this.refreshToDo} />
        </Container>
      </div>

    );
  }
}

export default withAuthenticator(App, {
  // Render a sign out button once logged in
  includeGreetings: true,
});
