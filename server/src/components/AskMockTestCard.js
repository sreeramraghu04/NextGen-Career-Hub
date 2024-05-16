import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Row } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const AskMockTestCard = (props) => {
  const { show, onHide, jobId, createdBy } = props;
  const userStrInfo = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userStrInfo);
  const [mockTest, setMockTest] = useState("");

  useEffect(() => {
    const getMockTestData = async () => {
      try {
        const { data, status, statusText } = await axios.get(
          `http://localhost:4000/mocktest/user?userId=${createdBy}`
        );
        if (status === 200 && statusText === "OK") {
          const lastMockTest = data[data.length - 1];
          setMockTest(lastMockTest);
          console.log(lastMockTest);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getMockTestData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApply = async () => {
    try {
      const { data, status, statusText } = await axios.post(
        "http://localhost:4000/jobs/apply",
        {
          userId: userInfo.userID,
          jobId: jobId,
        }
      );
      if (status === 200 && statusText === "OK") {
        toast.success(data.message);
      }
      onHide();
    } catch (error) {
      onHide();

      toast.error("You have already applied for this job");
      console.log(error.message);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            Priority Placement with Mock Test Description
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Row>
            We're excited to introduce our new Priority Placement feature! By
            attending our mock test, you'll not only enhance your skills but
            also boost your chances of securing your dream job. Your performance
            in the mock test will give you priority placement in the job
            application list, putting you ahead of the competition. Don't miss
            this opportunity to stand out and accelerate your career growth!
          </Row>
          <Modal.Footer>
            <Button
              as={Link}
              to={`/mocktest/attend?id=${mockTest._id}&jobid=${jobId}`}
              type="submit"
              variant="info"
            >
              Attend Mocktest
            </Button>
            <Button type="submit" onClick={handleApply}>
              Simple Apply
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
      <Toaster />
    </div>
  );
};

export default AskMockTestCard;
