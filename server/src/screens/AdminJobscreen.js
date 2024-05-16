import React, { useEffect, useState } from "react";
import JobCard from "../components/AdminJobCard";
import Container from 'react-bootstrap/Container';
import { Row } from "react-bootstrap";
import Header from '../components/Header';
import Footer from '../components/Footer';


const JobScreen = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:4000/jobs")
        .then((response) => response.json())
        .then((data) => {
          const formattedJobs = data.jobs.map((job) => {
            const createdAt = new Date(job.createdAt).toLocaleString("en-US", { timeZone: "Asia/Kolkata" }) + " IST";
            const updatedAt = new Date(job.updatedAt).toLocaleString("en-US", { timeZone: "Asia/Kolkata" }) + " IST";
            return {
              ...job,
              createdAt,
              updatedAt,
            };
          });
          setJobs(formattedJobs);
        })
        .catch((error) => console.log(error));
    };
  
    const intervalId = setInterval(() => {
      fetchData();
    }, 1500); // 5000 milliseconds = 5 seconds
  
    fetchData(); // fetch data for the first time when the component mounts
  
    return () => clearInterval(intervalId); // clean up the interval on component unmount
  }, []);
    

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/jobs/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then((data) => {
        // Remove the deleted job from the state
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
        console.log(data.message);
      })
      .catch((error) => console.log(error));
  };

//    const handleUpdate = () => {
//     <updatepopup/>
//    };


  return (
    <>
      <Header />
      <Container>
        <div>
          <br></br>
          <h2 className="text-center">Admin Dashboard: Manage Job Postings</h2>
          <br></br>
        </div>
        <Row>
          {Array.isArray(jobs) && jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard
                key={job._id}
                jobTitle={job.jobTitle}
                companyName={job.companyName}
                jobDescription={job.jobDescription}
                salary={job.salary}
                location={job.location}
                highestQualification={job.highestQualification}
                postedBy={job.postedBy}
                createdAt={job.createdAt}
                updatedAt={job.updatedAt}
                onDelete={() => handleDelete(job._id)}
                upJobId={job._id}
                // onUpdate={() => handleUpdate()}              
                >
              </JobCard>
            ))
          ) : (
            <p>No jobs available.</p>
          )}
        </Row>
      </Container>

      <Footer/>
    </>
  );
};

export default JobScreen;
