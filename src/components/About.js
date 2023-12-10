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
            <Container className="text-content pb-4">
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
                            In addition, users can submit volunteer applications and view their application statuses in their user profile. Alternatively, if they wish to submit applications without first creating an account, they can do so by providing the required information on the Volunteer page.
                        </p>
                        <p>
                            Accounts with admin privileges for a given food bank can view volunteer application history and approve or reject pending applications, which updates the status of an application for the person who submitted it, should the person who submitted an application be logged in on submission.  
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
