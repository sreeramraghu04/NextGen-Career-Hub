import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Container, Row } from "react-bootstrap";
import MockTestCard from "../components/MockTestCard";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const ViewAllMockTests = () => {
  const [mockTest, setMockTest] = useState("");

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const createdBy = userInfo.userID;

    const getMockTestData = async () => {
      try {
        const { data, status, statusText } = await axios.get(
          `http://localhost:4000/mocktest/user?userId=${createdBy}`
        );
        if (status === 200 && statusText === "OK") {
          setMockTest(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getMockTestData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data, status, statusText } = await axios.delete(
        `http://localhost:4000/mocktest/delete?mockTestId=${id}`
      );
      if (status === 200 && statusText === "OK") {
        toast.success(data.message);
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Header />

      <Container>
        <Row>
          {Array.isArray(mockTest)
            ? mockTest.map((data) => {
                return (
                  <MockTestCard
                    key={data._id}
                    mockTestName={data?.mockTestName}
                    totalQuestions={data?.totalQuestions}
                    totalMarks={data?.totalMarks}
                    mockTestId={data?._id}
                    onDelete={() => handleDelete(data._id)}
                  />
                );
              })
            : null}
        </Row>
      </Container>
      <Toaster />
    </div>
  );
};

export default ViewAllMockTests;
