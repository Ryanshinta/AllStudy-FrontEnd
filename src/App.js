
import {HashRouter, Route, Routes,} from "react-router-dom";
import Signup from './pages/Signup';
import SignIn from './pages/Signin';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import DashBoard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Partner from "./pages/Partner"
import PublicChat from "./pages/PublicChat";
import PrivateChat from "./pages/PrivateChat";
import RoomNavigation from "./pages/RoomNavigation";
import Room from "./pages/Room";
import Community from "./pages/Community";
import HomePage from "./pages/HomePage";

import './App.css';
import VideoRoom from "./pages/VideoRoom";
// import TodoList from "./pages/TodoList";

function App() {
    return (
        <div>
            <div>
                <HashRouter>
                    <Routes>
                        <Route path="/" element={<HomePage/>} />
                        <Route path="/Signin" element={<SignIn/>} />
                        <Route path="/Signup" element={<Signup/>} />
                        <Route path="/ForgotPassword" element={<ForgotPassword/>} />
                        <Route path="/ResetPassword" element={<ResetPassword/>} />
                        <Route path="/app" element={<DashBoard/>} />
                        <Route path="/Profile" element={<Profile/>} />
                        <Route path="/Partner" element={<Partner/>} />
                        <Route path="/PrivateChat" element={<PrivateChat/>} />
                        <Route path="/PublicChat" element={<PublicChat/>} />
                        <Route path="/RoomNavigation" element={<RoomNavigation/>} />
                        <Route path="/videoRoom" element={<VideoRoom/>} >
                            <Route path='/videoRoom/:sessionId' element={<VideoRoom/>} />
                        </Route>
                        <Route path="/Room" element={<Room/>} />
                        <Route path="/Community" element={<Community/>} />
                        {/*<Route path="/TodoList" element={<TodoList/>} />*/}
                    </Routes>
                </HashRouter>
            </div>
        </div>
    );
}

export default App;