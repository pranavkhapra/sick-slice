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
async function turnSliceMastersIntoPages({ graphql, actions }) {
  // 1.query all the slicemasters from grapqhl
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);

  // TODO:2. Turn each slicemaster into their owwn page
  const sliceMasterTemplate = path.resolve('./src/templates/SliceMaster.js');
  data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      path: `slicemaster/${slicemaster.slug.current}`,
      component: sliceMasterTemplate,
      context: {
        name: slicemaster.person,
        slug: slicemaster.slug.current,
      },
    });
  });
  // 3.Figure out how many pages there are based on  and
  // how many slicemasters there are and how many per page
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);
  // 4.Loop from 1 to n where n and create pages for them pagination one
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve(`./src/pages/slicemasters.js`),
      // this is data is passed to the template when we create it
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
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
    turnSliceMastersIntoPages(params),
  ]);
  // 2.Toppings
  // 3.SliceMasters
}
