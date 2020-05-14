import React, { Component } from 'react'

const inp = (Com) => {
  return class InputHOC extends Component {
    constructor() {
      super();
      this.state = {
        value: ''
      }
    }
    handleChange = (e) => {
      this.setState({
        value: e.target.value
      })
    }
    
    componentDidMount() {
      
    }
    
    render() {
      const props = {
        value: this.state.value,
        onChange: this.handleChange
      }
      return <Com {...props} />
    }
  }
}

class Input extends Component {
  render() {
    return <input {...this.props} />
  }
}

export default inp(Input);