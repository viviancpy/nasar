In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Design

## REDUCER
It uses Reducer to contain the state of the rovers. When the exploration project starts, 
the size of the plateau will be stored in the reducer. Thereafter, each rover landed will be an
individual entry in the reducer. The reducer serve as a state machine for the project so that
every when all the rovers complete the instructions, the current state at that point will be 
the output.

## ACTION / MIDDLEWARE
The user inputs from the UI by providing instructions and clicking on the Submit button. This 
triggers the read_instructions action. The logics about parsing and splitting up rovers'
instructions are put in a middleware called inputReader. InputReader will parse the input and
dispatch different action types. These are the action types the reducer will be listened to.

## CONTAINER / COMPONENTS
The project uses smart/dump components. Containers\App.js is the smart component, it serves
the purpose of mapping the redux state and action and distribute appropriate content (send 
result of robots position to the output comopnent) or functions(send read_instructions to the 
input component). Components\InstructionInput.js and Components\InstructionOutput.js are the
dump component. InstructionInput will populate back to the smart component via onSubmit method.
The smart component knows what action to fire. InstructionOutput will be given the robots
details and print it to the screen. The details are given by the smart component and the smart
component does the mapState so whenever a change in the state happens in the store, the smart
component populate the details down to the dump component.