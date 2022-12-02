import Header from "../components/LoginPage/Header";
import RecoveryPassword from "../components/LoginPage/RecoveryPassword";
import Layout from "../components/LoginPage/Layout";
import {ToastContainer} from "react-toastify";

export default function ForgotPassword() {
    return (
        <>
            <Layout>
                <div className="max-w-md w-full space-y-8 shadow-2xl p-12 bg-white justify-center justify-items-center">
                    <Header
                        heading="Forgot you password ?"
                        paragraph="Enter you registered email to reset password"
                        // linkName="ForgotPassword"
                        // linkUrl="/ForgotPassword"
                    />
                    <RecoveryPassword/>
                </div>
            </Layout>
        </>
    )
}
