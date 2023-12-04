import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function Header(props) {
    let titleClassList = "m-lg-0";
    let rowClassList = "shadow "
    if (props.background) {
        titleClassList += " " + props.background + "-title";
        rowClassList += "page-title";
    } else {
        rowClassList += "no-background-img ps-lg-4";
    }
    
    return(
        <Container fluid className="header">
            <header>
                <Container fluid className={titleClassList}>
                    <Row className={rowClassList}>
                        <Col>
                            <h1>{props.title}</h1>
                        </Col>
                    </Row>
                </Container>
            </header>
        </Container>
    )
}