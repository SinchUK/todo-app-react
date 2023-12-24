import { Routes, Route, BrowserRouter } from "react-router-dom";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import LayoutPage from "./components/LayoutPage/LayoutPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LayoutPage />} />
                    <Route path=":category" element={<LayoutPage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
