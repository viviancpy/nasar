import React, { Component, PropTypes } from 'react'

export default class InstructionOutput extends Component {
  static propTypes = {
    robots: PropTypes.array.isRequired
  }


  renderRobotLocation(robot){
      if (robot.isError){
        return <div key={robot.id} className="robot-result">Error in exploration. Machine got lost.</div>
      }else if (robot.isComplete){
        return <div key={robot.id} className="robot-result">{`${robot.position_x} ${robot.position_y} ${robot.orientation}`}</div>
      }else{
        return <div key={robot.id} className="robot-result">Exploring...</div>
      }
  }

  render() {
    const { robots } = this.props

    return (
      <div className="container">
          <div className="row">
              <div className="col-sm-12">
                  <h3>Output</h3>
                  <div className="Well">
                    {robots.map(r => this.renderRobotLocation(r) )}
                  </div>
              </div>
          </div>
      </div>
    )
  }
}