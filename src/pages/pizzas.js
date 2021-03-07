/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';

function pizzas(props) {
  return (
    <>
      <PizzaList pizzaDetails={props.data.pizzas.nodes} />
    </>
  );
}

export const query = graphql`
  query PizzaQuery {
    pizzas: allSanityPizza {
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
