import * as types from '../actions/actionTypes';
import _ from 'lodash';
import initialState from './initialState';
import { ChecklistModel, ActionsChecklist, ActionsChecklists } from '../interfaces';

export function checklistsReducer(state: ChecklistModel[] = initialState.checklists, action: ActionsChecklist | ActionsChecklists) {
    switch (action.type) {
        case types.LOAD_CHECKLISTS_SUCCESS:
            return action.payload;

        case types.CREATE_CHECKLIST_SUCCESS:
            return [
                ...state,
                Object.assign({}, _.omit(action.payload, 'isNew'))
            ];

        case types.UPDATE_CHECKLIST_SUCCESS:
            const payload = Object.assign({}, action.payload) as ChecklistModel ;
            const index = state.map(function(checklist: ChecklistModel) {
                return checklist.id;
            }).indexOf(payload.id);
            const checklists = [...state];

            checklists.splice(index, 1, payload);
            return checklists;

        default:
            return state;
    }
}