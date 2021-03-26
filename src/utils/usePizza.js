import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, inputs }) {
  // 1. Create some state to hold our order
  // We got rid of this line because we moved useState up to the provider

  // const [order, setOrder] = useState([]);
  // Now we have acces both our state and our provider funciton (setOrder) via context
  const [order, setOrder] = useContext(OrderContext);
  // 2. Make a function add things to order
  function addToOrder(orderedPizza) {
    // send all in the order and the ordered pizza
    setOrder([...order, orderedPizza]);
  }
  // 3 make a function remove things from order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item before we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1), // + from index to the end
    ]);
  }
  // 4 send this data to a  serverless fucntion when they check out bascially the email stuff
  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
