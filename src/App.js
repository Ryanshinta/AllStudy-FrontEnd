import './App.css';
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';

import DashBoard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function App() {
    return (
        <div>
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPage/>} />
                        <Route path="/signup" element={<SignupPage/>} />
                        <Route path="/app" element={<DashBoard/>} />
                        <Route path="/Profile" element={<Profile/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
