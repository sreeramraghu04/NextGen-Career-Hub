import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const JobCreation = () => {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [highestQualification, setHighestQualification] =
    useState("qualification");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");

  const sendDataToApi = () => {
    if (
      companyName === "" ||
      jobTitle === "" ||
      jobDescription === "" ||
      highestQualification === "" ||
      salary === "" ||
      location === ""
    ) {
      toast.success("Plaese enter all the values");
    } else {
      const jobData = {
        companyName: companyName,
        jobTitle: jobTitle,
        jobDescription: jobDescription,
        highestQualification: highestQualification,
        salary: salary,
        location: location,
      };
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo.token;

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .post(`http://localhost:4000/jobs/new`, jobData, { headers: headers })
        .then((response) => {
          if (response.data.status === "success") {
            toast.success("Job added successfully");
            setCompanyName("");
            setJobTitle("");
            setJobDescription("");
            setHighestQualification("");
            setSalary("");
            setLocation("");
            window.location.reload();
          } else {
            toast.error("Error");
          }
        });
    }
  };

  const formHandler = (e) => {
    e.preventDefault();
    sendDataToApi();
  };
  return (
    <div>
      <Header />

      <Container className="d-flex justify-content-center mt-4">
        <Row>
          <Col>
            <h1 className="text-center my-4">JobCreation</h1>
            <Form>
              <Form.Group className="p-2">
                <Form.Control
                  type="text"
                  placeholder="COMPANY NAME"
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="p-2">
                <Form.Control
                  type="text"
                  placeholder="JOB TITLE"
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="p-2">
                <Form.Control
                  type="text"
                  placeholder="JOB DESCRIPTION"
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="p-2">
                <select
                  name=""
                  className="form-select"
                  onChange={(e) => setHighestQualification(e.target.value)}
                >
                  <option selected disabled hidden>
                    {" "}
                    HIGHEST QUALIFICATION
                  </option>
                  <option>High School</option>
                  <option>Diploma</option>
                  <option>Bachelor</option>
                  <option>Master</option>
                  <option>PhD</option>
                </select>
              </Form.Group>

              <Form.Group className="p-2">
                <Form.Control
                  type="text"
                  placeholder="SALARY"
                  onChange={(e) => setSalary(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="p-2">
                <Form.Control
                  type="text"
                  placeholder="LOCATION"
                  onChange={(e) => setLocation(e.target.value)}
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

export default JobCreation;
