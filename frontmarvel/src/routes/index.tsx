import { 
    BrowserRouter as Router,
    Route, 
    Routes,
} from "react-router-dom";
import { EditarCategoria } from "../pages/editar_categoria";
import { EditarPersonagem } from "../pages/editar_personagem";
import { Home } from "../pages/home";
import { NovaCategoria } from "../pages/nova_categoria";
import { NovoPersonagem } from "../pages/novo_personagem";
import { VisualizarCategoria } from "../pages/visualizar_categoria";
import { VisualizarCategorias } from "../pages/visualizar_categorias";
import VisualizarPersonagem from "../pages/visualizar_personagem";
import VisualizarPersonagens from "../pages/visualizar_personagens";

export function AppRoutes() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/nova_categoria" element={<NovaCategoria/>}/>
                <Route path="/visualizar_categorias" element={<VisualizarCategorias/>}/>
                <Route path="/visualizar_categoria/:id" element={<VisualizarCategoria/>}/>
                <Route path="/editar_categoria/:id" element={<EditarCategoria/>}/>
                <Route path="/novo_personagem" element={<NovoPersonagem/>}/>
                <Route path="/visualizar_personagem/:id" element={<VisualizarPersonagem/>}/>
                <Route path="/visualizar_personagens" element={<VisualizarPersonagens/>}/>
                <Route path="/editar_personagem/:id" element={<EditarPersonagem/>}/>
            </Routes>
        </Router>
    )
}