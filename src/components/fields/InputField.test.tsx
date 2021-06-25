import { shallow } from 'enzyme';
import React from 'react';
import { Basics, InitialValue } from './InputField.stories';

test('handle first render value', () => {
  const withoutDefaultValue = shallow(<Basics type="string" />);
  expect(withoutDefaultValue.prop('value')).toBe(undefined);
  const hasDefaultValue = shallow(<InitialValue type="string" />);
  expect(hasDefaultValue.prop('value')).toBe('lorem');
});

test('handle change for type="text"', () => {
  const component = shallow(<Basics type="string" />);
  const element = component.dive().find('input').at(0);
  element.simulate('change', { target: { value: 'Test-42' } });
  expect(component.prop('value')).toBe('Test-42');
});

test('handle change for type="number"', () => {
  const component = shallow(<Basics type="number" />);
  const element = component.dive().find('input').at(0);
  element.simulate('change', { target: { value: 'Tpscrt-42' } });
  expect(component.prop('value')).toBeNaN();
  element.simulate('change', { target: { value: '42' } });
  expect(component.prop('value')).toBe(42);
});

test('set "step" attribute for type="integer"', () => {
  const component = shallow(<Basics type="integer" />);
  expect(!!component.dive().find('input').at(0).prop('step')).toBe(true);
});

test('return null for type="wrong"', () => {
  const component = shallow(<Basics type="wrong" />);
  expect(component.dive().find('input').exists()).toBe(false);
});
