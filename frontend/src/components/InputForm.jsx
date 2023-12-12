import React, { useState } from 'react';
import axios from 'axios';

const InputForm = ({ setResult }) => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/calculate', { num1, num2 });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error in calculation:', error);
    }
  };

  return (
   <div className="form-container">
     <form className='form' onSubmit={handleSubmit}>
      <input className='input' type="number" placeholder='Enter First Value' value={num1} onChange={(e) => setNum1(e.target.value)} />
      <input className='input' type="number" placeholder='Enter Second Value' value={num2} onChange={(e) => setNum2(e.target.value)} />
      <button className='btn' type="submit">Calculate</button>
    </form>
   </div>
  );
};

export default InputForm;