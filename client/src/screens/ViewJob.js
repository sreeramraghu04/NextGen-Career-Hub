import React from "react";
import Header from "../components/Header";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { Row } from "react-bootstrap";
import JobCard from "../components/IndividualJobCard";

function ViewJob() {
  const [media, setMedia] = useState([]);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const postedBy = userInfo.userID;
    axios
      .get(`http://localhost:4000/jobs/individual?postedBy=${postedBy}`)
      .then(({ data }) => {
        setMedia(data.results);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/jobs/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        // Remove the deleted job from the state
        setMedia((prevJobs) => prevJobs.filter((data) => data._id !== id));
        console.log(data.message);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Header />

      <Container>
        <Row>
          {Array.isArray(media)
            ? media.map((data) => {
                return (
                  <JobCard
                    key={data._id}
                    jobTitle={data.jobTitle}
                    companyName={data.companyName}
                    jobDescription={data.jobDescription}
                    salary={data.salary}
                    location={data.location}
                    highestQualification={data.highestQualification}
                    upJobId={data._id}
                    onDelete={() => handleDelete(data._id)}
                    jobId={data._id}
                  ></JobCard>
                );
              })
            : null}
        </Row>
      </Container>
    </div>
  );
}

export default ViewJob;
