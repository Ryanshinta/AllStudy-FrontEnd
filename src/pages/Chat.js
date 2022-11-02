import Layout from "../components/Dashboard/Layout";
import ChatRoom from "../components/ChatRoom/ChatRoom.js";

export default function Chat(){
    return(
        <>
            <Layout>
                <div className="ml-5 mr-5">
                <ChatRoom/>
                </div>
            </Layout>
        </>
    )
}
