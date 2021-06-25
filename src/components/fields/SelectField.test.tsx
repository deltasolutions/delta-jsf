import { shallow } from 'enzyme';
import React from 'react';
import { Basics, InitialValue } from './SelectField.stories';

test('handle first render value', () => {
  const withoutDefaultValue = shallow(<Basics />);
  expect(withoutDefaultValue.prop('value')).toBe(undefined);
  const hasDefaultValue = shallow(<InitialValue />);
  expect(hasDefaultValue.prop('value')).toBe('2');
});

test('handle changes', () => {
  const component = shallow(<Basics />);
  const element = component.dive().find('select').at(0);
  expect(component.prop('value')).toBe(undefined);
  element.simulate('change', { target: { value: '1' } });
  expect(component.prop('value')).toBe('1');
  element.simulate('change', { target: { value: '2' } });
  expect(component.prop('value')).toBe('2');
});
