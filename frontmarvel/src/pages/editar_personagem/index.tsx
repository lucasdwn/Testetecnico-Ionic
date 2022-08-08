import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavGlobal from "../../components/nav_global";
import api from "../../services/api";

interface IForm {
    id: number;
    nome: string;
    imagem: string;
    descrição: string;
    categoriaId: number;
}

interface ICategoria{
    id: number;
    nome: string;
}

export function EditarPersonagem() {

    const navigate = useNavigate();
    const { id } = useParams();
     
    const [formState, setFormState] = useState<IForm>({
        id: 0,
        nome: "",
        imagem: "",
        descrição: "",
        categoriaId: 0
    });

    const [categoria, setCategoria] = useState<ICategoria[] | undefined>();

    const [status, setStatus] = useState ({
        type: '',
        mensagem: ''
    });

    function updateForm (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>){

        setFormState({
            ...formState,
            [e.target.name]: 
            e.target.value
        })
    };

    useEffect(() => {
        findProduto(id)
    }, []);

    useEffect(() => {
        loadCategoria()
    }, []);

    async function loadCategoria(){
        const response = await api.get("/Categoria")
        setCategoria(response.data)
    };

    async function onSubmit(e:ChangeEvent<HTMLFormElement>){
        e.preventDefault()
        await api.put(`Personagem/${id}`, formState)
            .then(() => {
                alert("Personagem editado com sucesso!")
                navigate("/visualizar_personagens")
            }).catch((error) => {
                setStatus({
                    type: "error",
                    mensagem: `Personagem não foi editado: ${error}`
                })
            })
    }

    async function findProduto(id: string | undefined){
        const response = await api.get(`Personagem/${id}`)
        setFormState({
            id: response.data.id,
            nome: response.data.nome,
            imagem: response.data.imagem,
            descrição: response.data.descrição,
            categoriaId: response.data.categoriaId
        })
    };
    
    function back(){
        navigate('/visualizar_personagens')
    }

    return (
        <>
        <section>
            <header>
                <NavGlobal/>
            </header>
            <main>
                <div>
                    <h1>Editar Personagem : {formState.nome}</h1>
                    <Button variant="light" onClick={back}>voltar</Button>{' '}
                </div>
                <div>
                    <form onSubmit={onSubmit}>
                        {status.type === 'error' ? <p style={{color: "red"}}>{status.mensagem}</p> : ""}
                        <div className="field">
                            <label htmlFor="nome">Nome do personagem:</label>
                            <input 
                                type="text"
                                id="personagem"
                                name="nome"
                                value={formState.nome}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)} 
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="imagem">imagem do personagem:</label>
                            <input 
                                type="text"
                                id="personagem"
                                name="imagem"
                                value={formState.imagem}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)} 
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="descrição">Descrição do personagem:</label>
                            <input 
                                type="text"
                                id="personagem"
                                name="descrição"
                                value={formState.descrição}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)} 
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="categoria">Categoria do personagem</label>
                            <select 
                                name="categoriaId" 
                                id="categoriaId" 
                                value={formState.categoriaId}
                                onChange={(e:ChangeEvent<HTMLSelectElement>) => updateForm(e)}
                            >
                                {
                                    categoria && categoria.map(categoria => (
                                        <option value={categoria.id} key={categoria.id}>{categoria.nome}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <Button variant="danger" type="submit">Salvar</Button>{' '}
                    </form>
                </div>
            </main>
        </section>
        </>
    )
}