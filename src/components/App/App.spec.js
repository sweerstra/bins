import React from 'react';
import App from './App';
import { AuthContext } from '../../context/Auth';
import { cleanup, fireEvent, renderWithRouter, wait, waitForElement } from '../test-utils';
import { checkAuth } from '../api/user';

jest.mock('../api/user');

const login = jest.fn();
const logout = jest.fn();
const setup = ({ isAuthenticated }, routerParams = {}) => renderWithRouter(
  <AuthContext value={{ isAuthenticated, login, logout }}>
    <App />
  </AuthContext>,
  routerParams
);

describe('<App />', () => {
  afterEach(() => {
    cleanup();
    verify.mockClear();
  });

  it('should render App', () => {
    const { container } = setup();
    expect(container).toBeInTheDocument();
  });
});
