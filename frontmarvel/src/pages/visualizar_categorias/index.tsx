import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavGlobal from "../../components/nav_global";
import api from "../../services/api";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

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
    
    function newCategoria(){
        navigate("/nova_categoria")
    }

    return(
        <>
        <section>
            <header>
                <NavGlobal/>
            </header>
            <main>
                <div className="title">
                    <h1>Visualizar Categorias</h1>
                    <Button variant="danger" onClick={newCategoria}>Nova categoria</Button>{' '}
                </div>
                <div className="table">
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NOME</th>
                                <th>AÇÕES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categorias && categorias.map(categorias => (
                                    <tr key={categorias.id}>
                                        <td>{categorias.id}</td>
                                        <td>{categorias.nome}</td>
                                        <td>
                                            <Button variant="danger" onClick={() => editCategoria(categorias.id)}>Editar</Button>{' '}
                                            <Button variant="danger" onClick={() => viewCategoria(categorias.id)}>Visualizar</Button>{' '}
                                            <Button variant="danger" onClick={() => deleteCategoria(categorias.id)}>Deletar</Button>{' '}
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