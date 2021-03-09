/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';
import ToppingFilter from '../components/ToppingFilter';

function pizzas(props) {
  return (
    <>
      <ToppingFilter />
      <PizzaList pizzaDetails={props.data.pizzas.nodes} />
    </>
  );
}

export const query = graphql`
  query PizzaQuery($topping: [String]) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { in: $topping } } } }
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
export default pizzas;
