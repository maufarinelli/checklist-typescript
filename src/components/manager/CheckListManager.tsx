import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import {  bindActionCreators, Dispatch } from 'redux';
import { saveChecklist } from '../../actions/checklistsActions';
import ListForm from './ListForm';
import { StateModel, ChecklistModel, ChecklistItemModel } from '../../interfaces';

type checklist = { checklist: ChecklistModel };
interface ChecklistProps extends RouteComponentProps<any> {
    checklist: ChecklistModel;
    newChecklistId?: number;
    actions: any;
    match: {
        params: {
            id: string;
        },
        isExact: boolean;
        path: string;
        url: string;
    };
}

interface checklistStateModel extends Array<ChecklistModel> {}

interface HTMLButtonElementModel extends HTMLButtonElement {
    id: string;
}

export class CheckListManager extends React.Component<ChecklistProps, any> {
    constructor(props: ChecklistProps) {
        super(props);

        this.state = {
            checklist: Object.assign({}, this.props.checklist)
        };

        this.onAddItem = this.onAddItem.bind(this);
        this.onDeleteItem = this.onDeleteItem.bind(this);
        this.onUpdateTitle = this.onUpdateTitle.bind(this);
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
    }

    componentWillReceiveProps(nextProps: checklist): void {
        this.setState({checklist: nextProps.checklist});
    }

    isNewChecklist(): boolean {
        return !!this.props.newChecklistId;
    }

    changeRoot(): void {
        this.props.history.push(`/checklist/${this.props.newChecklistId}`);
    }

    onAddItem(item: ChecklistItemModel): void {
        let updatedChecklist = Object.assign({}, this.state.checklist, {items: [...this.state.checklist.items, item]});
        this.setState(() => ({
            checklist: updatedChecklist
        }));

        this.props.actions.saveChecklist(updatedChecklist);

        if (this.isNewChecklist()) {
            this.changeRoot();
        }
    }

    onDeleteItem(event: React.FormEvent<HTMLButtonElementModel>) {
        let updatedItems = this.state.checklist.items.filter((item: ChecklistItemModel) => {
            return item.id !== event.currentTarget.id;
        });

        let updatedChecklist = Object.assign({}, this.state.checklist, {items: updatedItems});
        this.props.actions.saveChecklist(updatedChecklist);

        if (this.isNewChecklist()) {
            this.changeRoot();
        }

        event.preventDefault();
    }

    onUpdateTitle(title: string): void {
        let updatedChecklist = Object.assign({}, this.state.checklist, {title: title});
        this.props.actions.saveChecklist(updatedChecklist);

        if (this.isNewChecklist()) {
            this.changeRoot();
        }
    }

    onCheckboxChange(event: React.FormEvent<HTMLInputElement>) {
        let updatedItems = this.state.checklist.items.map((item: ChecklistItemModel) => {
            if (item.id === event.currentTarget.id) {
                return {
                    id: item.id,
                    name: item.name,
                    label: item.label,
                    checked: event.currentTarget.checked
                };
            } else {
                return {
                    id: item.id,
                    name: item.name,
                    label: item.label,
                    checked: item.checked
                };
            }
        });
        let updatedChecklist = Object.assign({}, this.state.checklist, {items: updatedItems});
        this.props.actions.saveChecklist(updatedChecklist);
    }

    render() {
        return (
            <ListForm
                checklist={this.state.checklist}
                onAddItem={this.onAddItem}
                onDeleteItem={this.onDeleteItem}
                onUpdateTitle={this.onUpdateTitle}
                onCheckboxChange={this.onCheckboxChange}
            />
        );
    }
}

function getChecklistById(checklists: checklistStateModel, id: number): ChecklistModel {
    return checklists.filter(list => list.id === id)[0];
}

function getNextId(checklists: checklistStateModel): number {
    return (checklists.length > 0) ? checklists[checklists.length - 1].id + 1 : 1;
}

function mapStateToProps(state: StateModel, ownProps: ChecklistProps): {checklist: ChecklistModel, newChecklistId?: number} {
    const checklistId = parseInt(ownProps.match.params.id, 10);
    let newChecklistId,
        defaultChecklist: ChecklistModel = {
            id: 1,
            title: '',
            items: [],
            isNew: true
        },
        currentChecklist;

    if (!checklistId) {
        currentChecklist = Object.assign({}, defaultChecklist, {id: getNextId(state.checklists)});
        newChecklistId = currentChecklist.id;
    } else {
        currentChecklist = getChecklistById(state.checklists, checklistId) || defaultChecklist;
    }

    return {
        checklist: currentChecklist,
        newChecklistId: newChecklistId
    };
}

function mapDispatchToProps(dispatch: Dispatch<StateModel>): {actions: { saveChecklist:(checklist: any) => Promise<object>} } {
    return {
        actions: bindActionCreators({saveChecklist}, dispatch)
    };
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(CheckListManager)
);