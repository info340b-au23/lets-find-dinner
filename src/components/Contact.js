import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Header } from './Header';
import { Footer } from './Footer';
import { useState } from 'react';

export function VolunteerForm(props) {
    const [validated, setValidated] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState("");
    const [zipCode, setZipCode] = useState("");
    
    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    }

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    }

    const handleZipCodeChange = (event) => {
        setZipCode(event.target.value);
    }

    const isValidEmail = (email) => {
        const atIndex = email.indexOf('@');
        const dotIndex = email.lastIndexOf('.');
        return atIndex !== -1 && dotIndex > atIndex && dotIndex < email.length - 1;
    }

    const isValidZipCode = (zipCode) => {
        return zipCode.length === 5 && !isNaN(zipCode);
    };

    const isValidPhone = (phone) => {
        const validPhone = /^\d{10}$/;
        return validPhone.test(phone);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValidated(true);

        if (event.currentTarget.checkValidity() === false) {
            return;
        }
        if (!isValidEmail(email)) {
            setValidated(false);
            return;
        }
        if (!isValidZipCode(zipCode)) {
            setValidated(false);
            return;
        }
        if (!isValidPhone(phone)) {
            setValidated(false);
            return;
        }
        setValidated(true);
        
    }

    console.log(validated);

    return (
        <div>
            <Header title="Volunteer Form" background="volunteer-page" />
            <Container className="text-content">
                <Row>
                    <h2 className="text-small">To apply for a volunteer position at a local food bank, fill out the application below.</h2>
                    <Form noValidate validated={validated} id="volunteer-form" onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="name-input" className="volunteer-label">Name</Form.Label>
                            <Form.Control
                                required
                                id="name-input"
                                className="volunteer-form-field"
                                name="name-input"
                                value={name}
                                type="text"
                                onChange={handleNameChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="email-input" className="volunteer-label">Email</Form.Label>
                            <Form.Control
                                required
                                id="email-input"
                                className="volunteer-form-field"
                                name="email-input"
                                value={email}
                                type="text"
                                isInvalid={validated === false && !isValidEmail(email)} 
                                onChange={handleEmailChange}
                            />
                            <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="phone-input" className="volunteer-label">Phone</Form.Label>
                            <Form.Control
                                required
                                id="phone-input"
                                className="volunteer-form-field"
                                name="phone-input"
                                value={phone}
                                type="text"
                                isInvalid={validated === false && !isValidPhone(phone)}
                                onChange={handlePhoneChange}
                            />
                            <Form.Control.Feedback type="invalid">Please enter a valid 10-digit phone number.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="age-input" className="volunteer-label">Age</Form.Label>
                            <Form.Control
                                required
                                id="age-input"
                                className="volunteer-form-field"
                                name="age-input"
                                value={age}
                                type="text"
                                onChange={handleAgeChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="zip-code-input" className="volunteer-label">Zip Code</Form.Label>
                            <Form.Control
                                required
                                id="zip-code-input"
                                className="volunteer-form-field"
                                name="zip-code-input"
                                value={zipCode}
                                type="text"
                                isInvalid={validated === false && !isValidZipCode(zipCode)}
                                onChange={handleZipCodeChange}
                            />
                            <Form.Control.Feedback type="invalid">Please enter a valid 5-digit zip code.</Form.Control.Feedback>
                        </Form.Group>
                        {validated && <p>You have successfully applied!</p>}
                        <Button
                            id="volunteer-submit-btn"
                            variant="danger"
                            className="non-search-btn btn--dark-red"
                            type="submit"
                        >
                            Apply
                        </Button>
                    </Form>
                </Row>
            </Container>
            <Footer fixFooter={false} />
        </div>
    );
}