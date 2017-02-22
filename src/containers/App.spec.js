import React from 'react';
import TestUtils from 'react-addons-test-utils'
import {shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import App, {App as AppLayout} from './App';
import InstructionInput from '../components/InstructionInput';
import InstructionOutput from '../components/InstructionOutput';

describe('containers', () => {
    const mockStore = configureMockStore([]);
    const mockStoreState = {
        rovers:{
            size_x: 0,
            size_y: 0,
            robots: []
        }
    };

    describe('App', () => {
        it('should connect to store', () => {
            let store = mockStore(mockStoreState);
            let appContainer = shallow(<App store={store} />).shallow();
            expect(appContainer.find('div.jumbotron').length).toEqual(1);
            expect(appContainer.find('InstructionInput').length).toEqual(1);
            expect(appContainer.find('InstructionOutput').length).toEqual(1);
        });
    });

    describe('App Layout', () => {
        it ('should pass readInstruction to InstructionInput', ()=>{
            const rovers= {
                size_x: 0,
                size_y: 0,
                robots: []
            };

            const actions= {
                readInstructions: jest.fn()
            };

            const appLayout = TestUtils.renderIntoDocument(<AppLayout rovers={rovers} actions={actions} />);
            const instructionInput = TestUtils.findRenderedComponentWithType(appLayout, InstructionInput);
            expect(instructionInput.props.onSubmit).toBe(actions.readInstructions);
        });
          
        it ('should pass robots to InstructionOutput', ()=>{
            const rovers= {
                size_x: 0,
                size_y: 0,
                robots: [{
                    id: 0,
                    position_x: 4,
                    position_y: 5,
                    orientation: 'N',
                    isError: true,
                    isComplete: true
                }]
            };

            const actions= {
                readInstructions: jest.fn()
            };

            const appLayout = TestUtils.renderIntoDocument(<AppLayout rovers={rovers} actions={actions} />);
            const instructionOutput = TestUtils.findRenderedComponentWithType(appLayout, InstructionOutput);
            expect(instructionOutput.props.robots).toBe(rovers.robots);
        });
    });
});


