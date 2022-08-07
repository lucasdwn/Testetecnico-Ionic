import { 
    BrowserRouter as Router,
    Route, 
    Routes,
} from "react-router-dom";
import { NovaCategoria } from "../pages/nova_categoria";
import { Categorias } from "../pages/visualizar_categorias";

export function AppRoutes() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Categorias/>}/>
                <Route path="/nova_categoria" element={<NovaCategoria/>}/>
            </Routes>
        </Router>
    )
}