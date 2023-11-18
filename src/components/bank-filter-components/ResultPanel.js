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

    const fullAddress = bankData.address + ", " + bankData.city + ", WA, " + bankData.zip;
    
    const hours = Object.entries(bankData.hoursOpen).map(([day, time]) => {
        let [timeStart, timeEnd] = time.split("-");
        timeStart = timeStart.replaceAll(/([^:0-9])/g, "$1.");
        timeStart = timeStart.replace(/(a|p)/g, " $1");
        timeEnd = timeEnd.replaceAll(/([^:0-9])/g, "$1.");
        timeEnd = timeEnd.replace(/(a|p)/g, " $1");
        return <p><strong>{day}</strong>: {timeStart + " - " + timeEnd}</p>;
    });

    return (
        <Col md="6" xl="4">
            <Card className="result-item my-2 shadow">
                <Card.Header className="pt-4">
                    <Row>
                        <Col xs="1" className="d-flex align-items-center">
                            <div aria-controls={bankData.bid + "-info"} aria-expanded={expanded} onClick={handleExpand}>
                                {expanded ? 
                                    <i className="fa-solid fa-angle-down icon-expand"></i> :
                                    <i className="fa-solid fa-angle-right icon-expand"></i>
                                }
                            </div>
                        </Col>
                        <Col>
                            <h3>{bankData.name}</h3>
                        </Col>
                    </Row>
                </Card.Header>
                <Collapse in={expanded}>
                    <Card.Body id={bankData.bid + "-info"}>
                        <h4>Location</h4>
                        <p>{fullAddress}</p>
                        <h4>Hours</h4>
                        {hours}
                        <h4>Contact</h4>
                        {bankData.phone &&
                            <div className="contact-info-group">
                                <a href={"tel:" + bankData.phone}>
                                    <i className="fa-solid fa-phone"></i>
                                    <p>Phone</p>
                                </a>
                            </div>
                        }
                        {bankData.email &&
                            <div className="contact-info-group">
                                <a href={"mailto:" + bankData.email}>
                                    <i className="fa-solid fa-envelope"></i>
                                    <p>Email</p>
                                </a>
                            </div>
                        }
                        {bankData.website &&
                            <div className="contact-info-group">
                                <a href={bankData.website} target="_blank">
                                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    <p>Website</p>
                                </a>
                            </div>
                        }
                    </Card.Body>
                </Collapse>
            </Card>
        </Col>
    );
}