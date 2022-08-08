import { useEffect, useState } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { useNavigate, useParams, } from "react-router-dom";
import NavGlobal from '../../components/nav_global';
import api from '../../services/api';

interface ICategoria {
    id: number;
    nome: string;
    personagens: IPersonagem[];
}

interface IPersonagem{
    id: number;
    nome: string;
    imagem: string;
    descrição: string;
}

export function VisualizarCategoria() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [categoria, setCategoria] = useState<ICategoria>()
    const [personagens, setPersonagens] = useState<IPersonagem>()

    useEffect(() => {
        ViewCategoria()
    }, [id])

    useEffect(() => {
        loadPersonagens()
    }, []);


    async function loadPersonagens() {
        const response = await api.get("/Personagem")
        setPersonagens(response.data)
    };

    function back() {
        navigate('/visualizar_categorias')
    }

    async function ViewCategoria() {
        const response = await api.get<ICategoria>(`Categoria/${id}`)
        setCategoria(response.data)
    }
    
    async function deletePersonagem(id: number) {
        await api.delete(`/Personagem/${id}`)
        .then(() => {
            alert("Personagem deletado com sucesso!")
            ViewCategoria()
        }).catch((error) => {
            alert(`Erro ao deletar personagem: ${error}`)
        })
    };

    function editPersonagem(id: number){
        navigate(`/editar_personagem/${id}`)
    }

    
    function viewPersonagem(id: number){
        navigate(`/visualizar_personagem/${id}`)
    }


    return(
        <>
        <section>
            <header>
                <NavGlobal/>
            </header>
            <main>
                <div className="title">
                    <h1>Visualizar Categoria</h1>
                    <Button variant="danger" onClick={back}>Voltar</Button>{' '}
                </div>
                <div className="card">
                    <Card
                    bg="dark"
                    text="light"
                    border='light'
                    style={{ width: '18rem' }}
                    >
                        <Card.Header>Categoria: {categoria?.nome}</Card.Header>
                        <Card.Body>
                            <Card.Title>Id: {categoria?.id} </Card.Title>
                            <Card.Title>Nome: {categoria?.nome} </Card.Title>
                        </Card.Body>
                    </Card>
                </div>
                <div className="table">
                    <h2>Personagens da categoria: {categoria?.nome}</h2>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>IMAGEM</th>
                                <th>NOME</th>
                                <th>AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categoria && categoria?.personagens.map(personagens => (
                                    <tr key={personagens.id}>
                                        <td>{personagens.id}</td>
                                        <td><img src={personagens.imagem}/></td>
                                        <td>{personagens.nome}</td>
                                        <td>
                                            <Button variant="danger"  onClick={() => editPersonagem(personagens.id)}>Editar</Button>{' '}
                                            <Button variant="danger" onClick={() => viewPersonagem(personagens.id)}>Visualizar</Button>{' '}
                                            <Button variant="danger" onClick={() => deletePersonagem(personagens.id)}>Deletar</Button>{' '}
                                        </td>
                                    </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </main>
        </section>
        </>
    )
}