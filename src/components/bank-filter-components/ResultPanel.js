import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Collapse from "react-bootstrap/Collapse";
import { useState } from "react";

import Button from "react-bootstrap/Button";

export function ResultsPanel(props) {
    // TODO: add data to results.json; may need to use Firebase storage later

    const resultsList = props.banks.map((bank) => {
        return <ResultCard bankData={bank} key={bank.bid} />;
    })

    return (
        <Col>
            <section id="search-results">
                <Row className="shadow-lg sub-section-title">
                    <Col>
                        <h2>Results</h2>
                    </Col>
                </Row>
                <Row>
                    {resultsList}
                </Row>
            </section>
        </Col>
    );
}

// Possible TODO: add donations section to each ResultCard?
function ResultCard({bankData}) {
    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
        setExpanded(!expanded);
    }

    return (
        <Col md="6" xl="4">
            <Card className="result-item my-2 shadow">
                <Card.Header className="pt-4" aria-controls="test" aria-expanded={expanded} onClick={handleExpand}>
                    <Row>
                        <Col xs="1" className="d-flex align-items-center">
                            {expanded ? <i class="fa-solid fa-angle-down icon-expand"></i> : <i class="fa-solid fa-angle-right icon-expand"></i>}
                        </Col>
                        <Col>
                            <h3>Snohomish Community Food Bank</h3>
                        </Col>
                    </Row>
                </Card.Header>
                <Collapse in={expanded}>
                    <Card.Body id="test">
                        <h4>Location</h4>
                        <p>1330 Ferguson Park Rd, Snohomish, WA, 98292</p>
                        <h4>Hours</h4>
                        <p>Tuesday: 10am-2pm</p>
                        <h4>Contact Info</h4>
                        {bankData.phone &&
                            <div className="contact-info-group">
                                <i class="fa-solid fa-phone"></i>
                                <p>Phone</p>
                            </div>
                        }
                        <div className="contact-info-group">
                            <i class="fa-solid fa-envelope"></i>
                            <p>Email</p>
                        </div>
                        <div className="contact-info-group">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                            <p>Website</p>
                        </div>
                    </Card.Body>
                </Collapse>
            </Card>
        </Col>
    );
}