import React, { useState, useEffect } from "react";
import { Table, Container, Button } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

const ViewApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useLocation();
  const jobId = new URLSearchParams(search).get("id");

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/jobs/applicants?jobId=${jobId}`
      );
      setApplicants(response.data.applicants);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  const handleDownload = async () => {
    try {
      const resumeFile = "uploads\\resumeFile-1712496688424-616405080.pdf";
      const filePath = resumeFile.replace(/\\/g, "/");

      // Make a GET request to the server to fetch the resume file
      const response = await axios.get(`http://localhost:4000/${filePath}`, {
        responseType: "blob", // Ensure response is treated as a blob
      });

      // Create a blob URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary <a> element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf");
      document.body.appendChild(link);

      // Click the link to start the download
      link.click();

      // Clean up by removing the temporary <a> element and revoking the blob URL
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading resume:", error.message);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <h1>View Applicants</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>highestQualification</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr key={applicant._id}>
                  <td>
                    {applicant.firstName} {applicant.lastName}
                  </td>
                  <td>{applicant.email}</td>
                  <td>{applicant.phone}</td>
                  <td>{applicant.highestQualification}</td>
                  
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};

export default ViewApplicants;
