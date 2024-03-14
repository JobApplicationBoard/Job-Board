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
// Card = draggable item
const Card = (props) => {
  function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
  }
  function dragEnd(event) {
    document.getElementById('demo').innerHTML = 'Finished dragging the card';
  }
  return (
    <div
      className="card"
      draggable="true"
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      id={props.id}
    >
      {props.jobname}
    </div>
  );
};

export default Card;
