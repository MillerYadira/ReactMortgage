import React from 'react';

const Denominations = ({ denominations }) => (
  <div className="row">
    {Object.keys(denominations).map((key) => (
      <div key={key} className="col-3">
        <div className="well">
          <h1>{key}</h1>
          <p className="change">{denominations[key]}</p>
        </div>
      </div>
    ))}
  </div>
);

export default Denominations;
