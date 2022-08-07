import { Link } from "react-router-dom"

export function Home() {
    return (
        <>
            <Link to={"/visualizar_categorias"}>Visualizar Categorias</Link><br></br>
            <Link to={"/visualizar_personagens"}>Novo personagem</Link>   
        </>
    )
}