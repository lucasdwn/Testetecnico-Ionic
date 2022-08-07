import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

        await api.put(`/Categoria/${id}`, formState).
            then(() => {
                alert("Categoria foi atualizada com sucesso!")
                navigate(`/visualizar_categorias`)
            }).catch((error) =>{
                setStatus({
                    type: 'error',
                    mensagem: 'Erro: Categoria não foi atualizada!'
                })
                
            })
        console.log(formState)
    }

    async function findCategoria(id: string | undefined){
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
            <header></header>
            <main>
                <div>
                    <h1>Editar categoria: {formState.nome}</h1>
                    <button onClick={back}>Voltar</button>
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
                        <button type="submit">Salvar</button>
                    </form>
                </div>
            </main>
        </section>
        </>
    )
}