import { useEffect, useState } from 'react';
// if you want to autoformatiing highlighting for a grapqhl string in a file
// whne you arent using a library yu can use a little trick in your editor so that vs code
// think and it will just return regular string

// const gql = (parts, ...pieces) =>
//     parts.map((part, i) => `${part}${pieces[i]} || ''`).join('');
// or you can just use the
const gql = String.raw;
const deets = `
    name
                _id
                image {
                  asset {
                    url
                    metadata {
                      lqip
                    }
                  }
                }
    `;

function useLatestData() {
  // hot slices
  const [hotSlices, setHotSlices] = useState();
  // slicemaster
  const [slicemasters, setSlicemasters] = useState();
  // we will use a side effect to fetch the data from the graphql endpoint

  useEffect(function () {
    // when the component loads,fetch the data
    // we pass the empty array becasue we dont want to re-render it by any of changes we just want to render it when we load
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              slicemaster {
                ${deets}
              }
              hotSlices {
                ${deets}
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO: checl for errors
        // set the data to state
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemaster);
      })
      .catch((err) => {
        console.log('SHOOOOOT');
        console.log(err);
      });
  }, []);
  return {
    hotSlices,
    slicemasters,
  };
}

export default useLatestData;
