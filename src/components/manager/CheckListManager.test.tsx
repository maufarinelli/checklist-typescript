import expect from 'expect';
import React from 'react';
import { MemoryRouter } from 'react-router'
import {mount, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import {CheckListManager} from './CheckListManager';

configure({ adapter: new Adapter() });

const mockChecklist = [{
    id: 1,
    title: 'Title 1',
    items: [{
        id: '1',
        name: 'test',
        label: 'Test',
        checked: true
    },
    {
        id: '2',
        name: 'test2',
        label: 'Test2',
        checked: false
    },
    {
        id: '3',
        name: 'test3',
        label: 'Test3',
        checked: true
    }]
}];

function setupComponent(spy) {
    const props = {
        checklist: mockChecklist[0],
      actions: {
				saveChecklist: spy || function() {}
      }
    };
    return shallow(<CheckListManager {...props} />);
}

describe('CheckListManager tests', () => {
    it('should render an CheckListManager with a default initial state', () => {
        const component = setupComponent();
        expect(component.state().checklist).toEqual(mockChecklist[0]);
    });

	it('should add item', () => {
	    const spySave = sinon.spy();
		const component = setupComponent(spySave);
		const newItem = {
			id: '4',
			name: 'test4',
			label: 'Test4',
			checked: true
		};

		component.prop('onAddItem')(newItem);
		expect(component.state().checklist.items.length).toBe(4);
		expect(component.state().checklist.items[3]).toEqual(newItem);

		expect(spySave.calledOnce).toEqual(true);
	});

	it('should delete item', () => {
		const spySave = sinon.spy();
		const component = setupComponent(spySave);
		const event = {
			target: {
			    dataset: {
			        id: '3'
          }
      },
			preventDefault: function() {}
		};

		const updatedChecklistItems = mockChecklist[0].items.filter(item => {
			return item.id !== event.target.dataset.id;
		});
		const updatedChecklist = [...mockChecklist];
		updatedChecklist[0].items = updatedChecklistItems;

		component.prop('onDeleteItem')(event);

		expect(spySave.withArgs(updatedChecklist[0]).calledOnce).toEqual(true);
	});

	it('should update title', () => {
		const spySave = sinon.spy();
		const component = setupComponent(spySave);
		const newTitle = 'New Title';
		const updatedChecklist = Object.assign({}, mockChecklist[0], {title: newTitle});

		component.prop('onUpdateTitle')(newTitle);

		expect(spySave.withArgs(updatedChecklist).calledOnce).toEqual(true);
  });

	it('should change the checkbox state', () => {
		const spySave = sinon.spy();
		const component = setupComponent(spySave);
		const event = {
			target: {id: '3', checked: false},
			preventDefault: function() {}
		};
		const updatedChecklistItems = mockChecklist[0].items.map(item => {
			if(item.id === event.target.id) {
				return {
					id: item.id,
					name: item.name,
					label: item.label,
					checked: event.target.checked
				};
			}
		});
		const updatedChecklist = Object.assign({}, mockChecklist[0], {items: updatedChecklistItems});

		component.prop('onCheckboxChange')(event);

		expect(spySave.withArgs(updatedChecklist).calledOnce).toEqual(false);
	});
});