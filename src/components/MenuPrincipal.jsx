import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function MenuPrincipal() {
  const cart = useCart();
  const cantidad = cart ? cart.totalArticulos : 0;

  return (
    <Navbar expand="md" variant="dark" className="menu-principal">
      <Container>
        <Navbar.Toggle aria-controls="menu-principal" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
            <Nav.Link as={NavLink} to="/contacto">Contáctanos</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/carrito" aria-label={`Carrito, ${cantidad} artículos`}>
              🛒 Carrito
              <span className="contador-carro" aria-hidden="true">{cantidad}</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
