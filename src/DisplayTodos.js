import React, { Component } from 'react';
import TodoForm from './TodoForm';

class DisplayTodos extends Component {

  render() {
    return (
      <div>
         <h4>To do list</h4>
            {
             
              this.props.todos.map((value, idex) => (
              <TodoForm key={value.id} refreshToDo={this.props.refreshToDo} id={value.id} name={value.name} description={value.description}/>
              ))
            }
      </div>);
  }
}

export default DisplayTodos