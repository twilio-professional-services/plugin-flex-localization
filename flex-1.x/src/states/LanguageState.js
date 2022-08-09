const ACTION_SET_LANGUAGE = 'SET_LANGUAGE';

const initialState = {};

export class Actions {
  static setLanguage = (language) => ({ type: ACTION_SET_LANGUAGE, language });
};

export function reduce(state = initialState, action) {
  switch (action.type) {
    case ACTION_SET_LANGUAGE: {
      return {id: action.language};
    }
    default:
      return state;
  }
};
