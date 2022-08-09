import { combineReducers } from 'redux';
import { reduce as LanguageReducer } from './LanguageState';

// Register your redux store under a unique namespace
export const namespace = 'select-language';

// Combine the reducers
export default combineReducers({
  language: LanguageReducer
});
