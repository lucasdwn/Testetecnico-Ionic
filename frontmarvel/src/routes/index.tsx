import { 
    BrowserRouter as Router,
    Route, 
    Routes,
} from "react-router-dom";
import { Categorias } from "../pages/categorias";

export function AppRoutes() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Categorias/>}/>
            </Routes>
        </Router>
    )
}