import { defaults } from 'src/defaults';
import { useFormManager } from 'src/hooks';
import { FormProps } from 'src/models';
import { FormManagerOptions } from 'src/models';

export const useStoryFormProps = <T extends unknown>(
  options: FormManagerOptions<T>
): FormProps<T> => {
  const manager = useFormManager({
    ...options,
    registry: defaults.registry
  });
  return {
    manager,
    children: (
      <div style={{ marginTop: '1rem' }}>
        <button type="submit">
          {manager.isSubmitted ? 'Submit again' : 'Submit'}
        </button>
      </div>
    )
  };
};
