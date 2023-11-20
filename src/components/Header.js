import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function Header(props) {
    let titleClassList = "m-lg-0";
    if (props.background) {
        titleClassList += " " + props.background + "-title";
    }
    
    return(
        <Container fluid className="header">
            <Container fluid className={titleClassList}>
                <Row className="shadow page-title">
                    <Col>
                        <h1>{props.title}</h1>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}