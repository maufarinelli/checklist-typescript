export interface actions {
    type: string;
    payload: checklist[] | checklist;
}

export const LOAD_CHECKLISTS_SUCCESS: string = 'LOAD_CHECKLISTS_SUCCESS';
export const CREATE_CHECKLIST_SUCCESS: string = 'CREATE_CHECKLIST_SUCCESS';
export const UPDATE_CHECKLIST_SUCCESS: string = 'UPDATE_CHECKLIST_SUCCESS';
