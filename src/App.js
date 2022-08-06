import './App.css';
import {BrowserRouter, Route, Routes,} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';

import DashBoard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import RoomNavigation from "./pages/RoomNavigation";
import Room from "./pages/Room";
import Community from "./pages/Community";

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
                        <Route path="/RoomNavigation" element={<RoomNavigation/>} />
                        <Route path="/Room" element={<Room/>} />
                        <Route path="/Community" element={<Community/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
