// This file is empty, but some people were reporting that it would not start unless they had an empty file. So here it is! You can delete the comment. Or replace it with your favourite shania twain lyrics.
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
module.exports = {
  siteMetadata: {
    title: `Gatsby`,
    siteUrl: `https://gatbsy.pizza.pranavkhapra`,
    description: `The best Pizza in ....pizzas are always the best`,
  },

  plugins: [
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