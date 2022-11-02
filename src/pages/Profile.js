import Layout from "../components/Dashboard/Layout";
import UserProfile from "../components/UserProfile/UserProfile";

export default function Profile(){
    return(
        <>
            <Layout>
                <div className="m-5">
                <UserProfile/>
                </div>
            </Layout>
        </>
    )
}
