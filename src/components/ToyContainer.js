import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, handleDeleteToy }) {

  const toyCollection = toys.map((toy) => 
    <ToyCard
      key={toy.id}
      //passing in handleDeleteToy to ToyCard from App 
      handleDeleteToy={handleDeleteToy}
      toy={toy}
    /> )

  return (
    <div id="toy-collection">{toyCollection} id={toys.id}</div>
  );
}

export default ToyContainer;
