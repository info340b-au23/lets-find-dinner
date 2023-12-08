import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Header } from './Header';
import { useEffect, useRef } from 'react';

export function About({heightCallback, ...props}) {
    const containerRef = useRef(null);

    useEffect(() => {
        heightCallback(containerRef.current.clientHeight);
    })

    return (
        <div ref={containerRef}>
            <Header title="Our Mission" background="about-page" />
            <Container className="text-content margin-bottom-body">
                <section className="about">
                    <Row>
                        <img id="strawberries-img" src="img/strawberries.jpg" alt="a hand holding delicious strawberries" />
                        <p>
                            <em className="em--pink">Let's Find Dinner!</em> is a platform dedicated to addressing food insecurity in King County. Our mission is to connect individuals and families in need with local food banks and volunteers.
                        </p>
                        <p>
                            Through our user-friendly interface, users can easily locate nearby food banks, discover the specific items and resources that each food bank requires, and contribute their time and resources to make a positive impact in their community.
                        </p>
                        <p>
                            We believe that no one should go hungry, and with Let's Find Dinner, we're working towards a more inclusive, nourished, and resilient community for all.
                        </p>
                    </Row>
                </section>
            </Container>
        </div>
    );
}
