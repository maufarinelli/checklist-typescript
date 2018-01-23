import React from 'react';
import _ from 'lodash';
import './text-input.css';

interface TextInputProps {
	type: string,
	id?: string,
	name?: string,
	label?: string,
	value?: string,
	checked?: boolean,
	onAdd?: (item: object) => void,
	onUpdate?: (title: string) => void
}

interface TextInputState {
	id?: string,
	name?: string,
	label?: string,
	value?: string,
	checked?: boolean
}

export class TextInput extends React.Component<TextInputProps, TextInputState> {
	constructor(props: TextInputProps) {
		super(props);

		this.state = {
			id: this.props.id,
			name: this.props.name || '',
			value: this.props.value || '',
			label: this.props.label || '',
			checked: this.props.checked || false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}
	
	handleChange(event: React.FormEvent<HTMLInputElement>): void {
		this.setState({
			id: this.props.id === 'checklist-title' ? this.props.id : _.uniqueId(event.currentTarget.value + '_'),
			name: event.currentTarget.value,
			value: event.currentTarget.value,
			label: event.currentTarget.value.substring(0, 1).toUpperCase() + event.currentTarget.value.substring(1),
			checked: false
		});
	}

	handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>): void {
		if (event.key === 'Enter') {
			event.preventDefault();

			if (event.currentTarget.id === 'checklist-title') {
				this.props.onUpdate(this.state.value);
			} else {
				this.props.onAdd(this.state);
			}

			this.setState((prevState, props) => ({
				id: '',
				name: '',
				value: '',
				label: '',
				checked: false
			}));
		}
	}

	render() {
		return (
			<div className={"form-group " + (this.props.type === 'input-add-item' ? 'checklist-input-add-item' : '')}>
				{this.props.label ? <label htmlFor={this.props.id}>{this.props.label}</label> : ''}
				<div>
					<input
						className="form-control"
						type="text"
						name={this.state.name}
						id={this.state.id}
						value={this.state.value}
						onChange={this.handleChange}
						onKeyPress={this.handleKeyPress}
						placeholder={this.state.label ? '' : 'Add a new item'}/>
				</div>
			</div>
		);
	}
}

export default TextInput;