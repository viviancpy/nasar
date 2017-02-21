import * as types from '../constants/ActionTypes'
import * as actions from './index'

describe('actions', () => {
  it('readInstruction should create READ_INSTRUCTIONS action', () => {
    expect(actions.readInstructions('5 5\n1 2 N\nLMMML')).toEqual({
      type: types.READ_INSTRUCTIONS,
      text: '5 5\n1 2 N\nLMMML'
    })
  })
})