export interface checklistModel {
    id: number;
    title: string;
    items: checklistItemModel[];
    isNew?: boolean;
}

export interface stateModel {
    checklists: checklistModel[];
}

export interface checklistItemModel {
    id: string;
    name: string;
    value: string;
    label: string;
    checked: boolean;
}

export interface ActionsChecklist {
    type: string;
    payload: checklistModel;
}

export interface ActionsChecklists {
    type: string;
    payload: checklistModel[];
}