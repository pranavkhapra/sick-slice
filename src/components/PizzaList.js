import { Link } from 'gatsby';
import React from 'react';

function SinglePizzaFunction({ pizza }) {
  return (
    <div>
      <Link to={`/pizza/${pizza.slug.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
        <p>{pizza.toppings.map((topping) => topping.name).join(',')}</p>
      </Link>
    </div>
  );
}

function PizzaList({ pizzaDetails }) {
  console.log(pizzaDetails);
  return (
    <div>
      {pizzaDetails.map((pizza) => (
        <SinglePizzaFunction pizza={pizza} key={pizza.id} />
      ))}
    </div>
  );
}

export default PizzaList;
