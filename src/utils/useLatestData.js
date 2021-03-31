import { useEffect, useState } from 'react';

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
        query: `
          query{
            StoreSettings(id:"downtown"){
              name
              slicemaster{
                name
              }
              hotSlices{
                name
              }
            }
          }
          `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO:check for errors
        // set the data for the state
        // console.log(res);
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemasters);
      });
  }, []);
  return {
    hotSlices,
    slicemasters,
  };
}

export default useLatestData;
