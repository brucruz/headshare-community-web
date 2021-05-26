/* eslint-disable import/no-extraneous-dependencies */
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';
import { AppProvider } from '../hooks/AppProvider';

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
): RenderResult {
  return render(ui, { wrapper: AppProvider, ...options });
}

export * from '@testing-library/react';

export { customRender as render };
