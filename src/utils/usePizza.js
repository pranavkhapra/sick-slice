import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateOrderTotal from './calculateOrderTotal';
import formatPrice from './formatPrice';

export default function usePizza({ pizzas, values }) {
  // 1. Create some state to hold our order
  // We got rid of this line because we moved useState up to the provider

  // const [order, setOrder] = useState([]);
  // Now we have acces both our state and our provider funciton (setOrder) via context
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
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
  /// runs when someone submit the form
  async function submitOrder(event) {
    event.preventDefault();
    setLoading(null);
    setError(null);
    setMessage('Go eat');
    // gather all the data of the order that we need to send
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatPrice(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
    };
    // 4 send this data to a  serverless fucntion when they check out bascially the email stuff
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await res.text());
    // check if everything worked
    if (res.status >= 400 && res.status < 600) {
      setLoading(false); // turn of the  loading
      setError(text.message);
    } else {
      // it worked
      setLoading(false);
      setMessage('Success! Comes on down for your pizza');
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
