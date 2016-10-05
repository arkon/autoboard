import React from 'react';
import {shallow} from 'enzyme';
import NewCardForm from './NewCardForm';

it('loads the superclass in the form', () => {
  let testData = {
    name: "TheName",
    superclasses: "TheSuperclass",
    responsibilities: [],
    collaborators: []
  };
  let noAction = () => true;
  let component = shallow(
    <NewCardForm onAdd={noAction} onCancel={noAction} data={testData} />
  );

  expect(component.find('input#ncfSuperclass').props().defaultValue).toEqual(testData.superclasses);
});
