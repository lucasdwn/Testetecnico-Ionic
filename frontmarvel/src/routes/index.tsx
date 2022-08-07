import { 
    BrowserRouter as Router,
    Route, 
    Routes,
} from "react-router-dom";
import { EditarCategoria } from "../pages/editar_categoria";
import { Home } from "../pages/home";
import { NovaCategoria } from "../pages/nova_categoria";
import { VisualizarCategoria } from "../pages/visualizar_categoria";
import { VisualizarCategorias } from "../pages/visualizar_categorias";

export function AppRoutes() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/nova_categoria" element={<NovaCategoria/>}/>
                <Route path="/visualizar_categorias" element={<VisualizarCategorias/>}/>
                <Route path="/visualizar_categoria/:id" element={<VisualizarCategoria/>}/>
                <Route path="/editar_categoria/:id" element={<EditarCategoria/>}/>
            </Routes>
        </Router>
    )
}