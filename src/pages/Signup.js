import Header from "../components/LoginPage/Header";
import Signup from "../components/LoginPage/Signup";
import Layout from "../components/LoginPage/Layout";

export default function SignupPage() {
    return (
        <>
            <Layout>


                <div className="max-w-md w-full space-y-8 shadow-2xl p-5 bg-white">


                    <Header
                        heading="Signup to create an account"
                        paragraph="Already have an account? "
                        linkName="Login"
                        linkUrl="/"
                    />
                    <Signup/>

                </div>
            </Layout>
        </>
    )
}
