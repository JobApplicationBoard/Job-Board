import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

import Category from '../client/components/Category';
import store from '../client/store';

describe('Unit testing React components', () => {
  // Testing Category.jsx
  // Check if the Add Job button has been clicked
  test('modal opens when add job button is clicked', async () => {
    // Render the Category into the container
    let result = await render(
      <Provider store={store}>
        <Category name="Test" id="test" />
      </Provider>
    );

    console.log('Inside the testing button click handler');

    // Grab the button on <Category />, rendered in the result variable
    const addButton = screen.getByRole('button');
    fireEvent.click(addButton);

    // Test if the click button handler gets the text "Create a new Job" in <Category/>
    expect(result.getByText(/Create a new Job/)).toBeTruthy();
  });
});
