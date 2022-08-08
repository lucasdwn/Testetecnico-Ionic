import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavGlobal from "../../components/nav_global";
import api from "../../services/api";

interface IPersonagem{
    id: number;
    nome: string;
    imagem: string;
    descrição: string;
    categoriaId: number;
}

export default function VisualizarPersonagem() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [personagem, setPersonagem] = useState<IPersonagem>();

    useEffect(() => {
        viewPersonagem()
    }, [id]);

    function back(){
        navigate("/visualizar_personagens")
    };

    async function viewPersonagem() {
        const response = await api.get<IPersonagem>(`/Personagem/${id}`)
        setPersonagem(response.data)
    }

    return(
        <>
        <section>
            <header>
                <NavGlobal/>
            </header>
            <main>
                <div className="title">
                    <h1>Visualizar Personagem</h1>
                    <Button variant="danger" onClick={back}>Voltar</Button>{' '}
                </div>
                <div className="div">
                    <div className="card">
                        <Card
                        bg="dark"
                        text="light"
                        border='light'
                        style={{ width: '18rem' }}
                        >
                        <Card.Header>Personagem: {personagem?.nome}</Card.Header>
                        <Card.Body>
                            <Card.Title><img src={personagem?.imagem}/></Card.Title>
                            <Card.Title>Id: {personagem?.id} </Card.Title>
                            <Card.Title>Nome: {personagem?.nome} </Card.Title>
                            <Card.Title>Categoria: {personagem?.categoriaId} </Card.Title>
                            <Card.Text>Descrição: {personagem?.descrição}</Card.Text>
                        </Card.Body>
                        </Card>
                    </div>
                </div>
            </main>
        </section>
        </>
    )

}