import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import ictlogo from "../assets/images/ictlogo.jpg";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

function Header() {
  const userStrInfo = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userStrInfo);
  const navigate = useNavigate();

  const logOutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
    window.location.reload();
  };

  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <LinkContainer to={"/"}>
          <Navbar.Brand>
            <Image src={ictlogo}></Image>
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to={"/ourcompanies"} style={{ color: "black" }}>
              <Nav.Link>
                <Button variant="light">Our Companies</Button>
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to={"/aboutus"}>
              <Nav.Link>
                <Button variant="light">About Us</Button>
              </Nav.Link>
            </LinkContainer>
          </Nav>
          {userInfo &&
          userInfo.status === "success" &&
          userInfo.userType === "Employer" ? (
            <Nav>
              <LinkContainer to={"/jobcreation"}>
                <Nav.Link>
                  <Button variant="light">Add Jobs</Button>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/viewJob"}>
                <Nav.Link>
                  <Button variant="light">Current Jobs</Button>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/mocktest"}>
                <Nav.Link>
                  <Button variant="light">Mock Test</Button>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/"}>
                <Nav.Link>
                  <Button onClick={logOutHandler} variant="light">
                    Logout
                  </Button>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          ) : null}
          {userInfo &&
          userInfo.status === "success" &&
          userInfo.userType === "Admin" ? (
            <Nav>
              <LinkContainer to={"/jobcreation"}>
                <Nav.Link>
                  <Button variant="light">Add Jobs</Button>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/adminjobscreen"}>
                <Nav.Link>
                  <Button variant="light">Current Jobs</Button>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/useredit_admin"}>
                <Nav.Link>
                  <Button variant="light">Users</Button>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/"}>
                <Nav.Link>
                  <Button onClick={logOutHandler} variant="light">
                    Logout
                  </Button>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          ) : null}
          {userInfo &&
          userInfo.status === "success" &&
          userInfo.userType === "Employee" ? (
            <Nav>
              <LinkContainer to={"/jobpostings"}>
                <Nav.Link>
                  <Button variant="light">View Jobs</Button>
                </Nav.Link>
              </LinkContainer>
              {/* <LinkContainer to={"/jobcreation"}>
                <Nav.Link>
                  <Button variant="light">Profile</Button>
                </Nav.Link>
              </LinkContainer> */}
              <LinkContainer to={"/"}>
                <Nav.Link>
                  <Button onClick={logOutHandler} variant="light">
                    Logout
                  </Button>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          ) : null}
          {!userInfo && (
            <Nav>
              <LinkContainer to={"/register"}>
                <Nav.Link>
                  <Button variant="light">Register</Button>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/login"}>
                <Nav.Link>
                  <Button variant="light">Login</Button>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
