import React from 'react';
import EditorContainer from './EditorContainer';
import { createMockBin } from '../api/__mocks__/bins';
import { cleanup, fireEvent, render } from '../test-utils';
import { SelectedBinContext } from '../context/SelectedBin';

const setSelectedBin = jest.fn();
const onRun = jest.fn();
const setup = (selectedBin = {}) => render(
  <SelectedBinContext.Provider value={{ selectedBin, setSelectedBin }}>
    <EditorContainer onRun={onRun} />
  </SelectedBinContext.Provider>
);

describe('<EditorContainer />', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('runs code on ctrl + Enter', () => {
    setup(createMockBin('abcdef'));
    fireEvent.keyDown(window, { ctrlKey: true, key: 'Enter' });
    expect(onRun).toHaveBeenCalledTimes(1);
    expect(onRun).toHaveBeenCalledWith('console.log(\'abcdef\')');
  });
});
