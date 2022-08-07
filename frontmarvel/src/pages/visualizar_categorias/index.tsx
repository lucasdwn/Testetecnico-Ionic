import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

interface ICategorias{
    id: number;
    nome: string;
}

export function VisualizarCategorias() {
    const navigate = useNavigate()

    const [categorias, setCategorias] = useState<ICategorias[]>([])

    useEffect(() => {
        loadCategorias()
    }, []);

    async function loadCategorias() {
        const response = await api.get("Categoria")
        setCategorias(response.data)
    }

    async function deleteCategoria(id: number) {
        await api.delete(`Categoria/${id}`)
            .then(() => {
                alert(`Categoria deletada!`)
                loadCategorias()
            }).catch(() => {
                alert(`Erro ao deletar categoria!!`)
            })
    }

    function viewCategoria(id: number){
        navigate(`/visualizar_categoria/${id}`)    
    }

    function editCategoria(id: number){
        navigate(`/editar_categoria/${id}`)    
    }

    return(
        <>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>nome</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categorias && categorias.map(categorias => (
                            <tr key={categorias.id}>
                                <td>{categorias.id}</td>
                                <td>{categorias.nome}</td>
                                <td>
                                    <button onClick={() => editCategoria(categorias.id)}>Editar</button>
                                    <button onClick={() => viewCategoria(categorias.id)}>Visualizar</button>
                                    <button onClick={() => deleteCategoria(categorias.id)}>Deletar</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )

}