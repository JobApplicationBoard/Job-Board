/**
 * @jest-environment jsdom
 */

// Import modules necessary for tests
import React from "react";
import { render, within } from '@testing-library/react';
import '@testing-library/jest-dom'

// Import component & redux store
import Login from "../client/components/Login";

describe('Unit testing Login component', () => {

  describe('Rendered form', () => {
    let form;

    // render the component
    beforeEach(() => {
      form = render(<Login />);
    })
    
    it('Has two input fields username & password', () => {
      expect(form.queryByPlaceholderText('username')).toBeInTheDocument();
      expect(form.queryByPlaceholderText('password')).toBeInTheDocument();
    });

    it('Input fields have labels', () => {
      let usernameInput = form.queryByPlaceholderText('username');
      let passwordInput = form.queryByPlaceholderText('password');
      expect(form.getByText(/Username:/)).toContainElement(usernameInput);
      expect(form.getByText(/Password:/)).toContainElement(passwordInput);
    });

    // has a button that says log in
    it('Has a button that says Create Account and a button that says Log In', () => {
      expect(form.getByRole('button', { name: /log in/i })).toBeInTheDocument();
      expect(form.getByRole('button', { name: /Create Account/i })).toBeInTheDocument();
    });
  })

});