import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import InstructionInput from '../components/InstructionInput'
import InstructionOutput from '../components/InstructionOutput'
import * as RoverActions from '../actions'

export const App = ({rovers, actions}) => (
  <div className="jumbotron">
    <div className="container">
      <h1>Mars Rovers</h1>
      <p>This application aims to help NASA scientists and/or engineers control the rovers to be landed Mars. To start, please enter the instructions and click Submit.</p>
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row">
              <div className="col-lg-6">
                <InstructionInput onSubmit={actions.readInstructions} />
              </div>
              <div className="col-lg-6">
                <InstructionOutput robots={rovers.robots} />
              </div>
          </div>
              
        </div>
      </div>
    </div>
  </div>
)

App.propTypes = {
  rovers: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  rovers: state.rovers
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(RoverActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
