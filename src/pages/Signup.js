import Header from "../components/LoginPage/Header";
import Register from "../components/LoginPage/Register";
import Layout from "../components/LoginPage/Layout";

export default function Signup() {
    return (
        <>
            <Layout>


                <div className="w-auto space-y-8 shadow-2xl p-12 bg-white">
                    <Header
                        heading="Signup to create an account"
                        paragraph="Already have an account? "
                        linkName="Sign-in"
                        linkUrl="/Signin"
                    />
                    <Register/>

                </div>
            </Layout>
        </>
    )
}
