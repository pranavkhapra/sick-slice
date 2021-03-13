import path, { resolve } from 'path';
import fetch from 'isomorphic-fetch';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1.get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');

  // 2.query all Pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3.loop over each pizzas and create page for each pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}
async function turnToppingsIntoPages({ graphql, actions }) {
  // 1.get a template for this page
  const toppingTemplate = path.resolve('./src/pages/pizzas.js');

  // 2.query all Pizzas
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // 3.loop over each pizzas and create page for each pizza
  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        // toppingRegex: `/${topping.name}/i`,
      },
    });
  });
}
async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // 1.Fetch a list of the beer
  const response = await fetch('https://api.sampleapis.com/beers/stouts');
  const beers = await response.json();
  // 2.Loop over the list of beer
  beers.forEach((beer) => {
    // create a node for each beer
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    // 3.create a node for that beer
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  });
  // for (const beer of beers) {
  //   // create a node for each beer
  //   const nodeMeta = {
  //     id: createNodeId(`beer-${beer.name}`),
  //     parent: null,
  //     children: [],
  //     internal: {
  //       type: 'beer',
  //       mediaType: 'application/json',
  //       contentDigest: createContentDigest(beer),
  //     },
  //   };
  //   actions.createNode({
  //     ...beer,
  //     ...nodeMeta,
  //   });
  // }
}

// for the demonstration of how to source data from the external api the data when we are taking
//  the data from the api like rest api and all the stuff because upto now we all have taken all the data that is living in sanity but what if you have some data from a api
export async function sourceNodes(params) {
  // fetch a list of beer and source that into our gatsby api
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}
export async function createPages(params) {
  // Create pages dynamically
  // 1.Pizzas
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
  ]);
  // 2.Toppings
  // 3.SliceMasters
}
