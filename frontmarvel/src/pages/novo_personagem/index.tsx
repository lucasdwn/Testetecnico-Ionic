import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import api from "../../services/api";

interface IForm {
    nome: string;
    imagem: string;
    descrição: string;
    categoriaId: number;
}

interface ICategoria{
    id: number;
    nome: string;
}

export function NovoPersonagem() {

    const navigate = useNavigate();
    
    const [formState, setFormState] = useState<IForm>({
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
        loadCategoria()
    }, []);

    async function loadCategoria(){
        const response = await api.get("/Categoria")
        setCategoria(response.data)
    };

    async function onSubmit(e:ChangeEvent<HTMLFormElement>){
        e.preventDefault()

        if (!(await validate())) return;

        const saveForm = true

        if(saveForm){
            await api.post("/Personagem", formState)
                .then(() => {
                    alert("Personagem cadastrado com sucesso!")
                    navigate("/visualizar_personagens")
                }).catch((error) => {
                    setStatus({
                        type: "error",
                        mensagem: `Personagem não foi cadastrado: ${error}`
                    })
                })
        }else{
            setStatus({
                type: "error",
                mensagem: `Personagem não foi cadastrado`
            })
        }
    }

    async function validate(){
        let schema = yup.object().shape({
            nome: yup.string().required('Por favor preencha o nome do personagem!'),
            imagem: yup.string().required('Por favor coloque o link de uma foto do personagem!'),
            descrição: yup.string().required('Por favor faça uma descrição do personagem!'),
            categoriaId: yup.number().required('Por favor selecione a categoria do personagem!')
        }).required();
        try{
            await schema.validate(formState)
            return true
        }catch(error){
            setStatus({
                type: "error",
                mensagem: `${ error }`
            })
            return false;
        }
    };

    return (
        <>
        <section>
            <header>

            </header>
            <main>
                <div>
                    <h1>Novo Personagem</h1>
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
                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </main>
        </section>
        </>
    )
}