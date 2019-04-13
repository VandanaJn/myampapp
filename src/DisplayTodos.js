import React, { Component } from 'react';
import TodoForm from './TodoForm';

class DisplayTodos extends Component {

  render() {
    return (
      <div>
            {
              this.props.todos.map((value, idex) => (
              <TodoForm key={value.id} refreshToDo={this.props.refreshToDo} id={value.id} name={value.name} description={value.description}/>
              ))
            }
      </div>);
  }
}

export default DisplayTodos