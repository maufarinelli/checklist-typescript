import * as types from './actionTypes';
import {ChecklistsApi} from '../api/mockChecklistsApi';

interface checklist {
	id: number;
	title: string;
	items:{
		id: string,
		name: string,
		label: string,
		checked: boolean
	}[]
}

export function loadChecklistsSuccess(checklists: checklist[]) {
	return {type: types.LOAD_CHECKLISTS_SUCCESS, payload: checklists};
}

export function createChecklistSuccess(checklist: checklist) {
	return {type: types.CREATE_CHECKLIST_SUCCESS, payload: checklist};
}

export function updateChecklistSuccess(checklist: checklist) {
	return {type: types.UPDATE_CHECKLIST_SUCCESS, payload: checklist};
}

export function loadChecklists(): Promise<object> {
	return function dispatchChecklists(dispatch) {
		return ChecklistsApi.getAllCourses().then(checklists => {
			dispatch(loadChecklistsSuccess(checklists));
		}).catch(error => {
			throw(error);
		});
	};
}

export function saveChecklist(checklist): Promise<object> {
	return function(dispatch, getState) {
		return ChecklistsApi.saveChecklist(checklist)
			.then(savedChecklist => {
				!checklist.isNew ? dispatch(updateChecklistSuccess(savedChecklist)) : dispatch(createChecklistSuccess(savedChecklist));
			}).catch(error => {
				//dispatch(ajaxCallError(error));
				throw(error);
			});
	};
}