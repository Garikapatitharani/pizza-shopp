import React from 'react';

const MainDisplay = ({ orders }) => {
  const totalDelivered = orders.filter(order => order.stage === 'Order Picked').length;
  const inProgress = orders.filter(order => order.stage !== 'Order Picked').length;

  return (
    <div className="main-display">
      <h2>Main Display</h2>
      <p>Total Pizzas Delivered Today: {totalDelivered}</p>
      <p>Pizzas in Progress: {inProgress}</p>
    </div>
  );
};

export default MainDisplay;
