import { shallow } from 'enzyme';
import React from 'react';
import { Basic, Filled } from './ArrayField.stories';

it('handle first render value', () => {
  const withoutDefaultValue = shallow(<Basic />);
  expect(withoutDefaultValue.prop('value')).toBe(undefined);
  const hasDefaultValue = shallow(<Filled />);
  expect(hasDefaultValue.prop('value')).toEqual(['12345', '56789']);
});

it('add item', () => {
  const component = shallow(<Basic />);
  expect(component.prop('value')).toBe(undefined);
  component
    .dive()
    .dive()
    .findWhere(v => v.type() === 'button' && v.text() === 'add')
    .simulate('click');
  expect(component.prop('value')).toEqual([null]);
});

it('remove item', () => {
  const component = shallow(<Filled />);
  expect(component.prop('value')).toEqual(['12345', '56789']);
  component
    .dive()
    .dive()
    .findWhere(v => v.type() === 'button' && v.text() === 'delete')
    .at(0)
    .simulate('click');
  expect(component.prop('value')).toEqual(['56789']);
});
