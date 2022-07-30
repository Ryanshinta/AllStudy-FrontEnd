import './App.css';
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';

import DashBoard from "./pages/Dashboard";

function App() {
    return (
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-sky-200 to-indigo-200">
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPage/>} />
                        <Route path="/signup" element={<SignupPage/>} />
                        <Route path="/app" element={<DashBoard/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
