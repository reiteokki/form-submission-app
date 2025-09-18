import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main landing page of the application.</p>
      <p>
        <Link to="/login">Login</Link> |{" "}
        <Link to="/create-account">Create Account</Link>
      </p>
    </div>
  );
};

export default Home;
