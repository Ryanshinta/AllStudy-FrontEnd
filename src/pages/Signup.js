import Header from "../components/Header";
import Signup from "../components/Signup";

export default function SignupPage(){
    return(
        <>
            <div className="max-w-md w-full space-y-8 shadow-2xl p-5 bg-white">


            <Header
              heading="Signup to create an account"
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/"
            />
            <Signup/>

            </div>
        </>
    )
}
