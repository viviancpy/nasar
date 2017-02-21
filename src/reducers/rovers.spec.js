import _ from 'lodash'
import rovers from './rovers'
import * as types from '../constants/ActionTypes'

describe('rovers reducer', () => {
  it('should return the initial state', () => {
    expect(
      rovers(undefined, {})
    ).toEqual({
        size_x: 0,
        size_y: 0,
        robots: []
    })
  })

  it('should handle PLANET_SIZE', () => {
    expect(
      rovers({}, {
        type: types.PLANET_SIZE,
        size_x: 6,
        size_y: 6
      })
    ).toEqual({
        size_x: 6,
        size_y: 6,
        robots: []
    })

    expect(
      rovers({
            size_x: 4,
            size_y: 4,
            robots: [{
                id: 2,
                position_x: 0,
                position_y: 0,
                orientation: 'N',
                isError: false,
                isComplete: false
            }]
        }, {
            type: types.PLANET_SIZE,
            size_x: 8,
            size_y: 8
        })
    ).toEqual({
        size_x: 8,
        size_y: 8,
        robots: []
    })
  })

  it('should handle LAND_ON_PLANET', () => {
    expect(
      rovers({
        size_x: 8,
        size_y: 8,
        robots: []
      }, {
        type: types.LAND_ON_PLANET,
        position_x: 6,
        position_y: 3,
        orientation: 'N'
      })
    ).toEqual({
        size_x: 8,
        size_y: 8,
        robots: [{
            id: 0,
            position_x: 6,
            position_y: 3,
            orientation: 'N',
            isError: false,
            isComplete: false
        }]
    })

    expect(
      rovers({
        size_x: 8,
        size_y: 8,
        robots: [{
            id: 0,
            position_x: 6,
            position_y: 3,
            orientation: 'N',
            isError: false,
            isComplete: true
        }]
      }, {
        type: types.LAND_ON_PLANET,
        position_x: 2,
        position_y: 1,
        orientation: 'W'
      })
    ).toEqual({
        size_x: 8,
        size_y: 8,
        robots: [{
            id: 0,
            position_x: 6,
            position_y: 3,
            orientation: 'N',
            isError: false,
            isComplete: true
        }, {
            id: 1,
            position_x: 2,
            position_y: 1,
            orientation: 'W',
            isError: false,
            isComplete: false
        }]
    })
  })

it('should handle ROVER_COMPLETE', () => {
    expect(
      rovers({
        size_x: 8,
        size_y: 8,
        robots: [{
            id: 0,
            position_x: 6,
            position_y: 3,
            orientation: 'N',
            isError: false,
            isComplete: false
        }]
      }, {
        type: types.ROVER_COMPLETE
      })
    ).toEqual({
        size_x: 8,
        size_y: 8,
        robots: [{
            id: 0,
            position_x: 6,
            position_y: 3,
            orientation: 'N',
            isError: false,
            isComplete: true
        }]
    })

    expect(
      rovers({
        size_x: 8,
        size_y: 8,
        robots: [{
            id: 0,
            position_x: 6,
            position_y: 3,
            orientation: 'N',
            isError: false,
            isComplete: true
        }, {
            id: 1,
            position_x: 2,
            position_y: 1,
            orientation: 'W',
            isError: false,
            isComplete: false
        }]
      }, {
        type: types.ROVER_COMPLETE
      })
    ).toEqual({
        size_x: 8,
        size_y: 8,
        robots: [{
            id: 0,
            position_x: 6,
            position_y: 3,
            orientation: 'N',
            isError: false,
            isComplete: true
        }, {
            id: 1,
            position_x: 2,
            position_y: 1,
            orientation: 'W',
            isError: false,
            isComplete: true
        }]
    })
  })

  it('should handle SEND_INSTRUCTION', () => {
    const testCases = [
        {x: 1, y: 1, orientation: 'N', movement:'M', rx:1, ry: 2, rorientation: 'N'},
        {x: 1, y: 1, orientation: 'E', movement:'M', rx:2, ry: 1, rorientation: 'E'},
        {x: 1, y: 1, orientation: 'S', movement:'M', rx:1, ry: 0, rorientation: 'S'},
        {x: 1, y: 1, orientation: 'W', movement:'M', rx:0, ry: 1, rorientation: 'W'},

        {x: 1, y: 1, orientation: 'N', movement:'L', rx:1, ry: 1, rorientation: 'W'},
        {x: 1, y: 1, orientation: 'E', movement:'L', rx:1, ry: 1, rorientation: 'N'},
        {x: 1, y: 1, orientation: 'S', movement:'L', rx:1, ry: 1, rorientation: 'E'},
        {x: 1, y: 1, orientation: 'W', movement:'L', rx:1, ry: 1, rorientation: 'S'},
        
        {x: 1, y: 1, orientation: 'N', movement:'R', rx:1, ry: 1, rorientation: 'E'},
        {x: 1, y: 1, orientation: 'E', movement:'R', rx:1, ry: 1, rorientation: 'S'},
        {x: 1, y: 1, orientation: 'S', movement:'R', rx:1, ry: 1, rorientation: 'W'},
        {x: 1, y: 1, orientation: 'W', movement:'R', rx:1, ry: 1, rorientation: 'N'}
    ]

    const errorTestCases = [
        {x: 2, y: 2, orientation: 'N', movement:'M', rx:2, ry: 3, rorientation: 'N'},
        {x: 2, y: 2, orientation: 'E', movement:'M', rx:3, ry: 2, rorientation: 'E'},
        {x: 0, y: 0, orientation: 'S', movement:'M', rx:0, ry: -1, rorientation: 'S'},
        {x: 0, y: 0, orientation: 'W', movement:'M', rx:-1, ry: 0, rorientation: 'W'}
    ]

    _.each(testCases, c => {
        expect(
            rovers({
                size_x: 2,
                size_y: 2,
                robots: [{
                    id: 0,
                    position_x: 0,
                    position_y: 0,
                    orientation: 'N',
                    isError: false,
                    isComplete: true
                }, {
                    id: 1,
                    position_x: c.x,
                    position_y: c.y,
                    orientation: c.orientation,
                    isError: false,
                    isComplete: false
                }]
            }, {
                type: types.SEND_INSTRUCTION,
                instruction: c.movement
            })
            ).toEqual({
                size_x: 2,
                size_y: 2,
                robots: [{
                    id: 0,
                    position_x: 0,
                    position_y: 0,
                    orientation: 'N',
                    isError: false,
                    isComplete: true
                }, {
                    id: 1,
                    position_x: c.rx,
                    position_y: c.ry,
                    orientation: c.rorientation,
                    isError: false,
                    isComplete: false
                }]
            })
        })

    _.each(errorTestCases, c => {
        expect(
            rovers({
                size_x: 2,
                size_y: 2,
                robots: [{
                    id: 0,
                    position_x: 0,
                    position_y: 0,
                    orientation: 'N',
                    isError: false,
                    isComplete: true
                }, {
                    id: 1,
                    position_x: c.x,
                    position_y: c.y,
                    orientation: c.orientation,
                    isError: false,
                    isComplete: false
                }]
            }, {
                type: types.SEND_INSTRUCTION,
                instruction: c.movement
            })
            ).toEqual({
                size_x: 2,
                size_y: 2,
                robots: [{
                    id: 0,
                    position_x: 0,
                    position_y: 0,
                    orientation: 'N',
                    isError: false,
                    isComplete: true
                }, {
                    id: 1,
                    position_x: c.rx,
                    position_y: c.ry,
                    orientation: c.rorientation,
                    isError: true,
                    isComplete: false
                }]
            })
        })
    })
})