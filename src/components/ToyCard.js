import React from "react";

function ToyCard(props) {

  const { image, name, likes, id } = props.toy
  //passing in handleDeleteToy all the way from App through ToyContainer 
  return (
    <div className="card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn">Like {"<3"}</button>
      {/* //wrapped in anonymous arrow function so we can invoke it - to trick the system */}
      <button className="del-btn" onClick={() => props.handleDeleteToy(id)}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
