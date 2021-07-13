import {
  renderHook,
  RenderHookOptions,
  RenderHookResult,
} from '@testing-library/react-hooks';
import { AppProvider } from '../hooks/AppProvider';

function customRenderHook<TProps, TResult>(
  callback: (props: TProps) => TResult,
  options?: RenderHookOptions<TProps>,
): RenderHookResult<TProps, TResult> {
  return renderHook<TProps, TResult>(callback, {
    wrapper: AppProvider,
    ...options,
  });
}

export * from '@testing-library/react-hooks';

export { customRenderHook as renderHook };
