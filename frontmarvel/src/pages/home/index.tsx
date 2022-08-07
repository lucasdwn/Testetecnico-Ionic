import { Link } from "react-router-dom"

export function Home() {
    return (
        <>
            <Link to={"/visualizar_categorias"}>Visualizar Categorias</Link> 
            <Link to={"/novo_personagem"}>Novo personagem</Link>   
        </>
    )
}