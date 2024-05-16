import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setMessage] = useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.status === 'success') {
      setMessage(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [userInfo, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(username, password));
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <Header />
      {loading && <Loader></Loader>}
      {error && <Message variant="danger">Invalid Crendentials</Message>}
        {successMessage && (
          <Message variant="success">Login Successful</Message>
        )}
        {userInfo && userInfo.status === "No User Found" ? (
          <Message variant="danger">Invalid Crendentials</Message>
        ) : null}
      <Container className="d-flex justify-content-center mt-4">
        <Row>
          <Col>
            <h1 className="text-center my-4">Login</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>

              <div
                className="d-flex align-items-center justify-content-center"
                style={{ height: "14vh" }}
              >
                <div className="text-center">
                  <Button
                    className="login-button"
                    variant="success"
                    type="submit"
                  >
                    Login
                  </Button>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginScreen;
