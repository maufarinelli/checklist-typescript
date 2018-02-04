import * as types from '../actions/actionTypes';
import initialState from './initialState';
import { checklistModel, ActionsChecklist, ActionsChecklists } from '../interfaces';

export function checklistReducer(state: checklistModel[] = initialState.checklists, action: ActionsChecklist) {
	switch (action.type) {
		case types.CREATE_CHECKLIST_SUCCESS:
			var newId = (state.length > 0) ? state[state.length - 1].id + 1 : 1;
			//if(action.payload.isNew) delete action.payload.isNew;
			return [
				...state,
				Object.assign({}, action.payload, {id: newId})
			];

		case types.UPDATE_CHECKLIST_SUCCESS:
			let index = state.map(function(checklist) {
				return checklist.id;
			}).indexOf(action.payload.id),
				checklists = [...state];

			checklists.splice(index, 1, action.payload);
			return checklists;

		default:
			return state;
	}
}

export function checklistsReducer(state: checklistModel[] = initialState.checklists, action: ActionsChecklists) {
	switch (action.type) {
		case types.LOAD_CHECKLISTS_SUCCESS:
			return action.payload;

		default:
			return state;
	}
}