import { ChangeEvent, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import NavGlobal from "../../components/nav_global";
import api from "../../services/api";


interface IForm{
    nome: string;
}

export function NovaCategoria() {

    const navigate = useNavigate()

    const [formState, setFormState] = useState<IForm>({
        nome: ""
    });

    const [status, setStatus] = useState ({
        type: '',
        mensagem: ''
    })

    function updateForm(e: ChangeEvent<HTMLInputElement>){
        setFormState({
            ...formState,
            [e.target.name]:
            e.target.value
        })
    }


    function back() {
        navigate('/visualizar_categorias')
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>){
        e.preventDefault()

        if(!(await validate())) return;

        const saveForm = true

        if(saveForm){
            await api.post("Categoria", formState).
            then(() => {
                alert("Categoria foi criada com sucesso!")
                navigate("/visualizar_categorias")
            }).catch((err) =>{
                setStatus({
                    type: 'error',
                    mensagem: 'Erro: Categoria não foi cadastrada!'
                })
            })
        }else{
            setStatus({
                type: 'error',
                mensagem: 'Erro: Categoria não foi cadastrada!'
            })
        }
    }

    async function validate(){
        let schema = yup.object().shape({
            nome: yup.string().required("Por Favor preencha o nome da categoria!")
        }).required();
        try{
            await schema.validate(formState)
            return true
        }catch(error){
            setStatus({
                type: 'error',
                mensagem: `${ error }`
            });
            return false;
        }
    }

    return(
        <>
        <section>
            <header>
                <NavGlobal/>
            </header>
            <main>
                <div className="title">
                    <h1>Cadastrar nova categoria</h1>
                    <Button variant="light" onClick={back}>Voltar</Button>{' '}
                </div>
                <div className="form">
                    <form onSubmit={onSubmit}>
                        {status.type === 'error' ? <p style={{color: "red"}}>{status.mensagem}</p> : ""}
                        <div className="field">
                            <label htmlFor="nome">Nome da Categoria</label>
                            <input 
                                type="text"
                                id="categoria"
                                name='nome'
                                value={formState.nome}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateForm(e)} 
                            />
                        </div>
                        <Button variant="danger" type="submit">Cadastrar</Button>{' '}
                    </form>
                </div>
            </main>
        </section>
        </>
    )
}