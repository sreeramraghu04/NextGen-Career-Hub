import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const MockTest = () => {
  const [mockTestName, setMockTestName] = useState("");
  const [totalQuestions, setTotalQuestions] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const userStrInfo = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userStrInfo);

  const sendDataToApi = async () => {
    try {
      if (mockTestName === "" || totalQuestions === "" || totalMarks === "") {
        toast.error("Plaese enter all the values");
      }
      const mockTestData = {
        mockTestName: mockTestName,
        totalQuestions: totalQuestions,
        totalMarks: totalMarks,
        createdBy: userInfo.userID,
      };
      const { status, statusText, data } = await axios.post(
        `http://localhost:4000/mocktest/create`,
        mockTestData
      );
      setMockTestName("");
      setTotalQuestions("");
      setTotalMarks("");

      if (status === 201 && statusText === "Created") {
        toast.success("Mock Test Created Successfully");
        console.log(data);
        setMockTestName("");
        setTotalQuestions("");
        setTotalMarks("");
      }
    } catch (error) {
      setMockTestName("");
      setTotalQuestions("");
      setTotalMarks("");
    }
  };

  const formHandler = (e) => {
    e.preventDefault();
    sendDataToApi();
  };

  return (
    <div>
      <Header />
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="justify-content-center mt-4"
      >
        <br />
        <Col
          style={{
            width: "100%",
            display: "flex",
            alignItems: "end",
            justifyContent: "flex-end",
            gap: "2rem",
          }}
        >
          <Button to="/mocktest/all" as={Link}>
            View all Mocktest
          </Button>
          <Button to="/mocktest/question" as={Link}>
            Add Questions
          </Button>
        </Col>

        <Row
          style={{
            width: "50%",
          }}
        >
          <Col style={{ width: "80%" }}>
            <h1 className="text-center my-4">Create Mock test</h1>
            <Form>
              <Form.Group className="p-2">
                <Form.Control
                  type="text"
                  placeholder="MOCKTEST NAME"
                  onChange={(e) => setMockTestName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="p-2">
                <Form.Control
                  type="number"
                  placeholder="TOTAL QUESTIONS"
                  onChange={(e) => setTotalQuestions(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="p-2">
                <Form.Control
                  type="number"
                  placeholder="TOTAL MARKS"
                  onChange={(e) => setTotalMarks(e.target.value)}
                />
              </Form.Group>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ height: "14vh" }}
              >
                <div className="text-center">
                  <Button variant="primary" type="submit" onClick={formHandler}>
                    Submit
                  </Button>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
      <Toaster />
    </div>
  );
};

export default MockTest;
