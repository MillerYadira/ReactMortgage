import React from 'react';

const FormInput = ({ amountDue, amountReceived, handleInputChange, calculateChange }) => (
  <form>
    <div className="form-group">
      <label>How much is due?</label>
      <input type="number" name="amountDue" className="form-control" value={amountDue} onChange={handleInputChange} />
    </div>
    <div className="form-group">
      <label>How much was received?</label>
      <input type="number" name="amountReceived" className="form-control" value={amountReceived} onChange={handleInputChange} />
    </div>
    <button className="btn btn-primary btn-block" type="button" onClick={calculateChange}>Calculate</button>
  </form>
);

export default FormInput;
