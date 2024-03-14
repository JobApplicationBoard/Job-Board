import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Card = ({ jobData }) => {
  console.log("jobData in cards", jobData);
  const { job_role_name, company_name, details, date_applied } = jobData;

  return (
    <div className="card">
      <p>
        <span className = "bold">Job:</span> {job_role_name}
      </p>
      <p>
        <span className = "bold">Company:</span> {company_name}
      </p>
      <p>
        <span className = "bold">Details:</span> {details}
      </p>
      <p>
        <span className = "bold">Date:</span> {date_applied.slice(0, 10)}
      </p>
    </div>
  );
};

export default Card;
