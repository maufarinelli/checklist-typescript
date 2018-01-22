import expect from 'expect';
import React from 'react';
import {mount, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import ChecklistItem from './ChecklistItem';

configure({ adapter: new Adapter() });

function setupComponent({id = '', name = '', label = '', checked = false, onDelete = function() {}} = {}) {
	const props = {
		id: id,
		name: name,
		label: label,
		checked: checked,
		onCheckboxChange: function() {},
		onDelete: onDelete
	};

	return shallow(<ChecklistItem {...props} />);
}

describe('Checklist tests', () => {
	let component;

	it('should render an ChecklistItem with a default initial state', () => {
		component = setupComponent();

		expect(component.find('input').prop('type')).toEqual('checkbox');
		expect(component.find('input').prop('name')).toEqual('');
		expect(component.find('input').prop('id')).toEqual('');
		expect(component.find('input').prop('checked')).toBeFalsy();

		expect(component.find('label').text()).toEqual('');

		expect(component.find('button').prop('data-id')).toEqual('');

		expect(component.state().checked).toBe(false);
	});

	it('should render an ChecklistItem with props given', () => {
		const config = {
			id: 'test-id',
			name: 'test-name',
			label: 'test-label',
			checked: true
		};
		component = setupComponent(config);

		expect(component.find('input').prop('type')).toEqual('checkbox');
		expect(component.find('input').prop('name')).toEqual('test-name');
		expect(component.find('input').prop('id')).toEqual('test-id');
		expect(component.find('input').prop('checked')).toBeTruthy();

		expect(component.find('label').text()).toEqual('test-label');

		expect(component.find('button').prop('data-id')).toEqual('test-id');

		expect(component.state().checked).toBe(true);
	});

	it('should change checked state', () => {
		component = setupComponent();

		expect(component.state().checked).toBe(false);
		component.find('input').simulate('change', {target: {checked: true}});

		expect(component.state().checked).toBe(true);
		component.find('input').simulate('change', {target: {checked: false}});
	});

	it('should call onDelete on button click', () => {
		const spyOnDelete = sinon.spy();
		const config = {
			id: 'test-id',
			name: 'test-name',
			label: 'test-label',
			checked: true,
			onDelete: spyOnDelete
		};

		component = setupComponent(config);

		component.find('button').simulate('click');
		expect(spyOnDelete.calledOnce).toEqual(true);
	});

	afterEach(function() {
		component = null;
	});
});