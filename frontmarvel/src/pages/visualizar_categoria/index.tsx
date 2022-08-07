import { useEffect, useState } from 'react';
import { useNavigate, useParams, } from "react-router-dom";
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

    useEffect(() => {
        ViewCategoria()
    }, [id])

    function back() {
        navigate('/visualizar_categorias')
    }

    async function ViewCategoria() {
        const response = await api.get<ICategoria>(`Categoria/${id}`)
        setCategoria(response.data)
    }

    return(
        <>
            <h1>{categoria?.nome}</h1>
            <button onClick={back}>Voltar</button>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>nome</th>
                        <th>imagem</th>
                        <th>descricao</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categoria && categoria?.personagens.map(personagens => (
                            <tr key={personagens.id}>
                                <td>{personagens.id}</td>
                                <td>{personagens.nome}</td>
                                <td>{personagens.imagem}</td>
                                <td>{personagens.descrição}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}