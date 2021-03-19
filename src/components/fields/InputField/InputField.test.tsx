import { shallow } from 'enzyme';
import React from 'react';
import { Basic, Filled } from './InputField.stories';

test('InputField init value test', () => {
  const withoutDefaultValue = shallow(<Basic type="string" />);
  expect(withoutDefaultValue.prop('value')).toBe(undefined);

  const hasDefaultValue = shallow(<Filled type="string" />);
  expect(hasDefaultValue.prop('value')).toBe('lorem');
});

test('InputField type=text change', () => {
  const component = shallow(<Basic type="string" />);

  component
    .dive()
    .find('input')
    .at(0)
    .simulate('change', { target: { value: 'Test-42' } });

  expect(component.prop('value')).toBe('Test-42');
});

test('InputField type=number change', () => {
  const component = shallow(<Basic type="number" />);

  component
    .dive()
    .find('input')
    .at(0)
    .simulate('change', { target: { value: 'Tpscrt-42' } });

  expect(component.prop('value')).toBeNaN();

  component
    .dive()
    .find('input')
    .at(0)
    .simulate('change', { target: { value: '42' } });

  expect(component.prop('value')).toBe(42);
});

test('InputField type=integer check step attr', () => {
  const component = shallow(<Basic type="integer" />);

  expect(!!component.dive().find('input').at(0).prop('step')).toBe(true);
});

test('InputField type=wrong', () => {
  const component = shallow(<Basic type="wrong" />);

  expect(component.dive().find('input').exists()).toBe(false);
});
