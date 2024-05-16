import React from "react";
import Header from "../components/Header";
import JobSearch from "../components/JobSearch";
import HomeCard from "../components/HomeCard";
import Footer from '../components/Footer';
import { Col, Container, Row } from "react-bootstrap";
import CompaniesList from "../components/CompaniesList";

function HomeScreen() {
  return (
    <>
      <Header />
      <JobSearch />
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Featured Companies
      </h2>
      <Container>
        <Row style={{ marginTop: "40px" }}>
          <Col className="lg-4">
            <CompaniesList />
          </Col>
        </Row>
      </Container>
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Featured Jobs
      </h2>
      <Container>
        <Row style={{ marginTop: "40px" }}>
          <Col className="lg-4">
            <HomeCard />
          </Col>
        </Row>
      </Container>
      <Container style={{ marginTop: "60px" }}>
        <Footer />
      </Container>
    </>
  );
}

export default HomeScreen;
