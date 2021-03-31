import React from 'react';
import useLatestData from '../utils/useLatestData';

function CurrentlySlicing() {
  return (
    <div>
      <p>Currently Slicing</p>
    </div>
  );
}
function HotSlices() {
  return (
    <div>
      <p>Hot Slices</p>
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
      <div>
        <CurrentlySlicing slicemasters={result.slicemasters}>
          <HotSlices hotSlices={result.hotSlices} />
        </CurrentlySlicing>
      </div>
    </div>
  );
}
export default HomePage;
