import React, { useState } from 'react';

const OrderForm = ({ addOrder }) => {
  const [type, setType] = useState('Veg');
  const [size, setSize] = useState('Medium');
  const [base, setBase] = useState('Thin');

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrder({ type, size, base, stage: 'Order Placed' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <h2>Place Your Pizza Order</h2>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px',margin:'10px 20%', fontWeight:'bold' }}>
        <div>
          <label>Type : </label>
          <select className='p-1 m-2' value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>

        <div>
          <label>Size : </label>
          <select className='p-1 m-2' value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>

        <div>
          <label>Base : </label>
          <select className='p-1 m-2' value={base} onChange={(e) => setBase(e.target.value)}>
            <option value="Thin">Thin</option>
            <option value="Thick">Thick</option>
          </select>
        </div>
      </div>

      <div><button className='cutsom-order-button' type="submit" > Place Order </button></div>
    </form>
    
  );
};

export default OrderForm;
