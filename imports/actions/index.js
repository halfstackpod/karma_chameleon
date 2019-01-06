import { CHANGE_KARMA, FETCH_USERS } from './types';

export const changeKarma = (newPoints) => {
    return {
        type: CHANGE_KARMA,
        payload: {
            karma: newPoints
        }
    };
};