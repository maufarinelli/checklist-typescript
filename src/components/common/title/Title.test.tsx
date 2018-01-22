import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
import sinon from 'sinon';
import TestUtils from 'react-addons-test-utils';
import {Title} from './Title';

function setupComponent() {
    const props = {
        checklistTitle: ''
    };
    
    return mount(<Title {...props} />);
}

describe('Title tests', () => {
    it('should render the title with a default initial state', () => {
        const component = setupComponent();

        expect(component.find('h1').text()).toEqual('Add a new checklist');
        //expect(component.find('h1').prop('class')).toEqual('checklist-title no-title');
    });
});
