import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Create = () => {
  const limitedId = uuidv4().slice(0,4)
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    ratings: "",
    id:limitedId
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(form.name === "" || form.ratings === ""){
      alert("Both name and Ratings must be filled")
      return;
    }
    console.log('Form Data being sent:', form);

    axios.post('http://localhost:3000/games', form)
      .then((response) => {
        console.log('Response from server:', response.data);
        // Clear form after successful submission
        setForm({ name: "", ratings: "" });
      })
      .catch((error) => {
        console.error('Error posting data:', error);
        alert(error.message);
      });
      navigate('/home ');
      
  };

  return (
    <>
      <h2>Add Game</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Game"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          placeholder="Enter Ratings"
          name="ratings"
          value={form.ratings}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Add</button>
      </form>
      <Link to="/">Go To Home</Link>
    
    </>
  );
};

export default Create;
