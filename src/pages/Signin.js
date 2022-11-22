import Header from "../components/LoginPage/Header";
import Login from "../components/LoginPage/Login";
import Layout from "../components/LoginPage/Layout";
import {ToastContainer} from "react-toastify";

export default function SignIn() {
    return (
        <>
            <Layout>
                <div className="max-w-md w-full space-y-8 shadow-2xl p-12 bg-white justify-center justify-items-center">
                    <Header
                        heading="Login to your account"
                        paragraph="Don't have an account yet? "
                        linkName="Sign-up"
                        linkUrl="/Signup"
                    />
                    <Login/>
                </div>
            </Layout>
        </>
    )
}
