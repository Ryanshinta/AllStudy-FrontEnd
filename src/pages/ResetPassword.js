import Header from "../components/LoginPage/Header";
import UpdatePassword from "../components/LoginPage/UpdatePassword";
import Layout from "../components/LoginPage/Layout";
import {ToastContainer} from "react-toastify";

export default function ResetPassword() {
    return (
        <>
            <Layout>
                <div className="max-w-md w-full space-y-8 shadow-2xl p-12 bg-white justify-center justify-items-center">
                    <Header
                        heading="Reset your password"
                        paragraph="Enter you new password here"
                        // linkName="ForgotPassword"
                        // linkUrl="/ForgotPassword"
                    />
                    <UpdatePassword/>
                </div>
            </Layout>
        </>
    )
}
