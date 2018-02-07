import { ChecklistModel } from '../interfaces';

const delay: number = 300;
let allChecklists: ChecklistModel[] = [
    {
        id: 1,
        title: 'Title 1',
        items: [{
            id: '1',
            name: 'test',
            value: 'test',
            label: 'Test',
            checked: true
        },
        {
            id: '2',
            name: 'test2',
            value: 'test2',
            label: 'Test2',
            checked: false
        },
        {
            id: '3',
            name: 'test3',
            value: 'test3',
            label: 'Test3',
            checked: true
        }]
    },
    {
        id: 2,
        title: 'Title 2',
        items: [{
            id: '1',
            name: 'test',
            value: 'test',
            label: 'Test',
            checked: false
        },
        {
            id: '2',
            name: 'test2',
            value: 'test2',
            label: 'Test2',
            checked: true
        },
        {
            id: '3',
            name: 'test3',
            value: 'test3',
            label: 'Test3',
            checked: false
        }]
    },
    {
        id: 3,
        title: 'Title 3',
        items: [{
            id: '1',
            name: 'test',
            value: 'test',
            label: 'Test',
            checked: true
        },
        {
            id: '2',
            name: 'test2',
            value: 'test2',
            label: 'Test2',
            checked: true
        },
        {
            id: '3',
            name: 'test3',
            value: 'test3',
            label: 'Test3',
            checked: false
        }]
    }
];

export class ChecklistsApi {
    static getAllCourses() {
        return new Promise((resolve) => {
            setTimeout(() => { resolve(allChecklists); }, delay);
        });
    }

    static saveChecklist(checklist: ChecklistModel) {
        checklist = Object.assign({}, checklist); // to avoid manipulating object passed in.
        const checklists = [...allChecklists];
        return new Promise((resolve) => {
            setTimeout(() => {
                if (checklist.id) {
                    const existingChecklistIndex = checklists.findIndex(a => a.id === checklist.id);
                    checklists.splice(existingChecklistIndex, 1, checklist);
                }
                resolve(checklist);
            }, delay);
        });
    }
}