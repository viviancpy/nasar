import _ from 'lodash';
import { PLANET_SIZE, LAND_ON_PLANET, READ_INSTRUCTIONS, SEND_INSTRUCTION, ROVER_COMPLETE } from '../constants/ActionTypes';

const inputReader = store => next => action => {
  if (action.type === READ_INSTRUCTIONS) {
    const inputText = action.text;
    const inputLines = inputText.split('\n');

    if (inputLines.length > 1){
        // read instructions
        const planetSizes = inputLines[0].split(' ');
        const size_x = _.toInteger(planetSizes[0]);
        const size_y = _.toInteger(planetSizes[1]);
        store.dispatch({ 
          type: PLANET_SIZE,                                     
          size_x: size_x,
          size_y: size_y
        });

        for(let i=1; i<inputLines.length-1; i++){

            // landing of rover
            const landingInfo = inputLines[i].split(' ');
            if (landingInfo.length === 3){
                const landing_pos_x = _.toInteger(landingInfo[0]);
                const landing_pos_y = _.toInteger(landingInfo[1]);
                const landing_orientation = landingInfo[2];
                store.dispatch({ 
                    type: LAND_ON_PLANET,                                     
                    position_x: landing_pos_x,
                    position_y: landing_pos_y,
                    orientation: landing_orientation
                });
            }
            
            // exploration of rover
            const exploreInfo = inputLines[i+1].split('');
            _.each(exploreInfo, e => {
                store.dispatch({ 
                    type: SEND_INSTRUCTION,
                    instruction: e
                });
            })

            store.dispatch({ 
                type: ROVER_COMPLETE
            });
            
            i++;
        }
    }
  }else{
      return next(action); // pass to act on next action
  }
}

export default inputReader