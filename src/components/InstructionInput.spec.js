import React from 'react'
import TestUtils from 'react-addons-test-utils'
import InstructionInput from './InstructionInput'

const setup = () => {
  const props = {
    onSubmit: jest.fn()
  }
  const renderer = TestUtils.createRenderer()
  renderer.render(<InstructionInput {...props} />)
  const output = renderer.getRenderOutput()
  const component = TestUtils.renderIntoDocument(<InstructionInput {...props} />)
  
  return {
    props: props,
    component: component,
    output: output,
    renderer: renderer
  }
}

describe('components', () => {
  describe('InstructionInput', () => {
    it('should render', () => {
      const { output } = setup()
      expect(output.type).toBe('div')
    })

    it('should render textarea input correctly', () => {
        const { component } = setup()
        const textarea = TestUtils.scryRenderedDOMComponentsWithTag(component, 'textarea')[0];

        expect(textarea.getAttribute('rows')).toEqual('25');
        expect(textarea.getAttribute('cols')).toEqual('60');
    });

    it('should set the state correctly given that text is inputted to textarea input', ()=>{
        const { component } = setup()
        let textarea = TestUtils.scryRenderedDOMComponentsWithTag(component, 'textarea')[0];

        textarea.value = 'I ENTER SOME TEST DATA';
        TestUtils.Simulate.change(textarea);
        expect(component.state.text).toEqual('I ENTER SOME TEST DATA');
    });

    it('should render submit button correctly', ()=>{
        const { component } = setup()
        const submitButton = TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')[0];

        expect(submitButton.getAttribute('type')).toEqual('button');
    })

    it('should fire onSubmit method call given that text is inputted and submit button is clicked', ()=>{
        const { component, props } = setup()
        const submitButton = TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')[0];
        let textarea = TestUtils.scryRenderedDOMComponentsWithTag(component, 'textarea')[0];

        textarea.value = 'I ENTER SOME TEST DATA';
        TestUtils.Simulate.change(textarea);
        TestUtils.Simulate.click(submitButton);

        expect(props.onSubmit).toBeCalled();
    })

    it('should not fire onSubmit method call given that no text is inputted and submit button is clicked', ()=>{
        const { component, props } = setup()
        const submitButton = TestUtils.scryRenderedDOMComponentsWithTag(component, 'input')[0];

        TestUtils.Simulate.click(submitButton);
        expect(props.onSubmit).not.toBeCalled();
    })
  })
})

