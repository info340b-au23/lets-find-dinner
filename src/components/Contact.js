import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Header } from './Header';
import { useEffect, useRef, useState } from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyDSjUgcZJgVaXAnFLkQgvv8CBMLreO6yCU",
    authDomain: "lets-find-dinner.firebaseapp.com",
    projectId: "lets-find-dinner",
    storageBucket: "lets-find-dinner.appspot.com",
    messagingSenderId: "257731440186",
    appId: "1:257731440186:web:42aa4c3756372abf648f03"
  };
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();  


export function VolunteerForm({heightCallback, ...props}) {
    const containerRef = useRef(null);

    useEffect(() => {
        heightCallback(containerRef.current.clientHeight);
    })

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

    const isValidAge = (age) => {
        const validAge = parseInt(age);
        return !isNaN(validAge) && validAge > 12 && validAge < 100;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setValidated(true);
    
        if (event.currentTarget.checkValidity() === false) {
            return;
        }
        if (!isValidEmail(email) || !isValidZipCode(zipCode) || !isValidPhone(phone) || !isValidAge(age)) {
            setValidated(false);
            return;
        }
    
        database.ref('volunteers').push({
            name,
            email,
            phone,
            age: parseInt(age),
            zipCode: parseInt(zipCode),
        })
        .then(() => {
            setValidated(true);
        })
        .catch((error) => {
            console.error("Error pushing data to Firebase:", error);
        });
    }

    return (
        <div ref={containerRef}>
            <Header title="Volunteer Form" background="volunteer-page" />
            <Container className="text-content pb-4">
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
                                isInvalid={validated === false && !isValidAge(age)}
                                onChange={handleAgeChange}
                            />
                            <Form.Control.Feedback type="invalid">Please enter your age between 13 and 100 years old.</Form.Control.Feedback>
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
        </div>
    );
}