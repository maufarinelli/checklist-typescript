import * as types from './actionTypes';
import { ChecklistsApi } from '../api/mockChecklistsApi';
import { ChecklistModel } from '../interfaces';

export function loadChecklistsSuccess(checklists: ChecklistModel[] | {}) {
    return {type: types.LOAD_CHECKLISTS_SUCCESS, payload: checklists};
}

export function createChecklistSuccess(checklist: any) {
    return {type: types.CREATE_CHECKLIST_SUCCESS, payload: checklist};
}

export function updateChecklistSuccess(checklist: any) {
    return {type: types.UPDATE_CHECKLIST_SUCCESS, payload: checklist};
}

export function loadChecklists() {
    return function dispatchChecklists(dispatch: any): Promise<void> {
        return ChecklistsApi.getAllCourses().then(checklists => {
            dispatch(loadChecklistsSuccess(checklists));
        }).catch(error => {
            throw(error);
        });
    };
}

export function saveChecklist(checklist: any): any {
    return function dispatchSaveChecklist(dispatch: any): any {
        return ChecklistsApi.saveChecklist(checklist)
            .then(savedChecklist => {
                !checklist.isNew ?
                    dispatch(updateChecklistSuccess(savedChecklist)) :
                    dispatch(createChecklistSuccess(savedChecklist));
            }).catch(error => {
                throw(error);
            });
    };
}