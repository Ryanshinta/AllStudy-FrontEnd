import Layout from "../components/Dashboard/Layout";
import UserProfile from "../components/UserProfile/UserProfile";
import {useEffect} from "react";

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
