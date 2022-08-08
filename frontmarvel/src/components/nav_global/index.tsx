import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Marvel from "../../assets/Marvel";

export default function NavGlobal() {

    return(
        <>
            <Navbar collapseOnSelect expand="lg" bg="black" variant="dark">
                <Container>
                    <Navbar.Brand href="/"><Marvel/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title="Categoria" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/nova_categoria">Nova Categoria</NavDropdown.Item>
                            <NavDropdown.Item href="/visualizar_categorias">Visualizar Categorias</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Personagem" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/novo_personagem">Novo Personagem</NavDropdown.Item>
                            <NavDropdown.Item href="/visualizar_personagens">Visualizar Personagens</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}