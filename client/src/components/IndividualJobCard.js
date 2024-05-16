import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Row, Modal } from "react-bootstrap";
import "../components/AdminJobcard.css";
import JobUpdateModal from "./updatepopup";
import { Link } from "react-router-dom";

function IndividualJobCard(props) {
  const {
    jobTitle,
    companyName,
    jobDescription,
    salary,
    location,
    highestQualification,
    jobId,
    onDelete,
    upJobId,
  } = props;
  const [hovered, setHovered] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleDelete = () => {
    onDelete(jobId);
    setShowModal(false);
  };
  const handleUpdate = () => {
    setShowUpdateModal(true);
  };

  return (
    <Col xs={12} md={6} lg={6} xl={4} xxl={3}>
      <div style={{ padding: "10px" }}>
        <Card
          style={{ border: "3px dashed rgba(44, 41, 41, 0.400" }}
          // style={{ width: '100%' }}
          className={hovered ? "job-card hovered" : "job-card"}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Card.Body className="jobCard">
            <Card.Title className="text-primary text-center">
              {jobTitle}
            </Card.Title>
            <br></br>
            <Card.Text className="mb-2">Company: {companyName}</Card.Text>

            <Card.Text className="mb-2">
              Qualification: {highestQualification}
            </Card.Text>
            <Card.Text className="mb-2">Job Location: {location}</Card.Text>
            <Card.Text>Salary: {salary}/- INR</Card.Text>
            <Card.Text>
              Description:<br></br>
              {jobDescription}
            </Card.Text>

            {/* <Button variant="dark"  block href="#">Apply Now</Button> */}
            <Row style={{ display: "flex", gap: "1rem" }}>
              {/* <Button variant="dark" size="sm" block href="#">Update</Button> */}
              <Button
                as={Link}
                to={`/mocktest/applicants?id=${jobId}`}
                variant="success"
                size="sm"
              >
                View Applicants
              </Button>
              <Button variant="dark" size="sm" block onClick={handleUpdate}>
                Update
              </Button>

              <Button
                variant="outline-danger"
                size="sm"
                block
                onClick={() => setShowModal(true)}
              >
                Delete
              </Button>
            </Row>
          </Card.Body>
        </Card>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="smalltext">
          Are you sure you want to delete this job listing?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <JobUpdateModal
        show={showUpdateModal}
        onHide={() => {
          setShowUpdateModal(false);
        }}
        upJobId={upJobId}
        jobTitle={jobTitle}
        companyName={companyName}
        jobDescription={jobDescription}
        salary={salary}
        location={location}
        highestQualification={highestQualification}
      />
    </Col>
  );
}

export default IndividualJobCard;
