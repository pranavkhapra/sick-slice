import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
module.exports = {
  siteMetadata: {
    title: `Gatsby Slick Slices`,
    siteUrl: `https://gatbsy.pizza.pranavkhapra`,
    description: `The best Pizza in ....pizzas are always the best`,
    twitter: '@pranavkhapra',
  },

  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: 'h9flzm0p',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
