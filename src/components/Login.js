import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Header } from './Header';
import { Footer } from './Footer';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function Login(props) {
    const [validated, setValidated] = useState(null);
    const [usernameText, setUsernameText] = useState("");
    const [passwordText, setPasswordText] = useState("");

    const navigate = useNavigate();

    const handleLoginSubmit = (event) => {
        if (event.currentTarget.checkValidity() === false) {
            setValidated(false);
        } else {
            let user = usernameText;
            props.loginCallback(user);
            setUsernameText("");
            setPasswordText("");
            setValidated(true);
            navigate("/");
        }
        event.preventDefault();
    }

    const handleUsernameChange = (event) => {
        setUsernameText(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPasswordText(event.target.value);
    }

    if (props.user) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <Header title="Login" background="login-page" /> 
            <Container className="text-content">
                <Row>
                    <h2>Welcome back!</h2>
                    <Form noValidate validated={validated} onSubmit={handleLoginSubmit} id="login-form">
                        <Form.Group>
                            <Form.Control
                                required
                                type="text"
                                name="username"
                                value={usernameText}
                                id="login-username-field"
                                className="login-form-field"
                                placeholder="Username"
                                autoComplete="off"
                                isInvalid={validated === false && !usernameText}
                                onChange={handleUsernameChange}
                            />
                            <Form.Control.Feedback type="invalid">Please enter a usename.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                required
                                type="password"
                                name="password"
                                value={passwordText}
                                id="login-password-field"
                                className="login-form-field"
                                placeholder="Password"
                                autoComplete="off"
                                isInvalid={validated === false && !passwordText}
                                onChange={handlePasswordChange}
                            />
                            <Form.Control.Feedback type="invalid">Please enter a password.</Form.Control.Feedback>
                        </Form.Group>
                        <Button id="login-button" type="submit" variant="danger" className="non-search-btn btn--dark-red login-page-button">
                            Log In
                        </Button>
                    </Form>
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
                </Row>
            </Container>
            <Footer fixFooter={false} />
        </div>
    );
}