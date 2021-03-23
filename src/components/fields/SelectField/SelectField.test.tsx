import { shallow } from 'enzyme';
import React from 'react';
import { Basic, Filled } from './SelectField.stories';

test('handle first render value', () => {
  const withoutDefaultValue = shallow(<Basic />);
  expect(withoutDefaultValue.prop('value')).toBe(undefined);
  const hasDefaultValue = shallow(<Filled />);
  expect(hasDefaultValue.prop('value')).toBe('2');
});

test('handle changes', () => {
  const component = shallow(<Basic />);
  expect(component.prop('value')).toBe(undefined);
  const selectElem = component.dive().find('select').at(0);
  selectElem.simulate('change', { target: { value: '1' } });
  expect(component.prop('value')).toBe('1');
  selectElem.simulate('change', { target: { value: '2' } });
  expect(component.prop('value')).toBe('2');
});
