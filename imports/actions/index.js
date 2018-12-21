import { CHANGE_KARMA } from './types';

export const changeKarma = (newPoints) => {
    return {
        type: CHANGE_KARMA,
        payload: {
            karma: newPoints
        }
    };
};