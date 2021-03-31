import React from 'react';
import LoadingGrid from '../components/LoadingGrid';
import { HomePageGrid } from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing({ slicemasters }) {
  return (
    <div>
      {!slicemasters && <LoadingGrid count={4} />}
      {slicemasters && !slicemasters?.length && (
        <p>No one is working right now!!!</p>
      )}
    </div>
  );
}
function HotSlices({ hotSlices }) {
  return (
    <div>
      {!hotSlices && <LoadingGrid count={4} />}
      {!hotSlices && !hotSlices?.length && <p>Nothing is in the Case</p>}
    </div>
  );
}
function HomePage() {
  const result = useLatestData();
  console.log(result);
  return (
    <div className="center">
      <h1>The Best Pizza DownTown!</h1>
      <p>Open 11am to 11pm every Single Day</p>
      <HomePageGrid>
        <CurrentlySlicing slicemasters={result.slicemasters}>
          <HotSlices hotSlices={result.hotSlices} />
        </CurrentlySlicing>
      </HomePageGrid>
    </div>
  );
}
export default HomePage;
