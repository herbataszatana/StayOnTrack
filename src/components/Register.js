import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import {doc, setDoc} from "firebase/firestore";
import { database } from "../firebase-config";
import { getAuth } from "firebase/auth";

const Register = () => {

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");
  // Sign up as imported from context/useUserAuth
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      e.preventDefault()
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
// To get user id 
    const auth = getAuth();
    const user = auth.currentUser;
    // After successful athenticatin and registration of new user, just after sigining up 
    //add new user to the users collection/or create user collection if doesnt exist. Use 
    //user id as the document id. 
    if(username) {
      setDoc(doc(database, "users", user.uid), {
        name: username,
        email: email,
        uid: user.uid,
        timestamp: new Date()
      }).catch(err => console.error(err))
    }
  };

  return (
    <>
      <div>
        <h2>Stay on track register</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="text"
              placeholder="Name"
              value={username}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div>
            <Button variant="primary" type="Submit">
              Register
            </Button>
          </div>
        </Form>
      </div>
      <div>
        Already have an account? <Link to="/">Log In</Link>
      </div>
    </>
  );
};

export default Register;
