import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { Row, Modal } from "react-bootstrap";
import "../components/AdminJobcard.css";
import AddQuestionModal from "./AddQuestionModal";
import { Link, useNavigate } from "react-router-dom";

const MockTestCard = (props) => {
  const { mockTestName, totalQuestions, totalMarks, mockTestId, onDelete } =
    props;
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleUpdate = () => {
    setShowUpdateModal(true);
  };
  const handleDelete = () => {
    onDelete(mockTestId);
    setShowModal(false);
  };
  return (
    <Col xs={12} md={6} lg={6} xl={4} xxl={3}>
      <div style={{ padding: "10px" }}>
        <Card
          style={{ border: "3px dashed rgba(44, 41, 41, 0.400" }}
          className={hovered ? "job-card hovered" : "job-card"}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <Card.Body className="jobCard">
            <Card.Title className="text-primary text-center">
              {mockTestName}
            </Card.Title>
            <br></br>
            <Card.Text className="mb-2">
              Total Questions: {totalQuestions}
            </Card.Text>

            <Card.Text className="mb-2">TotalMarks: {totalMarks}</Card.Text>

            <Row
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <Button
                as={Link}
                to={`/mocktest/result?id=${mockTestId}`}
                variant="outline-success"
                size="sm"
              >
                View Result
              </Button>

              <Button variant="outline-info" size="sm" onClick={handleUpdate}>
                Add Questions
              </Button>

              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => setShowModal(true)}
              >
                Delete
              </Button>
            </Row>
          </Card.Body>
        </Card>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body className="smalltext">
            Are you sure you want to delete this mocktest?
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
        {/* add questions */}
        <AddQuestionModal
          show={showUpdateModal}
          onHide={() => {
            setShowUpdateModal(false);
          }}
          mockTestId={mockTestId}
        />
      </div>
    </Col>
  );
};

export default MockTestCard;
