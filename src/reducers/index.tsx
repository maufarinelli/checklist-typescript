import { combineReducers } from 'redux';
import { checklistsReducer as checklists, checklistReducer as checklist } from './checklistsReducer';

const rootReducer = combineReducers({
    checklists,
    checklist
});

export default rootReducer;