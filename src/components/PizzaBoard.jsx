import React from 'react';
import PizzaCard from './PizzaCard';

const PizzaBoard = ({ orders, updateOrderStage, cancelOrder }) => {
  const stages = ['Order Placed', 'Order in Making', 'Order Ready', 'Order Picked'];

  return (
    <div className="pizza-board">
      {stages.map(stage => (
        <div key={stage} className="stage-column">
          <h3>{stage}</h3>
          {orders.filter(order => order.stage === stage).map(order => (
            <PizzaCard key={order.id} order={order} updateOrderStage={updateOrderStage} cancelOrder={cancelOrder} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PizzaBoard;
