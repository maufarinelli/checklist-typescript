import React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';	
import {withRouter} from 'react-router-dom';
import {bindActionCreators, Dispatch} from 'redux';
import { saveChecklist } from '../../actions/checklistsActions';
import ListForm from './ListForm';
import {stateModel, checklistModel, checklistItemModel} from '../../interfaces';

type checklist = {checklist: checklistModel};
interface checklistProps extends RouteComponentProps<any>{
	checklist: checklistModel,
	newChecklistId?: number,
	actions: any,
	match: {
		params: {
			id: string
		},
		isExact: boolean;
		path: string;
		url: string;
	}
}

interface checklistStateModel extends Array<checklistModel> {}

interface HTMLButtonElementModel extends HTMLButtonElement {
	id: string
}

export class CheckListManager extends React.Component<checklistProps, any> {
	constructor(props: checklistProps) {
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

	onAddItem(item: checklistItemModel): void {
		let updatedChecklist = Object.assign({}, this.state.checklist, {items: [...this.state.checklist.items, item]});
		this.setState((prevState: stateModel) => ({
			checklist: updatedChecklist
		}));

		this.props.actions.saveChecklist(updatedChecklist);

		if(this.isNewChecklist()) {
			this.changeRoot();
		}
	}

	onDeleteItem(event: React.FormEvent<HTMLButtonElementModel>) {
		let updatedItems = this.state.checklist.items.filter((item: checklistItemModel) => {
			return item.id !== event.currentTarget.id;
		});

		let updatedChecklist = Object.assign({}, this.state.checklist, {items: updatedItems});
		this.props.actions.saveChecklist(updatedChecklist);

		if(this.isNewChecklist()) {
			this.changeRoot();
		}

		event.preventDefault();
	}

	onUpdateTitle(title: string): void {
		let updatedChecklist = Object.assign({}, this.state.checklist, {title: title});
		this.props.actions.saveChecklist(updatedChecklist);

		if(this.isNewChecklist()) {
			this.changeRoot();
		}
	}

	onCheckboxChange(event: React.FormEvent<HTMLInputElement>) {
		let updatedItems = this.state.checklist.items.map((item: checklistItemModel) => {
			if(item.id === event.currentTarget.id) {
				return {
					id: item.id,
					name: item.name,
					label: item.label,
					checked: event.currentTarget.checked
				};
			}
			else {
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

function getChecklistById(checklists: checklistStateModel, id: number): checklistModel {
	return checklists.filter(checklist => checklist.id === id)[0];
}

function getNextId(checklists: checklistStateModel): number {
	return (checklists.length > 0) ? checklists[checklists.length - 1].id + 1 : 1;
}

function mapStateToProps(state: stateModel, ownProps: checklistProps): {checklist: checklistModel, newChecklistId?: number} {
	const checklistId = parseInt(ownProps.match.params.id, 10);
	let newChecklistId,
		defaultChecklist: checklistModel = {
			id: 1,
			title: '',
			items: [],
			isNew: true
		},
		checklist;

	if(!checklistId) {
		checklist = Object.assign({}, defaultChecklist, {id: getNextId(state.checklists)});
		newChecklistId = checklist.id;
	}
	else {
		checklist = getChecklistById(state.checklists, checklistId) || defaultChecklist;
	}

	return {
		checklist: checklist,
		newChecklistId: newChecklistId
	};
}

function mapDispatchToProps(dispatch: Dispatch<stateModel>): {actions: (checklist: any) => Promise<object>} {
	return {
		actions: bindActionCreators(saveChecklist, dispatch)
	};
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(CheckListManager)
)