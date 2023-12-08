import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"
import { Header } from "./Header";
import { Link } from "react-router-dom";

export function Home(props) {
    return (
      <div>
        <Header
          title="Because families deserve not to worry about their next meal."
          background="home-page"
        />
        <Container>
          <Container className="text-content">
            <Row>
              <h2>Welcome to Let's Find Dinner!</h2>
            </Row>
            <Row>
              <section className="home-page-introduction">
                <p>
                  Food insecurity is a pressing issue that affects thousands of residents in King County. Many families and individuals struggle to access nutritious meals for themselves and their loved ones. In 2021, approximately 33.8 million Americans experienced food insecurity, highlighting the urgent need for effective solutions.
                </p>
              </section>
              <Row className="sub-section-title">
                <h3>How can we help?</h3>
              </Row>
              <p>
                Anyone can explore food banks in King County and help fight food insecurity. Below are some resources for combating food insecurity in your local community.
              </p>
              <div className="home-page-buttons">
                <Button as={Link} variant="danger" to="volunteer" id="home-btn-volunteer" className="non-search-btn btn--dark-red">
                  Volunteer
                </Button>
                <Button as={Link} variant="danger" to="find-a-food-bank" id="home-btn-bank-search" className="non-search-btn btn--dark-red">
                  Donate/Find Food
                </Button>
              </div>
              <Row className="sub-section-title">
                <h3>Why Let's Find Dinner?</h3>
              </Row>
              <Row>
                <Col md="3">
                  <img id="home-veggies" src="img/veggies.webp" alt="Delicious veggies" />
                </Col>
                <Col>
                  <p>
                    Let's Find Dinner aims to address this challenge by providing a centralized platform that connects those in need with local food banks and volunteers. Our mission is to bridge the gap between resources and those who require them, making it easier for people to access essential food assistance.
                </p>
                </Col>
              </Row>
            </Row>
          </Container>
        </Container>
      </div>
    );
  }