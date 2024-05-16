import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container, Row, Col } from "react-bootstrap";
import "../screens/Aboutus.css";
import classnames from "classnames";
import abtimg1 from "../assets/images/abtimg3.jpg";
import abtimg2 from "../assets/images/abtimg5.jpg";
import abtimg3 from "../assets/images/abtimg1.jpg";
import abtimg4 from "../assets/images/abtimg2.jpg";
import abtimg5 from "../assets/images/abtimg4.jpg";

const Aboutus = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 20);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />

      <Container>
        <br></br>
        <Row>
          <Col
            sm={6}
            className="about-us-content xl={6} lg={12} md={12} sm={12}"
          >
            <div>
              <h3 id="Title" className={classnames({ "fade-in": fadeIn })}>
                About Us
              </h3>

              <p id="content" className={classnames({ "fade-in": fadeIn })}>
                <br></br>
                Welcome, Here is an Online Job Portal!, exclusively dedicated to
                helping our employees find their dream jobs in the field of
                Information Technology.I offers high-quality IT courses for
                aspiring professionals.We are an initiative by the state
                government of Kerala to bridge the skill gap and create a pool
                of talented and employable IT workforce.
                <br></br>
                Our employees are our pride and strength.I dedicate this website
                to our employees and employers, where they can search for jobs
                from reputed employers and showcase their skills and
                achievements.
              </p>
            </div>
            <br></br>
          </Col>

          <Col
            sm={6}
            className="about-us-content xl={6} lg={12} md={12} sm={12}"
          >
            <div>
              <img
                src={abtimg1}
                alt="Aboutus-img"
                className="abtimg"
                id="about-us-image"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col
            sm={6}
            className="about-us-content xl={6} lg={12} md={12} sm={12}"
          >
            <div>
              <img
                src={abtimg2}
                alt="ourmission-img"
                className="abtimg"
                id="about-us-image"
              />
            </div>
            <br></br>
          </Col>

          <Col
            sm={6}
            className="about-us-content xl={6} lg={12} md={12} sm={12}"
          >
            <div>
              <h3 id="Title" className={classnames({ "fade-in": fadeIn })}>
                Our Mission
              </h3>

              <p id="content" className={classnames({ "fade-in": fadeIn })}>
                <br></br>
                Our mission is to bridge the gap between employers and our
                employees by providing a platform where they can connect and
                collaborate.As an employee, you have the privilege to register
                on my website and access job listings that are exclusively
                available to our community. Our job listings are updated
                frequently, ensuring that you have access to the latest job
                opportunities in the I.T industry
              </p>
            </div>
          </Col>
        </Row>
        <br></br>

        <Row>
          <Col
            sm={6}
            className="about-us-content xl={6} lg={12} md={12} sm={12}"
          >
            <div>
              <h4 id="Title" className={classnames({ "fade-in": fadeIn })}>
                Empowering Employees with Exclusive Job Listings
              </h4>

              <p id="content" className={classnames({ "fade-in": fadeIn })}>
                <br></br>
                Our platform offers a diverse range of job opportunities that
                cater to our employees needs, and we ensure that all job
                listings are related to I.T. Our employees can browse through
                various job categories, including web development, software
                development, cybersecurity, data science, machine learning and
                more. We empower our employees to take control of their job
                search and find the job of their dreams.
              </p>
            </div>
          </Col>
          <Col
            sm={6}
            className="about-us-content xl={6} lg={12} md={12} sm={12}"
          >
            <div>
              <img
                src={abtimg3}
                alt="aboutus-img"
                className="abtimg"
                id="about-us-image"
              />
            </div>
          </Col>
        </Row>
        <br></br>
        <br></br>

        <Row>
          <Col
            sm={6}
            className="about-us-content xl={6} lg={12} md={12} sm={12}"
          >
            <div>
              <img
                src={abtimg4}
                alt="Employer-img"
                className="abtimg"
                id="about-us-image"
              />
            </div>
            <br></br>
          </Col>

          <Col
            sm={6}
            className="about-us-content xl={6} lg={12} md={12} sm={12}"
          >
            <div>
              <h4 id="Title" className={classnames({ "fade-in": fadeIn })}>
                Facilitating Employers in Finding the Right Talent
              </h4>

              <p id="content" className={classnames({ "fade-in": fadeIn })}>
                <br></br>
                Employers can also benefit from our website by posting their job
                listings and finding the perfect candidates from our talented
                pool of employees.Our platform provides a powerful search
                functionality that enables employers to filter and find the best
                candidates for their job openings.We strive to provide a
                seamless and effortless experience for employers, making it
                easier for them to find the right talent.
              </p>
            </div>
          </Col>
        </Row>
        <br></br>

        <Row>
          <Col
            sm={6}
            className="about-us-content xl={6} lg={12} md={12} sm={12}"
          >
            <div>
              <h3 id="Title" className={classnames({ "fade-in": fadeIn })}>
                Our Commitment to Excellence
              </h3>

              <p id="content" className={classnames({ "fade-in": fadeIn })}>
                At this Online Job Portal, we are committed to providing the
                best job search experience for all our employees and
                employers.We understand the importance of finding the right job
                or candidate, and we are dedicated to making that process as
                smooth and effortless as possible.Our website is designed to be
                user-friendly and intuitive, ensuring that both employers and
                employees can easily navigate and find what they are looking
                for.
                <br></br>
                <br></br>
                Thank you for choosing My Online Job Portal. We look forward to
                being a part of your career journey.
              </p>
            </div>
          </Col>
          <Col
            sm={6}
            className="about-us-content xl={6} lg={12} md={12} sm={12}"
          >
            <div>
              <img
                src={abtimg5}
                alt="aboutus-img3"
                className="abtimg"
                id="about-us-image"
              />
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default Aboutus;
