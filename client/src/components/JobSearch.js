import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import simpleImage from "../assets/images/simpleImage.JPG";

function JobSearch() {
  const [query, setQuery] = useState({
    keyword: "",
    location: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(query);
    // Add your search logic here
  };

  return (
    <div
      style={{
        backgroundImage: `url(${simpleImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Form onSubmit={handleSubmit} className="bg-light p-3">
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Keyword"
                    name="keyword"
                    value={query.keyword}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Location"
                    name="location"
                    value={query.location}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Category"
                    name="category"
                    value={query.category}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Button variant="outline-dark">Search</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container> */}
    </div>
  );
}

export default JobSearch;
