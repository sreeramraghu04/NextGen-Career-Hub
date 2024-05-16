import React, { useState, useEffect } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import swal from "sweetalert";
import Footer from "../components/Footer";
const AttendMockTest = () => {
  const [mockTest, setMockTest] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const { search } = useLocation();
  const mockTestId = new URLSearchParams(search).get("id");
  const jobId = new URLSearchParams(search).get("jobid");
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(60);
  useEffect(() => {
    fetchMockTest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    checkAllQuestionsAnswered();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAnswers]);

  const fetchMockTest = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/mocktest/single?mockTestId=${mockTestId}`
      );
      console.log(response);
      setMockTest(response.data[0]); // Since the API returns an array, select the first element
    } catch (error) {
      console.error(error);
    }
  };
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userId = userInfo.userID;
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, status, statusText } = await axios.post(
        "http://localhost:4000/mocktest/attend",
        {
          userId: userId, // Replace with actual user ID
          mockTestId,
          selectedAnswers,
        }
      );
      console.log(data);

      if (status === 200 && statusText === "OK") {
        await handleApply();
        swal({
          title: "Good job!",
          text: `You have Scored ${data?.totalMarks} and you percentage is ${data?.percentageScore}`,
          icon: "success",
          button: "Done",
        }).then(async () => {
          await navigate("/jobpostings");
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleApply = async () => {
    try {
      const { data, status, statusText } = await axios.post(
        "http://localhost:4000/jobs/apply",
        {
          userId: userId,
          jobId: jobId,
        }
      );
      if (status === 200 && statusText === "OK") {
        console.log(data.message);
      }
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOptionChange = (questionId, option) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: option });
  };

  const checkAllQuestionsAnswered = () => {
    if (mockTest) {
      const answeredQuestions = Object.keys(selectedAnswers);
      const allAnswered =
        answeredQuestions.length === mockTest.questions.length;
      setAllQuestionsAnswered(allAnswered);
    }
  };

  // Function to update timer every second
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // If time runs out, execute handleApply and navigate to home page
      handleApply();
      navigate("/jobpostings"); // Navigate to the home page
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, navigate]);

  // Function to format time in MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!mockTest) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <Container style={{ marginBottom: "2rem" }}>
        <h2>{mockTest.mockTestName}</h2>
        <div>Time Left: {formatTime(timeLeft)}</div>
        <Form onSubmit={handleSubmit}>
          {mockTest.questions.map((question) => (
            <Card key={question._id} className="mb-3">
              <Card.Body>
                <Card.Title>{question.question}</Card.Title>
                <Form.Group>
                  {question.options.map((option) => (
                    <Form.Check
                      key={option}
                      type="radio"
                      name={`question_${question._id}`}
                      id={`option_${option}`}
                      label={option}
                      onChange={() => handleOptionChange(question._id, option)}
                    />
                  ))}
                </Form.Group>
              </Card.Body>
            </Card>
          ))}
          <Button
            variant="success"
            type="submit"
            disabled={!allQuestionsAnswered}
          >
            Submit
          </Button>
        </Form>
      </Container>
      <Footer />
    </div>
  );
};

export default AttendMockTest;
