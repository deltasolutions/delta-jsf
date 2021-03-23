import { mount, shallow } from 'enzyme';
import React from 'react';
import { Basic, Filled, If } from './ObjectField.stories';

test('init value test', () => {
  const withoutDefaultValue = shallow(<Basic />);
  expect(withoutDefaultValue.prop('value')).toBe(undefined);

  const withDefaultValue = shallow(<Filled />);
  expect(withDefaultValue.prop('value')).toEqual({
    a: 2,
    b: 'test-42',
    c: [42, 24]
  });
});

test('if then', () => {
  const component = mount(<If />);

  expect(component.find('.djsf-primitive')).toHaveLength(2);

  component
    .find('.djsf-primitive')
    .at(1)
    .find('input')
    .simulate('change', { target: { value: '5' } });

  expect(component.find('.djsf-primitive')).toHaveLength(3);
});
