import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react';
import { API, graphqlOperation } from 'aws-amplify';
import { listTodos } from './graphql/queries'
import DisplayTodos from './DisplayTodos';
import TodoForm from './TodoForm';

class App extends Component {
  constructor() {
    super()
    this.state = { todos: [] }
    this.refreshToDo=this.refreshToDo.bind(this)
  }

  async refreshToDo(){
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
        <TodoForm refreshToDo={this.refreshToDo}/>
        <DisplayTodos todos={this.state.todos}  />
      </div>
    );
  }
}

export default withAuthenticator(App, {
  // Render a sign out button once logged in
  includeGreetings: true,
});
// export default App