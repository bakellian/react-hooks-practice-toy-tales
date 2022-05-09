import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/toys')
    .then((res) => res.json())
    .then((toys) => setToys(toys));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  //set up this function here but invoke it in ToyForm to add the new toys to the page
  function handleAddNewToy(toy) {
    //copying our original array of toys and adding on the new toy
    setToys([...toys, toy])
  }

  function handleRemoveToy(id) {
    const removedToyArr = toys.filter(toy => toy.id !== id)
    setToys(removedToyArr)
  }

  function handleDeleteToy(id) {
    fetch(`http://localhost:3001/toys/` + id, {
      method: "DELETE", 
    })
      .then((res) => handleRemoveToy(id));
  }


  return (
    <>
      <Header />
      {showForm ? <ToyForm handleAddNewToy={handleAddNewToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      {/* adding handleDeleteToy to ToyContainer to pass it down to ToyCard */}
      <ToyContainer toys={toys} handleDeleteToy={handleDeleteToy} />
    </>
  );
}

export default App;
