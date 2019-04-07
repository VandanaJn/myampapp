import React, { Component } from 'react';

class DisplayTodos extends Component {
  constructor() {
    super()
    console.log(this.props)
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
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>);
  }
}

export default DisplayTodos