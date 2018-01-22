import {combineReducers} from 'redux';
import {checklistsReducer as checklists} from './checklistsReducer';

const rootReducer = combineReducers({
	checklists
});

export default rootReducer;