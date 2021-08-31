import { useDefaults } from '../../hooks';
import { FieldProps } from '../../models';

export const NullField = (props: FieldProps) => {
  useDefaults(props);
  return null;
};
