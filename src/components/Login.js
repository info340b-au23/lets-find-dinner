import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Header } from './Header';
import { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { StyledFirebaseAuth } from 'react-firebaseui';

const configObj = {
    signInOptions: [
        {
            provider: EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true
        },
        {
            provider: GoogleAuthProvider.PROVIDER_ID
        }
    ],
    signInFlow: 'popup',
    callbacks: {
        signInSuccessWithAuthResult: () => false
    },
    credentialHelper: 'none'
}

export function Login({heightCallback, ...props}) {
    const containerRef = useRef(null);

    const auth = getAuth();

    useEffect(() => {
        if (!props.user) {
            heightCallback(containerRef.current.clientHeight);
        }
    });

    if (props.user) {
        return <Navigate to="/account" />;
    }

    return (
        <div ref={containerRef}>
            <Header title="Login" background="login-page" /> 
            <Container className="pb-4">
                <Row className="justify-content-center">
                    <Col sm="8" md="6" lg="5" xl="4">
                        <Card className="px-3 py-4 bg-dark">
                            <StyledFirebaseAuth uiConfig={configObj} firebaseAuth={auth} />
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}