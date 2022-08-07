import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

interface IPersonagem{
    id: number;
    nome: string;
    imagem: string;
    descrição: string;
    categoriaId: number;
}

export default function VisualizarPersonagens() {

    const navigate = useNavigate();

    const [personagens, setPersonagens] = useState<IPersonagem[]>([]);

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

    return(
        <>
        <section>
            <header>
            </header>
            <main>
                <h1>Visualizar Personagens</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Imagem</th>
                            <th>Descrição</th>
                            <th>Categoria</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            personagens && personagens.map(personagens => (
                                <tr key={personagens.id}>
                                    <td>{personagens.id}</td>
                                    <td>{personagens.nome}</td>
                                    <td>{personagens.imagem}</td>
                                    <td>{personagens.descrição}</td>
                                    <td>{personagens.categoriaId}</td>
                                    <td>
                                    <button onClick={() => editPersonagem(personagens.id)}>Editar</button>
                                    <button onClick={() => viewPersonagem(personagens.id)}>Visualizar</button>
                                    <button onClick={() => deletePersonagem(personagens.id)}>Deletar</button>
                            </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </main>
        </section>
        </>
    )
}