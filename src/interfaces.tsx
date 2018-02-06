export interface ChecklistModel {
    id: number;
    title: string;
    items: ChecklistItemModel[];
    isNew?: boolean;
}

export interface StateModel {
    checklists: ChecklistModel[];
}

export interface ChecklistItemModel {
    id: string;
    name: string;
    value: string;
    label: string;
    checked: boolean;
}

export interface ActionsChecklist {
    type: string;
    payload: ChecklistModel;
}

export interface ActionsChecklists {
    type: string;
    payload: ChecklistModel[];
}