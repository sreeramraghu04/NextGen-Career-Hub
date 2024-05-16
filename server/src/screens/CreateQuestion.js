import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CreateQuestions = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/mocktest/question",
        {
          question,
          options: options.split(","), // Convert options string to an array
          correctAnswer,
        }
      );
      setSuccessMessage("Question created successfully!");
      setErrorMessage("");
      setQuestion("");
      setOptions("");
      setCorrectAnswer("");
    } catch (error) {
      setErrorMessage("Failed to create question. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div>
      <Header />
      <Container
        style={{
          marginBottom: "2rem",
        }}
      >
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}
            <h1>Create Question</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="question">
                <Form.Label>Question</Form.Label>
                <Form.Control
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="options">
                <Form.Label>Options (comma-separated)</Form.Label>
                <Form.Control
                  type="text"
                  value={options}
                  onChange={(e) => setOptions(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="correctAnswer">
                <Form.Label>Correct Answer</Form.Label>
                <Form.Control
                  type="text"
                  value={correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  required
                />
              </Form.Group>
              <Button
                variant="primary"
                style={{
                  marginTop: "2rem",
                }}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default CreateQuestions;
