import { CHANGE_KARMA } from '../actions/types';

export default (state={}, action) => {
    switch (action.type) {
        case CHANGE_KARMA:
            return { ...state, karma: state.karma + action.payload.karma };
        default:
            return state;
    }  
};