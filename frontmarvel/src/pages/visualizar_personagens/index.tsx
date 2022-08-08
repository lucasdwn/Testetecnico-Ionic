import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavGlobal from "../../components/nav_global";
import api from "../../services/api";
import Table from 'react-bootstrap/Table';

interface IPersonagem{
    id: number;
    nome: string;
    imagem: string;
    descrição: string;
    categoriaId: number;
}


export default function VisualizarPersonagens() {

    const navigate = useNavigate();

    const [personagens, setPersonagens] = useState<IPersonagem []>([]);

    useEffect(() => {
        loadPersonagens()
    }, []);


    async function loadPersonagens() {
        const response = await api.get("/Personagem")
        setPersonagens(response.data)
    };

    async function deletePersonagem(id: number) {
        await api.delete(`/Personagem/${id}`)
        .then(() => {
            alert("Personagem deletado com sucesso!")
            loadPersonagens()
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

    function newPersonagem(){
        navigate("/novo_personagem")
    }

    return(
        <>
        <section>
            <header>
                <NavGlobal/>
            </header>
            <main>
                <div className="title">
                    <h1>Visualizar Personagens</h1>
                    <Button variant="danger" onClick={newPersonagem}>Novo personagem</Button>{' '}
                </div>
                <div className="table">
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Image</th>
                                <th>Nome</th>
                                <th>CategoriaId</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                personagens && personagens?.map(personagens => (
                                    <tr key={personagens.id}>
                                        <td>{personagens.id}</td>
                                        <td><img src={personagens.imagem}/></td>
                                        <td>{personagens.nome}</td>
                                        <td>{personagens.categoriaId}</td>
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