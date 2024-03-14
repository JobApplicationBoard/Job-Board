import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import Category from './Category.jsx';
import { addCategoryActionCreator } from '../actions/actions.js';
import { addCardActionCreator } from '../actions/actions.js';
import { addToStateActionCreator } from '../actions/actions.js';
import { deleteCategoryActionCreator } from '../actions/actions.js';

const Board = () => {
  const dispatch = useDispatch();
  const [catId, setCatId] = useState(0);

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
  }, [catId]);

  const categories = useSelector((state) => state.board.categories);
  console.log('categories in board.jsx: ', categories);

  const categoryData = categories.map((category, index) => {
    return (
      <Category name={category.category_name} id={category._id} key={index} />
    );
  });
  console.log({categoryData})
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
  async function deleteHandler(event) {
    event.preventDefault();

    try {
      const response = await fetch('/api/category', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: event.target[0].value,
        }),
      });

      const data = Math.floor(Math.random() * 1000);
      setCatId(data);
      dispatch(deleteCategoryActionCreator(data));
    } catch (error) {
      console.error('Fail in deleteHandler', error);
    }
  }

  return (
    <div>
      <h3>AxoBoard</h3>
      <div className='category-input-container'>
        <div className='left-content'></div>
        <div className='right-content'>
          <form onSubmit={(event) => submitHandler(event)}>
            <input placeholder='Enter Category Name' type='text' />
            <button type='submit'>Add Category</button>
          </form>
          <form onSubmit={(event) => deleteHandler(event)}>
            <input placeholder='Enter Category Name' type='text' />
            <button type='submit'>Delete Category</button>
          </form>
        </div>
      </div>
      <div className='board-container'>{categoryData}</div>
    </div>
  );
};
export default Board;
