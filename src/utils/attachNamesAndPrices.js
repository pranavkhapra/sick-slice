import calculatePizzaPrice from './calculatePizzaPrice';
import formatPrice from './formatPrice';

export default function attachNamesAndPrices(order, pizzas) {
  return order.map((item) => {
    const pizza = pizzas.find((pizza) => pizza.id === item.id);
    return {
      ...item,
      name: pizza.name,
      thumbnail: pizza.image.asset.fluid.src,
      price: formatPrice(calculatePizzaPrice(pizza.price, item.size)),
    };
  });
}
