import expect from 'expect';
import React from 'react';
import { MemoryRouter } from 'react-router'
import {mount, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import {AllCheckLists} from './AllCheckLists';

configure({ adapter: new Adapter() });

const allChecklists = [
	{
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
	},
	{
		id: 2,
		title: 'Title 2',
		items: [{
			id: '1',
			name: 'test',
			label: 'Test',
			checked: false
		},
			{
				id: '2',
				name: 'test2',
				label: 'Test2',
				checked: true
			},
			{
				id: '3',
				name: 'test3',
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
			label: 'Test',
			checked: true
		},
			{
				id: '2',
				name: 'test2',
				label: 'Test2',
				checked: true
			},
			{
				id: '3',
				name: 'test3',
				label: 'Test3',
				checked: false
			}]
	}
];

function setupComponent() {
	const props = {
		list: allChecklists
	};
	return shallow(<AllCheckLists {...props} />);
}

describe('AllCheckLists test', () => {
	it('should render component with the given list', () => {
		const component = setupComponent();

		expect(component.find('.all-checklists').length).toBe(1);
		expect(component.find('h1').text()).toEqual('All checklists');

		expect(component.find('.list-group').length).toBe(1);
		expect(component.find('.list-group-item').length).toBe(3);

		expect(component.find('.list-group-item').first().text()).toEqual('Title 1');
		expect(component.find('.list-group-item').last().text()).toEqual('Title 3');
	});
});