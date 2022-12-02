import Layout from "../components/Dashboard/Layout";
import PrivateChatRoom from "../components/PrivateChatRoom/PrivateChatRoom"

export default function PrivateChat(){
    return(
        <>
            <Layout>
                <div className="ml-5 mr-5">
                <PrivateChatRoom/>
                </div>
            </Layout>
        </>
    )
}
