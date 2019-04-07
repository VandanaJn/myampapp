import React, { Component } from 'react';

class Welcome extends React.Component {
  constructor(){
    super()
   console.log(this.props)
  }
    render() {
      return (
        <div>
        {
        this.props.todos.map((value, idex) => (
        <p>{value.name}</p>
        ))
      }
      </div>);
    }
  }
  
  export default Welcome