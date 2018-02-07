import * as types from '../actions/actionTypes';
import initialState from './initialState';
import { ChecklistModel, ActionsChecklist, ActionsChecklists } from '../interfaces';

export function checklistsReducer(state: ChecklistModel[] = initialState.checklists, action: ActionsChecklist | ActionsChecklists) {
    switch (action.type) {
        case types.LOAD_CHECKLISTS_SUCCESS:
            return action.payload;

        case types.CREATE_CHECKLIST_SUCCESS:
            const newId = (state.length > 0) ? state[state.length - 1].id + 1 : 1;
            return [
                ...state,
                Object.assign({}, action.payload, {id: newId})
            ];

        case types.UPDATE_CHECKLIST_SUCCESS:
            const index = state.map(function(checklist: ChecklistModel) {
                return checklist.id;
            }).indexOf(action.payload.id);
            const checklists = [...state];

            checklists.splice(index, 1, action.payload);
            return checklists;

        default:
            return state;
    }
}