import { useNavigate } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Marvel from "../../assets/Marvel";
import { Button } from "react-bootstrap";

export function Home() {
    const navigate = useNavigate();

    function viewCategorias() {
        navigate('/visualizar_categorias')    
    }

    function novaCategoria() {
        navigate('/nova_categoria')    
    }

    function viewPersonagens() {
        navigate('/visualizar_personagens')    
    }

    function novoPersonagem() {
        navigate('/novo_personagem')    
    }

    return (
        <>
        <section>
            <header>
                <Navbar bg="black" variant="dark">
                    <Container>
                    <Navbar.Brand href="/"><Marvel/></Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">HOME</Nav.Link>
                    </Nav>
                    </Container>
                </Navbar>
            </header>
            <main>
                <div className="buttons">
                    <Button variant="danger" onClick={novaCategoria}>NOVA CATEGORIA</Button>{' '}
                    <Button variant="danger" onClick={novoPersonagem}>NOVO PERSONAGEM</Button>{' '}
                    <Button variant="danger" onClick={viewCategorias}>VISUALIZAR CATEGORIAS</Button>{' '}
                    <Button variant="danger" onClick={viewPersonagens}>VISUALIZAR PERSONAGENS</Button>{' '}  
                </div>
            </main>
        </section>
        </>
    )
}