import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Header } from './Header';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getDatabase, ref, onValue, push as firebasePush } from 'firebase/database';

export function VolunteerForm({heightCallback, user, bankList}) {
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
    const [foodBank, setFoodBank] = useState("");
    const [showSuccess, setShow] = useState(false);
    
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
    
    const handleFoodBankChange = (event) => {
        setFoodBank(event.target.value);
    }

    const isValidName = (name) => {
        return name.length !== 0;
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

    const isValidFoodBank = (foodBank) => {
        return foodBank.length !== 0;
    }

    const resetForm = () => {
        setName("");
        setEmail("");
        setPhone("");
        setAge("");
        setZipCode("");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!isValidName(name) || !isValidEmail(email) || !isValidZipCode(zipCode) || !isValidPhone(phone) || !isValidAge(age) || !isValidFoodBank(foodBank)) {
            setValidated(false);
        } else {
            const date = new Date();
            let submitDate = "";
            if (date.getMonth() + 1 < 10) {
                submitDate += 0;
            }
            submitDate += (date.getMonth() + 1) + "-";
            if (date.getDate() < 10) {
                submitDate += 0;
            }
            submitDate += date.getDate() + "-" + date.getFullYear();

            const db = getDatabase();
            let phoneStr = phone.substring(0, 3) + "-" + phone.substring(3, 6) + "-" + phone.substring(6);
            const bid = bankList.reduce((acc, curr) => {
                if (curr.name === foodBank) {
                    return curr.bid;
                }
                return acc;
            }, "");
            let app = {
                date: submitDate,
                name: name,
                email: email,
                phone: phoneStr,
                age: age,
                zip: zipCode,
                foodBankName: foodBank,
                bid: bid,
                approval: "Pending"
            }

            if (user) {
                const userVolRef = ref(db, "volunteer-apps-users/" + user.uid);
                const newVolAppRef = firebasePush(userVolRef, app);
                const volAppKey = newVolAppRef.key;
                app.volKey = volAppKey;
                app.uid = user.uid;
            }

            const bankVolRef = ref(db, "volunteer-apps-providers/" + bid);
            firebasePush(bankVolRef, app);

            setValidated(true);
            resetForm();
            setShow(true);
        }
    }

    const handleClose = () => {
        setShow(false);
    }

    useEffect(() => {
        if (user) {
            const db = getDatabase();
            const userRef = ref(db, "users/" + user.uid);
            
            const unregisterFunction = onValue(userRef, (snapshot) => {
                if (snapshot.exists()) {
                    const user = snapshot.val();
                    const phone = user.phone.replaceAll("-", "");
                    const email = user.email;
                    const name = user.name;
                    setName(name);
                    setEmail(email);
                    setPhone(phone);
                }
            });
    
            function cleanup() {
                unregisterFunction();
            }
            
            return cleanup;
        }
    }, [user])

    const bankOptions = bankList.sort((a, b) => {
        return a.name.localeCompare(b.name);
    })
    .map((bank) => {
        return <option key={bank.bid} value={bank.name}>{bank.name}</option>
    });

    const pageDescription = user ?
        <p>Previously submitted applications can be viewed on your account page.</p> :
        <p>Log in to view previously submitted applications.</p>

    return (
        <div ref={containerRef}>
            <Header title="Volunteer Form" background="volunteer-page" />
            <Container className="text-content pb-4">
                <Row>
                    <h2 className="text-small">To apply for a volunteer position at a local food bank, fill out the application below.</h2>
                    {pageDescription}
                    <Form noValidate id="volunteer-form" onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="food-bank-input" className="volunteer-label">Food Bank</Form.Label>
                            <Form.Select
                                required
                                id="food-bank-input"
                                className="volunteer-form-field"
                                name="food-bank-input"
                                value={foodBank}
                                type="select"
                                as="select"
                                isValid={validated === false && isValidFoodBank(foodBank)}
                                isInvalid={validated === false && !isValidFoodBank(foodBank)}
                                onChange={handleFoodBankChange}
                            >
                                <option value="">Select a food bank</option>
                                {bankOptions}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Please select a food bank.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label htmlFor="name-input" className="volunteer-label">Name</Form.Label>
                            <Form.Control
                                required
                                id="name-input"
                                className="volunteer-form-field"
                                name="name-input"
                                value={name}
                                type="text"
                                isValid={validated === false && isValidName(name)}
                                isInvalid={validated === false && !isValidName(name)}
                                onChange={handleNameChange}
                            />
                            <Form.Control.Feedback type="invalid">Please enter your name.</Form.Control.Feedback>
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
                                isValid={validated === false && isValidEmail(email)}
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
                                isValid={validated === false && isValidPhone(phone)}
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
                                isValid={validated === false && isValidAge(age)}
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
                                isValid={validated === false && isValidZipCode(zipCode)}
                                isInvalid={validated === false && !isValidZipCode(zipCode)}
                                onChange={handleZipCodeChange}
                            />
                            <Form.Control.Feedback type="invalid">Please enter a valid 5-digit zip code.</Form.Control.Feedback>
                        </Form.Group>
                        {validated && 
                            <Modal show={showSuccess} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title><strong>Thank you for your application.</strong></Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <p>You have successfully applied!</p>
                                    <p>Your requested food bank will contact you via email when your application has been reviewed.</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    {user &&
                                        <Button variant="danger" as={Link} to="/account">Account</Button>
                                    }
                                    <Button variant="primary" onClick={handleClose}>Close</Button>
                                </Modal.Footer>
                            </Modal>
                        }
                        <Button
                            id="volunteer-submit-btn"
                            variant="danger"
                            className="non-search-btn btn--dark-red mt-3"
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