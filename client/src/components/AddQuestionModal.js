import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Form } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
const AddQuestionModal = (props) => {
  const { show, onHide, mockTestId } = props;
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [availableQuestions, setAvailableQuestions] = useState([]);

  useEffect(() => {
    fetchAvailableQuestions();
  }, []);

  const fetchAvailableQuestions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/mocktest/question/all"
      );
      setAvailableQuestions(response.data);
    } catch (error) {
      console.error("Error fetching available questions:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const questionIds = selectedQuestions.map((question) => question._id);
      const { status, statusText, data } = await axios.post(
        "http://localhost:4000/mocktest/add",
        {
          mockTestId,
          questionIds,
        }
      );
      if (status === 200 && statusText === "OK") {
        toast.success("Questions added to mocktest successfully");
      }
      console.log(data);
      onHide();
    } catch (error) {
      onHide();
      console.error(error);
    }
  };

  const handleCheckboxChange = (e) => {
    const questionId = e.target.value;
    if (e.target.checked) {
      const question = availableQuestions.find((q) => q._id === questionId);
      setSelectedQuestions([...selectedQuestions, question]);
    } else {
      setSelectedQuestions(
        selectedQuestions.filter((q) => q._id !== questionId)
      );
    }
  };
  return (
    <div>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Questions to Mock Test</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Form.Group controlId="questionIds">
                <Form.Label>Available Questions</Form.Label>
                {availableQuestions.map((question) => (
                  <Form.Check
                    key={question._id}
                    type="checkbox"
                    id={`question-${question._id}`}
                    label={question.question}
                    value={question._id}
                    onChange={handleCheckboxChange}
                  />
                ))}
              </Form.Group>
            </Row>
            <Modal.Footer>
              <Button type="submit" variant="success">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      <Toaster />
    </div>
  );
};

export default AddQuestionModal;
