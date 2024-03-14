import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

// How to drag-and-drop in React:
// make an element draggable by adding the “draggable” attribute
// make an area droppable by implementing the “dragover” event
// capture the drag data by implementing the “dragstart” event
// capture the drop by implementing the “drop” event
// implement the “drag” event that is fired as the element is being dragged
// store the intermediate data in the dataTransfer object

// Job details passed in from Category.jsx:
const Card = (props) => {
  return <div className="card">{props.jobname}</div>;
};

export default Card;
