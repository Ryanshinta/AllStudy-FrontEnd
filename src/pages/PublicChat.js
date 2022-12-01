import Layout from "../components/Dashboard/Layout";
import PublicChatRoom from "../components/PublicChatRoom/PublicChatRoom.js";
import '../index.css';

export default function PrivateChat(){
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
