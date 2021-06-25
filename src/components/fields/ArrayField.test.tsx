import { shallow } from 'enzyme';
import React from 'react';
import { Basics, InitialValue } from './ArrayField.stories';

it('handle first render value', () => {
  const withoutDefaultValue = shallow(<Basics />);
  expect(withoutDefaultValue.prop('value')).toBe(undefined);
  const hasDefaultValue = shallow(<InitialValue />);
  expect(hasDefaultValue.prop('value')).toEqual(['12345', '56789']);
});

it('handle item addition', () => {
  const component = shallow(<Basics />);
  expect(component.prop('value')).toBe(undefined);
  component
    .dive()
    .dive()
    .findWhere(v => v.type() === 'button' && v.text() === 'Add')
    .simulate('click');
  expect(component.prop('value')).toEqual([null]);
});

it('handle item deletion', () => {
  const component = shallow(<InitialValue />);
  expect(component.prop('value')).toEqual(['12345', '56789']);
  component
    .dive()
    .dive()
    .findWhere(v => v.type() === 'button' && v.text() === 'Delete')
    .at(0)
    .simulate('click');
  expect(component.prop('value')).toEqual(['56789']);
});
