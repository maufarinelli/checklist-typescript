import expect from 'expect';
import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ListForm} from './ListForm';
import {checklistModel} from '../../interfaces';

configure({ adapter: new Adapter() });

function setupComponent({checklist = {id: 0, title: '', items: []} }) {
    const props = {
        checklist: checklist,
        onAddItem: function() {},
        onDeleteItem: function() {},
        onUpdateTitle: function() {},
        onCheckboxChange: function() {}
    };
    return shallow(<ListForm {...props} />);
}


describe('ListForm tests', () => {
    it('should render an ListForm with a default initial state', () => {
        const component = setupComponent({});

        expect(component.find('Title').length).toBe(1);
        expect(component.find('form.checklist-form').length).toBe(1);

        expect(component.find('form').childAt(0).prop('id')).toEqual('checklist-title');
        expect(component.find('form').childAt(1).prop('type')).toEqual('input-add-item');
    });

    it('should render an ListForm with a the item given', () => {
        const checklist: checklistModel = {
            id: 1,
            title: 'Title 1',
            items: [{
                id: '1',
                name: 'test',
                label: 'Test',
                checked: true
            }]
        };
        const component = setupComponent({checklist});

        expect(component.find('Title').length).toBe(1);
        expect(component.find('form.checklist-form').length).toBe(1);

        expect(component.find('form').childAt(0).prop('id')).toEqual('checklist-title');
        expect(component.find('form').childAt(1).prop('name')).toEqual('test');
        expect(component.find('form').childAt(2).prop('type')).toEqual('input-add-item');
    });
});