import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavGlobal from "../../components/nav_global";
import api from "../../services/api";


interface IForm{
    id: number;
    nome: string;
}

export function EditarCategoria() {
    const navigate = useNavigate()
    const { id } = useParams();

    const [formState, setFormState] = useState<IForm>({
        id: 1,
        nome: ""
    });

    const [status, setStatus] = useState ({
        type: '',
        mensagem: ''
    })

    useEffect(() => {
        findCategoria(id)
    }, [id])

    function updateForm(e: ChangeEvent<HTMLInputElement>){
        setFormState({
            ...formState,
            [e.target.name]:
            e.target.value
        })
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault()

        await api.put(`/Categoria/${id}`, formState)
            .then(() => {
                alert("Categoria foi atualizada com sucesso!")
                navigate(`/visualizar_categorias`)
            }).catch((error) =>{
                setStatus({
                    type: 'error',
                    mensagem: 'Erro: Categoria não foi atualizada!'
                }) 
            })
    };

    async function findCategoria(id: string | undefined): Promise<void>{
        const response = await api.get(`Categoria/${id}`)
        setFormState({
            id: response.data.id,
            nome: response.data.nome
        })
    }

    function back() {
        navigate('/visualizar_categorias')
    }

    return(
        <>
        <section>
            <header>
                <NavGlobal/>
            </header>
            <main>
                <div className="title">
                    <h1>Editar categoria: {formState.nome}</h1>
                    <Button variant="light" onClick={back}>Voltar</Button>{' '}
                </div>
                <div>
                    <form onSubmit={onSubmit}>
                        {status.type === 'error' ? <p style={{color: "red"}}>{status.mensagem}</p> : ""}
                        <div className="field">
                            <label htmlFor="nome">Nome da Categoria:</label>
                            <input 
                                type="text"
                                id="categoria"
                                name='nome'
                                value={formState.nome}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)} 
                            />
                        </div>
                        <Button variant="danger" type="submit">Salvar</Button>{' '}
                    </form>
                </div>
            </main>
        </section>
        </>
    )
}