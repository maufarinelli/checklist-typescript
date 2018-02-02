export interface checklistModel {
    id: number;
    title: string;
    isNew?: boolean;
    items: checklistItemModel[]
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