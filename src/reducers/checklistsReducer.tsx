import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {checklistModel} from '../interfaces';

export function checklistsReducer(state:checklistModel[] = initialState.checklists, action: types.actions) {
	switch (action.type) {
		case types.LOAD_CHECKLISTS_SUCCESS:
			return action.payload.checklists;

		case types.CREATE_CHECKLIST_SUCCESS:
			var newId = (state.length > 0) ? state[state.length - 1].id + 1 : 1;
			delete action.payload.checklist.isNew;
			return [
				...state,
				Object.assign({}, action.payload.checklist, {id: newId})
			];

		case types.UPDATE_CHECKLIST_SUCCESS:
			let index = state.map(function(checklist) {
				return checklist.id;
			}).indexOf(action.payload.checklist.id),
				checklists = [...state];

			checklists.splice(index, 1, action.payload.checklist);
			return checklists;

		default:
			return state;
	}
}