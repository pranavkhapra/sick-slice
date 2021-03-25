import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  // Loop over each item in the order
  const total = order.reduce((acc, singleOrder) => {
    const pizza = pizzas.find((pizza) => pizza.id === singleOrder.id);
    return acc + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
  return total;
  // Calculate the total for that pizza
  // add that total to the running total
}
