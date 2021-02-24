import { configureActions } from '@storybook/addon-actions';
import 'src/index.scss';

configureActions({
  depth: 100,
  limit: 20
});

export const parameters = {};
