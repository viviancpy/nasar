import * as types from '../constants/ActionTypes'
import inputReader from './inputReader'

describe('components', () => {
    it('should pass the intercepted action to next given that it is not READ_INSTRUCTIONS', () => {
        const nextArgs = [];
        const fakeNext = jest.fn();
        const fakeStore = {
            getstate: () => {
                return {}
            },
            dispatch: jest.fn()
        };

        const action = { type: types.PLANET_SIZE };
        inputReader(fakeStore)(fakeNext)(action);

        expect(fakeNext).toBeCalled();
    });

    it('should not pass the intercepted action to next given that it is READ_INSTRUCTIONS', () => {
        const nextArgs = [];
        const fakeNext = jest.fn();
        const fakeStore = {
            getstate: () => {
                return {}
            },
            dispatch: jest.fn()
        };

        const action = { type: types.READ_INSTRUCTIONS, text: '5 5\n1 2 N\nLMLMLMR' };
        inputReader(fakeStore)(fakeNext)(action);

        expect(fakeNext).not.toBeCalled();
    });

    it('should call PLANET_SIZE with size of planet input', () => {
        const nextArgs = [];
        const fakeNext = jest.fn();
        const fakeStore = {
            getstate: () => {
                return {}
            },
            dispatch: jest.fn()
        };

        const action = { type: types.READ_INSTRUCTIONS, text: '5 5\n1 2 N\nLMLMLMR' };
        inputReader(fakeStore)(fakeNext)(action);

        expect(fakeStore.dispatch).toBeCalledWith({
          type: types.PLANET_SIZE,                                     
          size_x: 5,
          size_y: 5
        });
    });

    it('should call LAND_ON_PLANET with initial positions', () => {
        const nextArgs = [];
        const fakeNext = jest.fn();
        const fakeStore = {
            getstate: () => {
                return {}
            },
            dispatch: jest.fn()
        };

        const action = { type: types.READ_INSTRUCTIONS, text: '5 5\n1 2 N\nLMLMLMR\n3 4 W\nMMR' };
        inputReader(fakeStore)(fakeNext)(action);

        expect(fakeStore.dispatch).toBeCalledWith({
          type: types.LAND_ON_PLANET,                                     
          position_x: 1,
          position_y: 2,
          orientation: 'N'
        });

        expect(fakeStore.dispatch).toBeCalledWith({
          type: types.LAND_ON_PLANET,                                     
          position_x: 3,
          position_y: 4,
          orientation: 'W'
        });
    });

    it('should call SEND_INSTRUCTION with instruction', () => {
        const nextArgs = [];
        const fakeNext = jest.fn();
        let actionsCalled = [];
        const fakeStore = {
            getstate: () => {
                return {}
            },
            dispatch: a => {
                actionsCalled.push(a);
            }
        };

        const action = { type: types.READ_INSTRUCTIONS, text: '5 5\n1 2 N\nLL\n3 4 W\nM' };
        inputReader(fakeStore)(fakeNext)(action);

        expect(actionsCalled).toEqual([{
            size_x: 5,
            size_y: 5,
            type: types.PLANET_SIZE
        }, {
            orientation: 'N',
            position_x: 1,
            position_y: 2,
            type: types.LAND_ON_PLANET,
        }, {
            instruction: 'L',
            type: types.SEND_INSTRUCTION,
        }, {
            instruction: 'L',
            type: types.SEND_INSTRUCTION,
        }, {
            type: types.ROVER_COMPLETE
        }, {
            orientation: 'W',
            position_x: 3,
            position_y: 4,
            type: types.LAND_ON_PLANET,
        }, {
            instruction: 'M',
            type: types.SEND_INSTRUCTION,
        },{
            type: types.ROVER_COMPLETE,
        }]);
    });
})
