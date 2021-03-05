var plugins = [{
      plugin: require('/home/just-a-random-person-to-ignore/Documents/gatsby-part/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/just-a-random-person-to-ignore/Documents/gatsby-part/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"h9flzm0p","dataset":"production","watchMode":true,"token":"sktnWKHOo7HOCRVFLuk56I53IPwRjDUnLJq4gE2i6q0KwiExwgMa52a2gvzVtJAoBFBKQZXqSe7VZPtW0CN392EGbLv65WgQj2sOwbbxzCHg2RfWouMnaP2vPYsODR1pNKOozcANuqFhwj7rdhQz6MLDVuF6j3Ph6MCyNYxwydIa4dDTZ7sy"},
    },{
      plugin: require('/home/just-a-random-person-to-ignore/Documents/gatsby-part/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
