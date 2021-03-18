import { shallow } from 'enzyme';
import React from 'react';
import { useStoryFieldProps } from 'storybook/utils';
import { InputField } from './InputField';

const TestComponent = props => {
  const { type } = props;
  const fieldProps = useStoryFieldProps(props);
  return (
    <InputField schema={{ type, title: 'Primitive field' }} {...fieldProps} />
  );
};

test('InputField type=text changes', () => {
  const component = shallow(<TestComponent type="string" />);

  expect(component.prop('value')).toBe(undefined);

  component
    .dive()
    .find('input')
    .at(0)
    .simulate('change', { target: { value: 'Test-42' } });

  expect(component.prop('value')).toBe('Test-42');
});

test('InputField type=number changes', () => {
  const component = shallow(<TestComponent type="number" />);

  expect(component.prop('value')).toBe(undefined);

  component
    .dive()
    .find('input')
    .at(0)
    .simulate('change', { target: { value: 'Tpscrt-42' } });

  console.log(component.props());
  expect(component.prop('value')).toBe(-42);

  component
    .dive()
    .find('input')
    .at(0)
    .simulate('change', { target: { value: '42' } });

  expect(component.prop('value')).toBe(42);
});

test('InputField type=integer check html attr', () => {
  const component = shallow(<TestComponent type="integer" />);

  expect(component.prop('value')).toBe(undefined);

  expect(!!component.dive().find('input').at(0).prop('step')).toBe(true);
});

test('InputField type=wrong', () => {
  const component = shallow(<TestComponent type="wrong" />);

  expect(component.prop('value')).toBe(undefined);

  expect(component.dive().find('input').exists()).toBe(false);
});
