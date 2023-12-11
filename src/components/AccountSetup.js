import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Header } from "./Header";
import { useState, useEffect, useRef } from 'react';
import { getDatabase } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

export function Setup({heightCallback, ...props}) {
    const [validated, setValidated] = useState(null);
    const [phone, setPhone] = useState("");
    const [bid, setBid] = useState("");
    const [displayBidError, setDisplayBidError] = useState(false);
    
    const navigate = useNavigate();

    const containerRef = useRef(null)
    
    useEffect(() => {
        heightCallback(containerRef.current.clientHeight);
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!isValidPhone(phone) || (bid.length !== 0 && !isValidBid(bid))) {
            if (!isValidBid(bid) && bid.length !== 0) {
                setDisplayBidError(true);
            }
            setValidated(false);
        } else {
            navigate("/account");
        }
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handleBidChange = (event) => {
        setBid(event.target.value);
        setDisplayBidError(false);
    }

    const isValidPhone = (phone) => {
        const validPhone = /^\d{10}$/;
        return validPhone.test(phone);
    };

    const isValidBid = (bid) => {
        return props.bankList.reduce((acc, curr) => {
            if (curr.bid === bid) {
                return true;
            }
            return acc;
        }, undefined);
    };

    return(
        <div ref={containerRef}>
            <Header title="Account Setup" />
            <Container className="text-content pb-4">
                <Row>
                    <h2>You're almost there...</h2>
                    <p className="mb-0">We need some more information before we can finish setting up your account.</p>
                    <p>You can update this information later on your account page.</p>
                </Row>
                <Row>
                    <Form noValidate id="volunteer-form" onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="setup-phone-input" className="setup-label">Phone</Form.Label>
                            <Form.Control
                                required
                                id="setup-phone-input"
                                className="setup-form-field"
                                name="setup-phone-input"
                                value={phone}
                                type="text"
                                isValid={validated === false && isValidPhone(phone)}
                                isInvalid={validated === false && !isValidPhone(phone)}
                                onChange={handlePhoneChange}
                            />
                            <Form.Control.Feedback type="invalid">Please enter a valid 10-digit phone number.</Form.Control.Feedback>
                        </Form.Group>
                        <p className="my-2">
                            If you are a food bank provider, you can enter your organization's unique food bank identifier for admin privileges for your bank. Note that you can only manage at most one bank.
                        </p>
                        <Form.Group>
                            <Form.Label htmlFor="bid-input" className="setup-label">
                                Food Bank Provider ID
                            </Form.Label>
                            <Form.Control
                                id="bid-input"
                                className="setup-form-field"
                                name="bid-input"
                                value={bid}
                                type="text"
                                onChange={handleBidChange}
                            />
                        </Form.Group>
                        {displayBidError &&
                            <p className="setup-invalid mb-0">
                                The food bank identifier you entered does not match any food bank on record.
                            </p>
                        }
                        <Button
                            id="setup-submit-btn"
                            variant="danger"
                            className="non-search-btn btn--dark-red mt-3"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Form>
                </Row>
            </Container>
        </div>
    )
}