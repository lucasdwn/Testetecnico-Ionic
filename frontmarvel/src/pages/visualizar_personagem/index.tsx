import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
        const response = await api.get(`/Personagem/${id}`)
        setPersonagem(response.data)
    }

    return(
        <>
        <section>
            <header>

            </header>
            <main>
                <h1>{personagem?.nome}</h1>
            </main>
        </section>
        </>
    )

}