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

test('InputField changes the text after click', () => {
  const component = shallow(<TestComponent type="string" />);

  expect(component.prop('value')).toBe(undefined);

  component
    .dive()
    .find('input')
    .at(0)
    .simulate('change', { target: { value: 'Test-42' } });

  expect(component.prop('value')).toBe('Test-42');
});
