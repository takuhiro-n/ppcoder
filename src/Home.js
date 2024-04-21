// Home.js
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to PpCoder</h1>
      <Link to="/game"><button>ゲームをする</button></Link>
    </div>
  );
}

export default Home;
