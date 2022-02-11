import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Navigation(){
    return(
        <div>
            <Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand><h3>BooksLister</h3></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/About" className="nav-link">About</Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
        </div>
    )
}