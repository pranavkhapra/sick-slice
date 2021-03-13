const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/home/just-a-random-person-to-ignore/Documents/gatsby-part/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/home/just-a-random-person-to-ignore/Documents/gatsby-part/src/pages/404.js"))),
  "component---src-pages-beers-js": hot(preferDefault(require("/home/just-a-random-person-to-ignore/Documents/gatsby-part/src/pages/beers.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/home/just-a-random-person-to-ignore/Documents/gatsby-part/src/pages/index.js"))),
  "component---src-pages-order-js": hot(preferDefault(require("/home/just-a-random-person-to-ignore/Documents/gatsby-part/src/pages/order.js"))),
  "component---src-pages-pizzas-js": hot(preferDefault(require("/home/just-a-random-person-to-ignore/Documents/gatsby-part/src/pages/pizzas.js"))),
  "component---src-pages-slicemasters-js": hot(preferDefault(require("/home/just-a-random-person-to-ignore/Documents/gatsby-part/src/pages/slicemasters.js"))),
  "component---src-templates-pizza-js": hot(preferDefault(require("/home/just-a-random-person-to-ignore/Documents/gatsby-part/src/templates/Pizza.js")))
}

