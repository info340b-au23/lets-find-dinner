import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Header } from './Header';
import { Footer } from './Footer';

export function MisDirect(props) {
    return (
        <div>
            <Header title="Oh no!" />
            <Container className="text-content">
                <Row>
                    <Col>
                        <h2 className="pb-1">The page you were looking for does not exist.</h2>
                        <p>Better luck next time!</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}