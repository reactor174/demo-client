import React from 'react';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import logo from '../logo.svg';

function Header() {
  return (
	<header className="bg-dark">
		<Container>
		<Navbar bg="dark" variant="dark" expand="lg">
		  <Navbar.Brand as={ Link } to="/">
		  <img
			src={ logo }
			width="36"
			height="36"
			className="app-logo d-inline-block align-top"
			alt="React Bootstrap logo"
		  />
		</Navbar.Brand>
		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
		  <Navbar.Collapse id="basic-navbar-nav">
			<Nav className="mr-auto">
			  <Nav.Link as={ NavLink } to="/">Описание</Nav.Link>
			  <NavDropdown title="Демонстрация" id="basic-nav-dropdown">
				<NavDropdown.Item as={ NavLink } to="/auth">Форма авторизации</NavDropdown.Item>
				<NavDropdown.Item as={ NavLink } to="/maps">Карта на Leaflet</NavDropdown.Item>
				<NavDropdown.Item as={ NavLink } to="/stats">Статистики</NavDropdown.Item>
			  </NavDropdown>
			</Nav>
			<Button href="https://github.com/reactor174" target="_blank" variant="outline-secondary">Github</Button>
		  </Navbar.Collapse>
		</Navbar>
		</Container>
	</header>
  );
}

export default Header;
