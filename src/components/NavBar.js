import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

export function NavBar(props) {
    return (
        <Navbar expand="lg" bg="dark" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand href="/" className="ps-lg-4">Let's Find Dinner!</Navbar.Brand>
                <Navbar.Toggle className="white" aria-controls="navbar-content" />
                <Navbar.Collapse id="navbar-content">
                    <Nav className="me-auto">
                        <Nav.Link href="about">Our Mission</Nav.Link>
                        <Nav.Link href="volunteer">Volunteer</Nav.Link>
                        <Nav.Link href="find-a-food-bank">Find a Food Bank</Nav.Link>
                    </Nav>
                    <Nav className="d-flex pe-lg-4">
                        <Nav.Link href={props.loggedIn ? "sign-out" : "login"}>{props.loggedIn ? "Sign Out" : "Sign In"}</Nav.Link>
                        <Nav.Link href="account">Account</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}