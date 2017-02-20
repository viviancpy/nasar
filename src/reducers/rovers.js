import { PLANET_SIZE, LAND_ON_PLANET, SEND_INSTRUCTION, ROVER_COMPLETE } from '../constants/ActionTypes'
import { NORTH, EAST, SOUTH, WEST } from '../constants/Orientation'
import { LEFT, RIGHT, MOVE } from '../constants/Movement'
import _ from 'lodash'

const initialState = {
    size_x: 0,
    size_y: 0,
    robots: []
  }

const updateRobot = (state, robot) => {
  const updated_robots = state.robots.map((item) => {
      if(item.id !== robot.id) {
          return item;
      }
      return {
          ...item,
          ...robot
      };    
  });

  return {
    ...state,
    robots: updated_robots
  }
}

export default function rovers(state = initialState, action) {
  switch (action.type) {
    case PLANET_SIZE:
      return {
        size_x: action.size_x,
        size_y: action.size_y,
        robots: []
      }

    case LAND_ON_PLANET:
      const landed_robots = [
        ...state.robots,
        {
            id: state.robots.reduce((maxId, robot) => Math.max(robot.id, maxId), -1) + 1,
            position_x: action.position_x,
            position_y: action.position_y,
            orientation: action.orientation,
            isError: false,
            isComplete: false
        }
      ]
      return {
          ...state,
          robots: landed_robots,
      }

    case ROVER_COMPLETE:
      let finish_robot = _.maxBy(state.robots, r => { return r.id; });
      finish_robot.isComplete = true;
      return updateRobot(state, finish_robot);
    case SEND_INSTRUCTION:
      let robot = _.maxBy(state.robots, r => { return r.id; });

      if (robot.isError)
        return state;

      switch(action.instruction){
        case MOVE:
          switch (robot.orientation){
            case NORTH:
              robot.position_y++;
              break;
            case SOUTH:
              robot.position_y--;
              break;
            case EAST:
              robot.position_x++;
              break;
            case WEST:
              robot.position_x--;
              break;
          }
          if (robot.position_x > state.size_x || robot.position_y > state.size_y){
            robot.isError = true;
          }
          break;
        case LEFT:
          switch (robot.orientation){
            case NORTH:
              robot.orientation = WEST;
              break;
            case SOUTH:
              robot.orientation = EAST;
              break;
            case EAST:
              robot.orientation = NORTH;
              break;
            case WEST:
              robot.orientation = SOUTH;
              break;
          }
          break;
        case RIGHT:
          switch (robot.orientation){
            case NORTH:
              robot.orientation = EAST;
              break;
            case SOUTH:
              robot.orientation = WEST;
              break;
            case EAST:
              robot.orientation = SOUTH;
              break;
            case WEST:
              robot.orientation = NORTH;
              break;
          }
          break;  
      }

      return updateRobot(state, robot)

    default:
      return state
  }
}
