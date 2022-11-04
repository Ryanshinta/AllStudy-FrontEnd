
import {HashRouter, Route, Routes,} from "react-router-dom";
import SignupPage from './pages/Signup';
import SignInPage from './pages/Signin';

import DashBoard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Partner from "./pages/Partner"
import Chat from "./pages/Chat"
import RoomNavigation from "./pages/RoomNavigation";
import Room from "./pages/Room";
import Community from "./pages/Community";
import HomePage from "./pages/HomePage";

import './App.css';
function App() {
    return (
        <div>
            <div>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<HomePage/>} />
                        <Route path="/signin" element={<SignInPage/>} />
                        <Route path="/signup" element={<SignupPage/>} />
                        <Route path="/app" element={<DashBoard/>} />
                        <Route path="/Profile" element={<Profile/>} />
                        <Route path="/Partner" element={<Partner/>} />
                        <Route path="/Chat" element={<Chat/>} />
                        <Route path="/RoomNavigation" element={<RoomNavigation/>} />
                        <Route path="/Room" element={<Room/>} />
                        <Route path="/Community" element={<Community/>} />
                    </Routes>
                </HashRouter>
            </div>
        </div>
    );
}

export default App;
