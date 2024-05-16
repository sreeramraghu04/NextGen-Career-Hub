import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";

const MockTestResults = () => {
  const [marks, setMarks] = useState([]);
  const { search } = useLocation();
  const mockTestId = new URLSearchParams(search).get("id");

  useEffect(() => {
    fetchMockTestMarks();
  }, []);

  const fetchMockTestMarks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/mocktest/result",
        {
          params: {
            mockTestId: mockTestId,
          },
        }
      );
      console.log(response);
      setMarks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <h2>Mock Test Results</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Marks Obtained</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((mark, index) => (
            <tr key={index}>
              <td>{mark.userId}</td>
              <td>{mark.username}</td>
              <td>5/{mark.marksObtained}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MockTestResults;
