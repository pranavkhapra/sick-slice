

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-404-js": (preferDefault(require("/home/just-a-random-person-to-ignore/Documents/sick-slice/src/pages/404.js"))),
  "component---src-pages-beers-js": (preferDefault(require("/home/just-a-random-person-to-ignore/Documents/sick-slice/src/pages/beers.js"))),
  "component---src-pages-index-js": (preferDefault(require("/home/just-a-random-person-to-ignore/Documents/sick-slice/src/pages/index.js"))),
  "component---src-pages-order-js": (preferDefault(require("/home/just-a-random-person-to-ignore/Documents/sick-slice/src/pages/order.js"))),
  "component---src-pages-pizzas-js": (preferDefault(require("/home/just-a-random-person-to-ignore/Documents/sick-slice/src/pages/pizzas.js"))),
  "component---src-pages-slicemasters-js": (preferDefault(require("/home/just-a-random-person-to-ignore/Documents/sick-slice/src/pages/slicemasters.js"))),
  "component---src-templates-pizza-js": (preferDefault(require("/home/just-a-random-person-to-ignore/Documents/sick-slice/src/templates/Pizza.js"))),
  "component---src-templates-slice-master-js": (preferDefault(require("/home/just-a-random-person-to-ignore/Documents/sick-slice/src/templates/SliceMaster.js")))
}

