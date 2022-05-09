import React, { useState } from "react";

//setting this so we can use initial state to clear our form at the end of our submit
const initialState = {
  name: "", 
  image: ""
}

function ToyForm({ handleAddNewToy }) {

  //putting state in the form because only the form needs access to this state
  // const [image, setImage] = useState("")
  // const [name, setName] = useState("")

  //instead of the above you could also do formData and refactor it - use on more complex forms 
  // instead of onChange={(e) => setName(e.target.value)} we can do the following:
  
  const [formData, setFormData] = useState({
    name: "", 
    image: ""
  });

  const handleChange = (e) =>  {
    setFormData({
      //copy what we already have with the spread operator
      ...formData,
      //.name is referencing the key (name, image, etc)
      //after the ":" is going to be the value the user is entering - that we want in state 
      [e.target.name]:e.target.value
    })
  };

  const handleSubmit = (e) => {
    //adding in a newToy variable so we can add likes to the server with it.
    const newToy = {
      ...formData, 
      likes: 0
    }

    e.preventDefault();
    fetch('http://localhost:3001/toys', {
      method: "POST", 
      headers: {
        "Content-Type": "application/json"
      },
      //the data that you are sending
      //in our state we have an obj that we need to translate in json:
      body: JSON.stringify(newToy)
    })
      .then((res) => res.json())
      //handleAddNewToy function is in the App - we invoke it here to add our new toy to our original state arry that lives in the App component
      .then((toy) => handleAddNewToy(toy));

      //clear for data after submit
      setFormData(initialState)
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="add-toy-form">
        <h3>Create a toy!</h3>
        <input
          //then adding on change event listener so we can update state while typing 
          onChange={handleChange}
          type="text"
          name="name"
          //adding value so we can use it to udate state
          value={formData.name}
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          onChange={handleChange}
          type="text"
          name="image"
          //adding value again
          value={formData.image}
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
