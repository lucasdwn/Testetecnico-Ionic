import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Marvel from "../../assets/Marvel";

export default function NavGlobal() {

    return(
        <>
            <Navbar bg="black" variant="dark">
                <Container>
                <Navbar.Brand href="/"><Marvel/></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">HOME</Nav.Link>
                    <Nav.Link href="/visualizar_categorias">CATEGORIAS</Nav.Link>
                    <Nav.Link href="/visualizar_personagens">PERSONAGENS</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
        </>
    )
}