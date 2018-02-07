import React from 'react';
import ChecklistItem from '../checklistItem/ChecklistItem';
import TextInput from '../common/textInput/TextInput';
import Title from '../common/title/Title';
import './list-form.css';
import { ChecklistModel } from '../../interfaces';

interface ListFormProps {
    checklist: ChecklistModel;
    onAddItem: (item: object) => void;
    onDeleteItem: (event: React.FormEvent<HTMLButtonElement>) => void;
    onUpdateTitle: (title: string) => void;
    onCheckboxChange: (event: React.FormEvent<HTMLInputElement>) => void;
    onSaveChecklist: (event: React.FormEvent<HTMLButtonElement>) => void;
}

export const ListForm = ({checklist, onAddItem, onDeleteItem, onUpdateTitle, onCheckboxChange, onSaveChecklist}: ListFormProps) => {
    let textInputTitleProps = {
            type: 'horizontal-form',
            id: 'checklist-title',
            label: 'Title : ',
            name: 'checklist-title',
            value: checklist.title,
            onUpdate: onUpdateTitle
        },
        textInputAddItemProps: { type: string, onAdd: (item: object) => void } = {
            type: 'input-add-item',
            onAdd: onAddItem
        };

    return (
        <div>
            <Title checklistTitle={checklist.title}/>
            <form className="checklist-form">
                <TextInput {...textInputTitleProps} />

                {checklist.items.map(listItem => {
                    return <ChecklistItem
                        key={listItem.id}
                        id={listItem.id}
                        name={listItem.name}
                        label={listItem.label}
                        checked={listItem.checked}
                        onCheckboxChange={onCheckboxChange}
                        onDelete={onDeleteItem}
                    />;
                })}

                <TextInput {...textInputAddItemProps} />

                <button type="button" onClick={onSaveChecklist}>Save</button>
            </form>
        </div>
    );
};

export default ListForm;