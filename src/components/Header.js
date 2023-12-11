import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function Header(props) {
    let titleClassList = "header ";
    let rowClassList = "shadow "
    if (props.background) {
        titleClassList = props.background + "-title";
        rowClassList += "page-title ms-5";
    } else {
        rowClassList += "no-background-img ps-lg-4 m";
    }
    
    return(
        <Container fluid className={titleClassList + " mb-5"}>
            <header>
                <Col className={rowClassList}>
                    <h1>{props.title}</h1>
                </Col>
            </header>
        </Container>
    )
}