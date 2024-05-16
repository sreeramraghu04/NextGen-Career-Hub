import React, { useEffect, useState, version } from "react";
import UserCard from "../components/AdminUserCard";
import Container from 'react-bootstrap/Container';
import { Row } from "react-bootstrap";
import Header from '../components/Header';
import Footer from '../components/Footer';


const UserScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:4000/user")
        .then((response) => response.json())
        .then((data) => setUsers(data))
        .catch((error) => console.log(error));
    };
  
    const intervalId = setInterval(() => {
      fetchData();
    }, 1500); // 5000 milliseconds = 5 seconds
  
    fetchData(); // fetch data for the first time when the component mounts
  
    return () => clearInterval(intervalId); // clean up the interval on component unmount
  }, []);
    

  const handleDelete = (id) => {
    fetch(`http://localhost:4000/user/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then((data) => {
        // Remove the deleted user from the state
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        console.log(data.message);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Header />
      <Container>
        <div>
          <br></br>
          <h2 className="text-center">Admin Dashboard: Manage Users</h2>
          <br></br>
        </div>
        <Row>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <UserCard
                key={user._id}
                username={user.username}
                firstName={user.firstName}
                lastName={user.lastName}
                email={user.email}
                phone={user.phone}
                highestQualification={user.highestQualification}
                courseStudied={user.courseStudied}
                batchDetails={user.batchDetails}
                placementStatus={user.placementStatus}
                companyName={user.companyName}
                userType={user.userType}
                created_date={user.created_date}
                __v={version}
                onDelete={() => handleDelete(user._id)}
                upUserId={user._id}

              >
              </UserCard>
            ))
          ) : (
            <p>No users available.</p>
          )}
        </Row>
      </Container>

      <Footer/>
    </>
  );
};

export default UserScreen;
