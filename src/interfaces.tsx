export interface checklistModel {
    id: number;
    title: string;
    items:{
        id: string,
        name: string,
        value: string,
        label: string,
        checked: boolean
    }[]
}

export interface stateModel {
    checklists: checklistModel[] | []
}

export interface checklistItemModel {
    id: string,
    name: string,
    value: string,
    label: string,
    checked: boolean
}