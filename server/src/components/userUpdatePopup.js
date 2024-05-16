import React, { useState } from 'react';
import { version } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';

function JobUpdateModal(props) {
  const { show, onHide, onUpdate, upUserId, username, firstName, lastName, email, phone, highestQualification, courseStudied, batchDetails, placementStatus, companyName, userType, created_date } = props;
  const [username2, setUsernname2] = useState(username);
  const [firstName2, setFirstName2] = useState(firstName);
  const [lastName2, setLastName2] = useState(lastName);
  const [email2, setEmail2] = useState(email);
  const [phone2, setPhone2] = useState(phone);
  const [highestQualification2, setHighestQualification2] = useState(highestQualification);
  const [courseStudied2, setCourseStudied2] = useState(courseStudied);
  const [batchDetails2, setBatchDetails2] = useState(batchDetails);
  const [placementStatus2, setPlacementStatus2] = useState(placementStatus);
  const [companyName2, setCompanyName2] = useState(companyName);
  const [userType2, setUserType2] = useState(userType);
//   const [created_date2, setCreated_date2] = useState(created_date);
//   const [version2, setVersion2] = useState(version);


  

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      _id: upUserId,
      username: username2,
      firstName: firstName2,
      lastName: lastName2,
      email: email2,
      phone: phone2,
      highestQualification:highestQualification2,
      courseStudied: courseStudied2,
      batchDetails: batchDetails2,
      placementStatus: placementStatus2,
      companyName: companyName2,
      userType: userType2,
      created_date: created_date,
      version: version
    };

    fetch(`http://localhost:4000/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      onUpdate(data);
      onHide();
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  }
    
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Job Listing</Modal.Title>
      </Modal.Header>
      <Modal.Body className='p-4'>
        <Form onSubmit={handleSubmit}>
            <Row>
            <Col md={6}>
          <Form.Group className='p-2'>
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" value={username2} onChange={(e) => setUsernname2(e.target.value)} style={{ border: '2px solid #ced4da' }} />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className='p-2'>
          <Form.Label>User Type</Form.Label>

              <select name=""  className='form-select'
                  value={userType2}
                  onChange={(e)=>setUserType2(e.target.value)} style={{ border: '2px solid #ced4da' }}
                >
              <option selected disabled hidden > User Type</option>
              <option >Select One</option>
                <option >Alumni</option>
                <option >Employer</option>
              </select>
              </Form.Group>
          </Col>


            </Row>
        <Row>
        <Col md={6}>
          <Form.Group className='p-2'>
            <Form.Label>Fristname</Form.Label>
            <Form.Control type="text" value={firstName2} onChange={(e) => setFirstName2(e.target.value)} style={{ border: '2px solid #ced4da' }} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className='p-2'>
            <Form.Label>Lastname</Form.Label>
            <Form.Control type="text" value={lastName2} onChange={(e) => setLastName2(e.target.value)} style={{ border: '2px solid #ced4da' }} />
          </Form.Group>
        </Col>
      </Row>
          <Form.Group className='p-2'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' value={email2} onChange={(e) => setEmail2(e.target.value)} style={{ border: '2px solid #ced4da' }} />
          </Form.Group>
          <Row>
        <Col md={6}>
          <Form.Group className='p-2'>
            <Form.Label>Phone No:</Form.Label>
            <Form.Control type="number" value={phone2} onChange={(e) => setPhone2(e.target.value)} style={{ border: '2px solid #ced4da' }} />
          </Form.Group>
          </Col>
          <Col md={6}>
          <Form.Group className='p-2'>
          <Form.Label>Highest Qualification</Form.Label>

              <select name=""  className='form-select'
                  value={highestQualification2}
                  onChange={(e)=>setHighestQualification2(e.target.value)} style={{ border: '2px solid #ced4da' }}
                >
              <option selected disabled hidden > HIGHEST QUALIFICATION</option>
              <option >Select One</option>
                <option >High School</option>
                <option >Diploma</option>
                <option>Bachelor</option>
                <option>Master</option>
                <option>PhD</option>
            
              </select>
              </Form.Group>
          </Col>

          <Col md={6}>
          <Form.Group className='p-2'>
          <Form.Label>Course Studied</Form.Label>

              <select name=""  className='form-select'
                  value={courseStudied2}
                  onChange={(e)=>setCourseStudied2(e.target.value)} style={{ border: '2px solid #ced4da' }}
                >
              <option selected disabled hidden > HIGHEST QUALIFICATION</option>
              <option >Select One</option>
                    <option value="FSD">FSD</option>
                    <option value="DSA">DSA</option>
                    <option value="ML-AI">ML-AI</option>
                    <option value="RPA">RPA</option>
                    <option value="ST">ST</option>
                    <option value="CSA">CSA</option>
            
              </select>
              </Form.Group>

          </Col>


          <Col md={6}>
          <Form.Group className='p-2'>
          <Form.Label>Batch Details</Form.Label>

              <select name=""  className='form-select'
                  value={batchDetails2}
                  onChange={(e)=>setBatchDetails2(e.target.value)} style={{ border: '2px solid #ced4da' }}
                >
              <option selected disabled hidden > HIGHEST QUALIFICATION</option>
              <option >Select One</option>
                    <option value="KKEM">KKEM</option>
                    <option value="NORKA">NORKA</option>
                    <option value="KDISC">KDISC</option>
            
              </select>
              </Form.Group>

          </Col>

          </Row>

          <Row>
          <Col md={6}>
          <Form.Group className='p-2'>
          <Form.Label>Placement Status</Form.Label>

              <select name=""  className='form-select'
                  value={placementStatus2}
                  onChange={(e)=>setPlacementStatus2(e.target.value)} style={{ border: '2px solid #ced4da' }}
                >
              <option selected disabled hidden > HIGHEST QUALIFICATION</option>
              <option >Select One</option>
                    <option value="Placed">Placed</option>
                    <option value="Job-Seeking">Job-Seeking</option>
            
              </select>
              </Form.Group>
          </Col>

          <Col md={6}>
          <Form.Group className='p-2'>
            <Form.Label>Company Name</Form.Label>
            <Form.Control type='text' value={companyName2} onChange={(e) => setCompanyName2(e.target.value)} style={{ border: '2px solid #ced4da' }} />
          </Form.Group>
          </Col>
          </Row>

        <Row>

          </Row>

          <Modal.Footer>

          <Button type="submit" variant="danger" onClick={onHide}>Update User</Button>
          <Button type="submit" onClick={onHide}>Cancel</Button>
          </Modal.Footer>

        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default JobUpdateModal;