import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const Card1 = ({jobData}) => {
  
  const { job_role_name, company_name, details, date_applied } = jobData;

  return (
    <div className="card">
      <p>{job_role_name}</p>
      <p>{company_name}</p>
      <p>{details}</p>
      <p>{date_applied}</p>
    </div>
  );
};

const Card = () => {
  
  return (
    <div className="card">
      {/* <p>{job_role_name}</p>
      <p>{company_name}</p>
      <p>{details}</p>
      <p>{date_applied}</p> */}
    </div>
  );
};

export default Card;
