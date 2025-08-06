import React, { useState, useEffect, useCallback } from 'react';
import OrderForm from './components/OrderForm';
import PizzaBoard from './components/PizzaBoard';
import MainDisplay from './components/MainDisplay';
import './App.css';

function App() {
  const [orders, setOrders] = useState([]);
  const maxOrdersLimit = 4;


  const updateOrderTime = useCallback((orderId, stage) => {
  setOrders(prevOrders =>
    prevOrders.map(order => {
      if (order.id === orderId) {
        const currentTime = Date.now();
        const updatedTimeSpent = { ...order.timeSpent };

        if (stage === "placed" && !updatedTimeSpent.placedStart) {
          updatedTimeSpent.placedStart = currentTime;
        }

        updatedTimeSpent[stage] = Math.floor((currentTime - updatedTimeSpent[`${stage}Start`]) / 1000);

        return { ...order, timeSpent: updatedTimeSpent };
      }
      return order;
    })
  );
}, []);



  const addOrder = (newOrder) => {
    if (orders.length < maxOrdersLimit) {
      setOrders([...orders, { ...newOrder, id: Date.now(), timeSpent: { placed: 0, making: 0, ready: 0 } }]);
    } else {
      alert("Not taking any order for now");
    }
  };
  
  const updateOrderStage = (orderId, newStage) => {
    console.log(`Updating stage for order ${orderId} to ${newStage}`); 
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        const updatedTimeSpent = { ...order.timeSpent };
        if (newStage === "Order in Making" && !updatedTimeSpent.makingStart) {
          updatedTimeSpent.makingStart = Date.now();
        }
        if (newStage === "Order Ready" && !updatedTimeSpent.readyStart) {
          updatedTimeSpent.readyStart = Date.now();
        }
        console.log(`Time for stage ${newStage}:`, updatedTimeSpent); 
        return { ...order, stage: newStage, timeSpent: updatedTimeSpent };
      }
      return order;
    }));
  };

  const cancelOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      orders.forEach(order => {
        if (order.stage === "Order Placed") {
          updateOrderTime(order.id, "placed");
        } else if (order.stage === "Order in Making") {
          updateOrderTime(order.id, "making");
        } else if (order.stage === "Order Ready") {
          updateOrderTime(order.id, "ready");
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [orders,updateOrderTime]);

  return (
    <div className="App">
      <div className="container">
        <h1>Pizza Express🍕🍴</h1>
        <OrderForm addOrder={addOrder} />
        <PizzaBoard orders={orders} updateOrderStage={updateOrderStage} cancelOrder={cancelOrder} />
        <MainDisplay orders={orders} />
      </div>
    </div>
  );
}

export default App;
