import { Navbar, Container, Button } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import { ThemeContext } from './theme'
import { useContext } from 'react';
import { Link } from 'react-router-dom'

export const Header = () => {
    const { theme, toggle } = useContext(ThemeContext);

    return (
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme={theme}>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Домой</Nav.Link>
                        <Nav.Link as={Link} to="/redux">Счётчик Redux</Nav.Link>
                        <Nav.Link onClick={toggle}>Сменить тему</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Brand href="#home">Лабораторные работы по курсу</Navbar.Brand>
            </Container>
        </Navbar>
    );
};