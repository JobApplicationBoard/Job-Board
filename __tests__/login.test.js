// Import modules necessary for tests
import React from "react";
import { render } from '@testing-library/react';

// Import component & redux store
import Login from "../client/components/Login";
import store from "../client/store";

describe('Unit testing Login component', () => {

  describe('Rendered form', () => {
    let form;

    // render the component
    beforeAll(() => {
      form = render(<Login />);
    })
    
    it('Has two input fields username & password', () => {
      expect(form.getByPlaceholder('username').toBeTruthy());
      expect(form.getByPlaceholder('password').toBeTruthy());
      expect(form.getByPlaceholder('hello').toBeTruthy());
    });

    it('Input fields have labels', () => {

    });

    // has a button that says log in
    it('Has a button that says Log In', () => {

    });
  })

});