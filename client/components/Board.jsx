import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import Category from './Category.jsx';
import { addCategoryActionCreator } from '../actions/actions.js';
import { addCardActionCreator } from '../actions/actions.js';
import { addToStateActionCreator } from '../actions/actions.js';

const Board = () => {
  const dispatch = useDispatch();
  const [catId, setCatId] = useState(0);

  // set to run only once the page load, yet not hooked up to the state - Evan
  useEffect(() => {
    async function fetchAll() {
      try {
        const response = await fetch('/api/category');

        if (!response.ok) {
          throw new Error(`Failed to fetch all categories: ${response.status}`);
        }

        const data = await response.json();

        console.log('data: ', data);

        dispatch(addToStateActionCreator(data));
      } catch (error) {
        console.error('Failed to fetch jobs', error);
      }
    }

    fetchAll();
  }, []);

  const categories = useSelector((state) => state.board.categories);
  console.log('categories in board.jsx: ', categories);

  const categoryData = categories.map((category, index) => {
    // dragStart and dragEnd for dragging
    // function dragStart(event) {
    //   event.dataTransfer.setData('Text', event.target.id);
    // }

    // function dragEnd(event) {}

    // returning Category
    return (
      // Category = drop target
      <Category
        name={category.category_name}
        id={category._id}
        key={index}
        ondrop="drop(event)"
        ondragover="allowDrop(event)"
      />
    );
  });

  async function submitHandler(event) {
    event.preventDefault();
    // console.log(event.target[0].value);

    try {
      const response = await fetch('/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          /* ⬇️ WHERE USER_ID IS HARD-CODED TO 2 ⬇ */
          user_id: 2,
          category_name: event.target[0].value,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('New ID from db: ', data._id);
        setCatId(data._id);
        dispatch(addCategoryActionCreator(event.target[0].value, data._id));
      }
    } catch (error) {
      console.error('Fail in submitHandler', error);
    }
  }

  return (
    <div>
      {/* input-container */}
      <div className="category-input-container">
        <div className="left-content"></div>
        <div className="right-content">
          <form onSubmit={(event) => submitHandler(event)}>
            <input placeholder="Enter Category Name" type="text" />
            <button type="submit">Add Category</button>
          </form>
        </div>
      </div>
      {/* borad-container */}
      <div className="board-container">{categoryData}</div>
    </div>
  );
};
export default Board;
