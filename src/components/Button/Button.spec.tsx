/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// import initStoryshots from '@storybook/addon-storyshots';

// 👇 Imports a specific story for the test
import { Primary } from './Button.stories';

// initStoryshots();

describe('<Button />', () => {
  it('renders in the primary state', () => {
    render(<Primary {...Primary.args} />);
    expect(screen.getByRole('button')).toHaveTextContent('Click here');
    expect(screen.getByRole('button')).toMatchSnapshot();
  });
});
