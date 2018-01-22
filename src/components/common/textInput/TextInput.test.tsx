import expect from 'expect';
import React from 'react';
import {mount, shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import {TextInput} from './TextInput';

configure({ adapter: new Adapter() });

function setupComponent(spy) {
	const props = {
		type: 'test',
		onAdd: spy || function() {}
	};
	return shallow(<TextInput {...props} />);
}

function setupTextInputTitle(spy) {
	const props = {
		type: "horizontal-form",
		id: "checklist-title",
		label: "Title : ",
		name: "checklist-title",
		value: '',
		onUpdate: spy || function() {},
		onAdd: function() {}
	};
	return shallow(<TextInput {...props} />);
}

describe('TextInput tests', () => {
	it('should render an input text with a default initial state', () => {
		const component = setupComponent();

		expect(component.find('input').type()).toEqual('input');
		expect(component.state().value).toEqual('');
		expect(component.state().name).toEqual('');
		expect(component.state().id).toEqual(undefined);
		expect(component.state().label).toEqual('');

		expect(component.find('input').prop('placeholder')).toEqual('Add a new item');
	});

	it('should set state to the typed value', () => {
		const component = setupComponent();
		component.find('input').simulate('change', { target: { value: 'A' }});

		expect(component.state().value).toEqual('A');

		component.find('input').simulate('change', { target: { value: 'abc' }});
		expect(component.state().value).toEqual('abc');
		expect(component.state().label).toEqual('Abc');
	});

	it('should create a checklist item when user click Enter', () => {
		const spyOnAdd = sinon.spy();
		const component = setupComponent(spyOnAdd);

		component.find('input').simulate('change', { target: { value: 'Abcd' }});
		component.find('input').simulate('keyPress', {
			key: 'Enter',
			keyCode: 13,
			which: 13,
			preventDefault: () => {},
			currentTarget: {id: 'x'}
		});

		expect(spyOnAdd.calledOnce).toEqual(true);
		expect(component.state().value).toEqual('');
	});

	it('should  render an input text with a default initial state to set title', function() {
		const component = setupTextInputTitle();

		expect(component.find('input').type()).toEqual('input');
		expect(component.state().value).toEqual('');
		expect(component.state().name).toEqual('checklist-title');
		expect(component.state().id).toEqual('checklist-title');
		expect(component.state().label).toEqual('Title : ');

		expect(component.find('input').prop('placeholder')).toEqual('');
	});

	it('should create a checklist title when user click Enter', () => {
		const spyOnUpdate = sinon.spy();
		const component = setupTextInputTitle(spyOnUpdate);

		component.find('input').simulate('change', { target: { value: 'Abcd' }});
		component.find('input').simulate('keyPress', {
			key: 'Enter',
			keyCode: 13,
			which: 13,
			preventDefault: () => {},
			currentTarget: {id: 'checklist-title'}
		});
		expect(spyOnUpdate.calledOnce).toEqual(true);
		expect(component.state().value).toEqual('');
	});
});