import Layout from "../components/Dashboard/Layout";
import PublicChatRoom from "../components/PublicChatRoom/PublicChatRoom";

export default function PublicChat(){
    return(
        <>
            <Layout>
                <div className="ml-5 mr-5">
                    <PublicChatRoom/>
                </div>
            </Layout>
        </>
    )
}
