import axios from "axios";
import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateText, setUpdateText] = useState({
    name: "",
    ratings: "",
  });
  const handleChange = (e) =>{
  setUpdateText({...updateText,
    [e.target.name]:e.target.value})
}
console.log(updateText)


useEffect(()=>{
  axios.get(`http://localhost:3000/games/${id}`)
  .then((responce)=>{
    setUpdateText({
      name:responce.data.name,
      ratings:responce.data.ratings,
    })
  }).catch((error)=>alert(error.message))
},[])
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("hey you clicked")
    axios.put(`http://localhost:3000/games/${id}`,updateText)
      .then((responce)=> {
        alert("data updated Successfully")
      })
      .catch((error)=>alert(error.message))
      setTimeout(()=>[
        navigate('/home')
      ],1000)
  };
  return (
    <>
      <h1>THis is The id</h1>
      <h1>{id}</h1>
      <form onSubmit={handleUpdate}>
        <label>Game Name</label>
        <input
          type="text"
          value={updateText.name}
          name="name"
          onChange={handleChange}
        />
        <br />
        <label>Game Ratings</label>
        <input
          type="text"
          value={updateText.ratings}
          name="ratings"
          onChange={handleChange}
        />
        <br />
      <button style={{marginTop:"2%"}} type="submit">Update Data</button>
      </form>
    </>
  );
};

export default Update;
