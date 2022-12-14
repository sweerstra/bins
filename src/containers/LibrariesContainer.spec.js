import React from 'react';
import LibrariesContainer from './LibrariesContainer';
import { createMockBin } from '../api/__mocks__/bins';
import { cleanup, fireEvent, render } from '../test-utils';

const onHide = jest.fn();
const setup = props => render(
  <LibrariesContainer onHide={onHide} {...props} />
);

const LODASH = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js';

describe('<LibrariesContainer />', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('shows libraries modal when visible', () => {
    const { getByTestId } = setup({ isVisible: true });

    expect(getByTestId('libraries-modal')).toBeVisible();
  });

  it('adds and removes script', () => {
    const { queryByText, getByTestId } = setup({ isVisible: true });

    // adding
    const input = getByTestId('libraries-input');
    fireEvent.change(input, { target: { value: LODASH } });
    fireEvent.submit(getByTestId('libraries-form'));
    expect(queryByText('lodash.min.js')).toBeInTheDocument();
    const addedScript = document.body.querySelector(`script[src="${LODASH}"]`);
    expect(addedScript).toBeInTheDocument();

    // removing
    fireEvent.click(queryByText('lodash.min.js').parentNode.querySelector('span'));
    expect(queryByText('lodash.min.js')).not.toBeInTheDocument();
    const removedScript = document.body.querySelector(`script[src="${LODASH}"]`);
    expect(removedScript).not.toBeInTheDocument();
  });
});
