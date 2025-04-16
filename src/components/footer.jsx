import { Container, Row, Col, Nav } from 'react-bootstrap';
import { ThemeContext } from './theme'
import { useContext } from 'react';

export const Footer = () => {
    const { theme, _ } = useContext(ThemeContext);

    return (
        <footer
            id="themeable-footer"
            className="py-4 mt-auto"
            style={{
                backgroundColor: 'var(--bs-body-bg)',
                color: 'var(--bs-body-color)'
            }}
            data-bs-theme={theme}
        >
            <Container>
                <Row>
                    <Col md={4} className="mb-3 mb-md-0">
                        <h5>About Us</h5>
                        <p className="small">
                            Your company description goes here.
                            Provide some information about your mission and values.
                        </p>
                    </Col>

                    <Col md={4} className="mb-3 mb-md-0">
                        <h5>Quick Links</h5>
                        <Nav className="flex-column">
                            <Nav.Link href="#">Home</Nav.Link>
                            <Nav.Link href="#">Services</Nav.Link>
                            <Nav.Link href="#">Products</Nav.Link>
                            <Nav.Link href="#">Contact</Nav.Link>
                        </Nav>
                    </Col>

                    <Col md={4}>
                        <h5>Contact Info</h5>
                        <address className="small">
                            123 Main Street<br />
                            City, State 12345<br />
                            <abbr title="Phone">P:</abbr> (123) 456-7890<br />
                            <abbr title="Email">E:</abbr> info@example.com
                        </address>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col className="text-center small">
                        &copy; {new Date().getFullYear()} Tashevsky & Co.
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};
