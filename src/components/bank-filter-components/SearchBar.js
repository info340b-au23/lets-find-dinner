import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";


export function SearchBar(props) {
    const [searchText, setSearchText] = useState("");

    const handleTextChange = (event) => {
        setSearchText(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.submitCallback(searchText.toLowerCase());
    }


    return (
        <Row>
            <Col lg="6">
                <section id="search-bar">
                    <Form onSubmit={handleSubmit}>
                        <Form.Label htmlFor="bank-search-text-input">SEARCH BY NAME</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                id="bank-search-text-input"
                                className="border border-secondary"
                                name="bank-search-text-input"
                                value={searchText}
                                onChange={handleTextChange}
                                placeholder="Enter food bank name"
                                aria-label="Food bank search input"
                                autoComplete="off"
                            />
                            <Button variant="danger" id="bank-search-button" type="submit">
                                <i id="search-button-icon" aria-label="submit" className="fa-solid fa-magnifying-glass"></i>
                                <p id="search-button-text">Search</p>
                            </Button>
                        </InputGroup>
                    </Form>
                </section>
            </Col>
        </Row>
    );
}