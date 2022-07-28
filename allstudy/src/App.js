import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';

function App() {
    return (
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-sky-500 to-indigo-500">
            <div className="max-w-md w-full space-y-8 shadow-2xl p-5 bg-white">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPage/>} />
                        <Route path="/signup" element={<SignupPage/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
