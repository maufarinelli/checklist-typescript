import React from 'react';
import './checklist-item.css';

interface ChecklistItemProps {
    id: string;
    name: string;
    label: string;
    checked: boolean;
    onCheckboxChange: (event: React.FormEvent<HTMLInputElement>) => void;
    onDelete: (event: React.FormEvent<HTMLButtonElement>) => void;
}

interface ChecklistItemState {
    checked: boolean;
}

class ChecklistItem extends React.Component<ChecklistItemProps, ChecklistItemState> {
    constructor(props: ChecklistItemProps) {
        super(props);

        this.state = {
            checked: this.props.checked
        };

        this.hendleCheckboxChange = this.hendleCheckboxChange.bind(this);
    }

    hendleCheckboxChange(event: React.FormEvent<HTMLInputElement>) {
        const value: boolean = event.currentTarget.checked;

        this.props.onCheckboxChange(event);

        this.setState({
            checked: value
        });
    }

    render() {
        const {id, name, label, onDelete} = this.props;
        const {checked} = this.state;
        return (
            <div className="form-check checkbox-input">
                <label className="form-check-label">
                    <input
                        id={id}
                        className="form-check-input"
                        type="checkbox"
                        name={name}
                        checked={checked}
                        onChange={this.hendleCheckboxChange}
                    />
                    {label}
                </label>
                <button id={id} className="btn btn-sm btn-danger" onClick={onDelete}>x</button>
            </div>
        );
    }
}

export default ChecklistItem;