import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Row, Modal } from "react-bootstrap";
import "../components/AdminJobcard.css";
import UserUpdateModal from "../components/userUpdatePopup";

function AdminJobCard(props) {
  const {
    username,
    firstName,
    lastName,
    email,
    phone,
    highestQualification,
    courseStudied,
    batchDetails,
    placementStatus,
    companyName,
    userType,
    created_date,
    version,
    jobId,
    onDelete,
    upUserId,
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
            <Card.Text className="mb-2 text-center">Username:</Card.Text>

            <Card.Title className="text-primary text-center">
              {username}
            </Card.Title>
            <br></br>
            <Card.Text className="mb-2">First Name: {firstName}</Card.Text>

            <Card.Text className="mb-2">Last Name: {lastName}</Card.Text>
            <Card.Text className="mb-2">Email: {email}</Card.Text>
            <Card.Text className="mb-2">Phone no: {phone}</Card.Text>
            <Card.Text className="mb-2">
              Highest Qualification: {highestQualification}
            </Card.Text>
            <Card.Text className="mb-2">
              Course Studied: {courseStudied}
            </Card.Text>
            <Card.Text className="mb-2">
              Batch Details Location: {batchDetails}
            </Card.Text>
            <Card.Text className="mb-2">
              Placement Status: {placementStatus}
            </Card.Text>
            <Card.Text className="mb-2">
              Course Studied: {courseStudied}
            </Card.Text>

            <Card.Text className="mb-2">Company Name: {companyName}</Card.Text>
            <Card.Text className="mb-2">User Name: {userType}</Card.Text>

            <Card.Text className="smalltext text-muted">
              User Profile created at: {created_date}
            </Card.Text>

            {/* <Button variant="dark"  block href="#">Apply Now</Button> */}
            <Row>
              <Col xs={6} sm={6}>
                {/* <Button variant="dark" size="sm" block href="#">Update</Button> */}
                <Button variant="dark" size="sm" block onClick={handleUpdate}>
                  Update
                </Button>
              </Col>
              <Col xs={6} sm={6}>
                <Button
                  variant="outline-danger"
                  size="sm"
                  block
                  onClick={() => setShowModal(true)}
                >
                  Delete
                </Button>
              </Col>
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

      <UserUpdateModal
        show={showUpdateModal}
        onHide={() => {
          setShowUpdateModal(false);
        }}
        upUserId={upUserId}
        username={username}
        firstName={firstName}
        lastName={lastName}
        email={email}
        phone={phone}
        highestQualification={highestQualification}
        courseStudied={courseStudied}
        batchDetails={batchDetails}
        placementStatus={placementStatus}
        companyName={companyName}
        userType={userType}
        created_date={created_date}
        version={version}
      />
    </Col>
  );
}

export default AdminJobCard;
