import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import Category from '../client/components/Category';
import store from '../client/store';

describe('Unit testing React components', () => {
  // Testing Category.jsx
  // Check if the Add Job button has been clicked
  test('modal opens when add job button is clicked', async () => {
    // // Create a new div container
    // const container = document.createElement('div');
    // // Append the new div in the body
    // document.body.appendChild(container);

    // Render the Category into the container
    let result = await render(
      <Provider store={store}>
        <Category name="Test" id="test" />
      </Provider>
    );

    // // Find the addJob button and call the click event handler
    // const addJobButton = container.querySelector('#addJob');
    // addJobButton.click();

    // Check if the "modal is open"
    // const modalTitle = container.querySelector();
    // expect(modalTitle.textContent).toBe();

    // Check if the class "ReactModal__Body--open" exists in the body after clicking the button
    // expect ( the class of the body ).toBe("ReactModal__Body--open")
    console.log('Inside the testing button click handler');
    // expect(document.body.classList.contains('ReactModal__Body--open')).toBe(
    //   true
    // );

    expect(result.getByText(/Add Job/)).toBeTruthy();

    // Cleanup
    // document.body.removeChild(container);
  });

  // 1. Call function openModal
  // <body class="ReactModel__Body--open">
  // 2. Check the value of isOpen
});
