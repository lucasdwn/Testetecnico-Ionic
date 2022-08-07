import { 
    BrowserRouter as Router,
    Route, 
    Routes,
} from "react-router-dom";

export function AppRoutes() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<h1>Hello World</h1>}/>
            </Routes>
        </Router>
    )
}