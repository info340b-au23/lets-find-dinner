import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";

export function NavBar(props) {
    const handleLogout = () => {
        if (props.user !== null) {
            props.handleLogout();
        }
    }

    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand as={NavLink} to="/" className="ps-lg-4">Let's Find Dinner!</Navbar.Brand>
                <Navbar.Toggle className="white" aria-controls="navbar-content" />
                <Navbar.Collapse id="navbar-content">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="about">Our Mission</Nav.Link>
                        <Nav.Link as={NavLink} to="volunteer">Volunteer</Nav.Link>
                        <Nav.Link as={NavLink} to="find-a-food-bank">Find a Food Bank</Nav.Link>
                    </Nav>
                    <Nav className="d-flex pe-lg-4">
                        <Nav.Link as={NavLink} onClick={handleLogout} to={props.user !== null ? "/" : "login"}>{props.user !== null ? "Sign Out" : "Sign In"}</Nav.Link>
                        <Nav.Link as={NavLink} to="account">Account</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}