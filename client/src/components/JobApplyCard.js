import React, { useState } from "react";
import { Modal, Button, Row } from "react-bootstrap";
import AskMockTestCard from "./AskMockTestCard";

const JobApplyCard = (props) => {
  const {
    show,
    onHide,
    appliedStatus,
    companyName,
    jobTitle,
    jobId,
    createdBy,
  } = props;
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleUpdate = () => {
    setShowUpdateModal(true);
    onHide();
  };

  return (
    <div>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Apply Job ..!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Row>
            You are applying for {jobTitle} role on {companyName}
          </Row>
          <Modal.Footer>
            <Button
              type="submit"
              disabled={appliedStatus ? true : false}
              variant={appliedStatus ? "warning" : "success"}
              onClick={handleUpdate}
            >
              {appliedStatus ? "Applied" : "Apply"}
            </Button>
            <Button type="submit" onClick={onHide}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
      <AskMockTestCard
        show={showUpdateModal}
        onHide={() => {
          setShowUpdateModal(false);
        }}
        jobId={jobId}
        createdBy={createdBy}
      />
    </div>
  );
};

export default JobApplyCard;
