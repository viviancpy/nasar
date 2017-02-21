import React from 'react'
import TestUtils from 'react-addons-test-utils'
import InstructionOutput from './InstructionOutput'

const setup = () => {
  const props = {
    robots: [
        {
            id: 0,
            position_x: 4,
            position_y: 5,
            orientation: 'N',
            isError: true,
            isComplete: true
        }, {
            id: 1,
            position_x: 3,
            position_y: 1,
            orientation: 'E',
            isError: false,
            isComplete: true
        }, {
            id: 2,
            position_x: 0,
            position_y: 0,
            orientation: 'N',
            isError: false,
            isComplete: false
        }
    ]
  }
  
  const renderer = TestUtils.createRenderer()
  renderer.render(<InstructionOutput {...props} />)
  const output = renderer.getRenderOutput()
  const component = TestUtils.renderIntoDocument(<InstructionOutput {...props} />)  
  
  return {
    props: props,
    component: component,
    renderer: renderer,
    output: output
  }
}

describe('components', () => {
  describe('InstructionOutput', () => {
    it('should render', () => {
      const { output } = setup()
      expect(output.type).toBe('div')
    })

    it('should render error message for robot given that the robot is in error', () => {
        const { component } = setup()
        const robotResult = TestUtils.scryRenderedDOMComponentsWithClass(component, 'robot-result')[0];

        expect(robotResult.textContent).toEqual('Error in exploration. Machine got lost.');
    });

    it('should render position and orientation for robot given that the robot is in not in error and is completed exploration', () => {
        const { component } = setup()
        const robotResult = TestUtils.scryRenderedDOMComponentsWithClass(component, 'robot-result')[1];

        expect(robotResult.textContent).toEqual('3 1 E');
    });

    it('should render loading message for robot given that the robot is in completed exploration', () => {
        const { component } = setup()
        const robotResult = TestUtils.scryRenderedDOMComponentsWithClass(component, 'robot-result')[2];

        expect(robotResult.textContent).toEqual('Exploring...');
    });
  })
})

