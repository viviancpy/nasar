import React, { Component, PropTypes } from 'react'

export default class InstructionInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  state = {
    text: ''
  }

  handleChange = e => {
    this.setState({text: e.target.value})
  }

  handleSubmit = e => {
    if (this.state.text) {
      this.props.onSubmit(this.state.text)
    }
  }

  render() {
    return (
      <div className="container">
          <div className="row">
              <div className="col-sm-12">
                  <h3>Input</h3>
                  <form>               
                      <div className="form-group">
                        <textarea className="form-control" rows="25" cols="60" value={this.state.text} onChange={this.handleChange}></textarea>
                      </div>
                      <div className="form-group">
                        <input className="btn btn-primary" type="button" onClick={this.handleSubmit} value="Submit"/>
                      </div>                     
                  </form>
              </div>
          </div>
      </div>
    )
  }
}
