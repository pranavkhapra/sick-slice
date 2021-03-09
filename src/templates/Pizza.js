import React from 'react';
import { graphql } from 'gatsby';

function pizzaDynamicPage() {
  return <div>Pizzaaas</div>;
}

export const query = graphql`
  query($slug: String!) {
    pizzas: sanityPizza(slug: { current: { eq: $slug } }){
      name
      id
      image{
        asset{
          fluid(maxWidth:800){
            ..GatsbySanityImageFluid
          }
        }
      }
      toppings{
        name
        id
        vegetarian
      }
    }
  }
`;

export default pizzaDynamicPage;
