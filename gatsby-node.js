import path, { resolve } from 'path';

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