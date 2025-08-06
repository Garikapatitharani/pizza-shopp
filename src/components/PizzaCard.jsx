import React, { useEffect, useState } from 'react';

const PizzaCard = ({ order, updateOrderStage, cancelOrder }) => {
  const [timeInStage, setTimeInStage] = useState(0);

  const getMaxTime = () => {
    switch (order.size.toLowerCase()) {
      case 'small': return 180;
      case 'medium': return 240;
      case 'large': return 300;
      default: return 180;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeInStage((prevTime) => prevTime + 1);
    }, 1000);  

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimeInStage(0);  
  }, [order.stage]);

  const handleNextStage = () => {
    if (order.stage === 'Order Placed') {
      updateOrderStage(order.id, 'Order in Making');
    } else if (order.stage === 'Order in Making') {
      updateOrderStage(order.id, 'Order Ready');
    } else if (order.stage === 'Order Ready') {
      updateOrderStage(order.id, 'Order Picked');
    }
  };

  const handleCancel = () => {
    cancelOrder(order.id);
  };

  return (
    <div className={`pizza-card ${timeInStage > getMaxTime() ? 'highlight' : ''}`}>
      <h4>{order.type} Pizza ({order.size})</h4>
      <p>Base : {order.base}</p>
      <p>Time Spent : {timeInStage} sec</p>

      {order.stage === 'Order Picked' ? (
        <p><strong>Your order is picked!✅</strong></p>
      ) : (
        <button onClick={handleNextStage}>
          {order.stage === 'Order Ready' ? 'Pick' : 'Next'}
        </button>
      )}
      <br></br>
      
      {order.stage !== 'Order Picked' && <button onClick={handleCancel}> Cancel </button>}
    </div>
  );
};

export default PizzaCard;
