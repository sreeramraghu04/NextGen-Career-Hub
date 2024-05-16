import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import "../components/AlumniJobCard.css";
import axios from "axios";
import JobApplyCard from "./JobApplyCard";

function JobCard(props) {
  const {
    jobTitle,
    companyName,
    jobDescription,
    salary,
    location,
    highestQualification,
    createdAt,
    updatedAt,
    jobId,
    createdBy,
  } = props;
  const [hovered, setHovered] = useState(false);
  const [appliedStatus, setAppliedStatus] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const userStrInfo = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userStrInfo);

  const checkApplied = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/jobs/check?userId=${userInfo.userID}&jobId=${jobId}`
      );
      setAppliedStatus(response.data.isApplied);
    } catch (error) {
      console.log(error.message);
    }
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
            <Card.Text className="smalltext text-muted">
              Job listing created at: {createdAt}
            </Card.Text>
            <Card.Text className="smalltext text-muted">
              Job listing updated at: {updatedAt}
            </Card.Text>

            <Button
              variant="dark"
              onClick={() => {
                handleUpdate();
                checkApplied();
              }}
            >
              Apply Now
            </Button>
          </Card.Body>
        </Card>
        <JobApplyCard
          show={showUpdateModal}
          onHide={() => {
            setShowUpdateModal(false);
          }}
          appliedStatus={appliedStatus}
          jobTitle={jobTitle}
          companyName={companyName}
          jobId={jobId}
          createdBy={createdBy}
        />
      </div>
    </Col>
  );
}

export default JobCard;
