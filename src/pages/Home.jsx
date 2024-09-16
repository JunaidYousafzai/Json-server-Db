import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/games")
      .then((responce) =>
        setData(responce.data)
    ).catch((error) => alert(error.message))
  }, []);
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/games/${id}`)
      .then(() => {
        alert("Data deleted successfully");
        // setData(data.filter((game) => game.id !== id));
        setData((prevData) => prevData.filter((game)=>game.id !==  id))
      })
      .catch((error) => alert(error.message));
  };

  return (
    <>
      <h1>Games Data</h1>
      <Link
        to="/create"
        style={{
          color: "white",
          border: "1px solid white",
          padding: "2%",
          margin: "10px",
          borderRadius: "8%",
        }}
      >
        Add Game
      </Link>
      <table
        style={{ border: "2px solid white", padding: "20px", marginTop: "5%" }}
      >
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Ratings</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((game) => (
            <tr key={game.id}>
              <td>{game.id}</td>
              <td>{game.name}</td>
              <td>{game.ratings}</td>
              <td>
                <Link style={{ padding: "5px" }}
                to={{
                  pathname: `/update/${game.id}`,
                  state: {
                    gameName: game.name,
                    gameRatings: game.ratings, // Ensure consistency in naming
                  },
                }}
                     
                     >
                    
                  Update
                </Link>
                <Link
                  style={{ padding: "5px" }}
                  to=""
                  onClick={() => handleDelete(game.id)}
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
