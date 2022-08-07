import { useState, useEffect } from "react";
import api from "../../services/api";

interface ICategorias{
    id: number;
    nome: string;
}

export function Categorias() {
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
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )

}