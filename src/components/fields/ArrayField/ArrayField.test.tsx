import { mount, render, shallow } from 'enzyme';
import React from 'react';
import { Basic, Filled } from './ArrayField.stories';

test('ArrayField init value test', () => {
  const withoutDefaultValue = shallow(<Basic />);

  expect(withoutDefaultValue.prop('value')).toBe(undefined);

  const hasDefaultValue = shallow(<Filled />);

  expect(hasDefaultValue.prop('value')).toEqual(['12345', '56789']);
});

test('ArrayField add new field', () => {
  const component = shallow(<Basic />);

  expect(component.prop('value')).toBe(undefined);

  component
    .dive()
    .dive()
    .findWhere(w => w.type() === 'button' && w.text() === 'add')
    .simulate('click');

  expect(component.prop('value')).toEqual([null]);
});

test('ArrayField delete existing field', () => {
  const component = shallow(<Filled />);

  expect(component.prop('value')).toEqual(['12345', '56789']);

  component
    .dive()
    .dive()
    .findWhere(w => {
      return w.type() === 'button' && w.text() === 'delete';
    })
    .at(0)
    .simulate('click');

  expect(component.prop('value')).toEqual(['56789']);
});
