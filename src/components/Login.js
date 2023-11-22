import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Header } from './Header';
import { Footer } from './Footer';
import { Link } from 'react-router-dom';

export function Login(props) {
    return (
        <div>
            <Header title="Login" background="login-page" /> 
            <Container className="text-content">
                <Row>
                    <h2>Welcome back!</h2>
                    <Form id="login-form">
                        <Form.Group controlId="validate-username">
                            <Form.Control
                                required
                                type="text"
                                name="username"
                                id="login-username-field"
                                className="login-form-field"
                                placeholder="Username"
                                autoComplete="off"
                            />
                            <Form.Control.Feedback>Heck yeah</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Control
                            type="password"
                            name="password"
                            id="login-password-field"
                            className="login-form-field"
                            placeholder="Password"
                        />
                        <Button id="login-button" type="submit" variant="danger" className="non-search-btn btn--dark-red login-page-button">
                            Log In
                        </Button>
                        <br />
                        <Link to="/" >
                            <Button id="client-sign-up-button" className="non-search-btn login-page-button" type="button" variant="danger">
                                Create a client account
                            </Button>
                        </Link>
                        <Link to="/" >
                            <Button id="provider-sign-up-button" className="non-search-btn login-page-button" type="button" variant="danger">
                                Create a provider account
                            </Button>
                        </Link>
                    </Form>
                </Row>
            </Container>
            <Footer fixFooter={false} />
        </div>
    );
}