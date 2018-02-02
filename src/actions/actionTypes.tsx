import { checklistModel } from '../interfaces';

export interface actions {
    type: string;
    payload: checklistModel[] | checklistModel;
}

export const LOAD_CHECKLISTS_SUCCESS: string = 'LOAD_CHECKLISTS_SUCCESS';
export const CREATE_CHECKLIST_SUCCESS: string = 'CREATE_CHECKLIST_SUCCESS';
export const UPDATE_CHECKLIST_SUCCESS: string = 'UPDATE_CHECKLIST_SUCCESS';
