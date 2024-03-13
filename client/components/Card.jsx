import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

// Job details passed in from Category.jsx:
const Card = (props) => {
  return <div className="card">
    {props.jobname}
  </div>;
};

export default Card;
