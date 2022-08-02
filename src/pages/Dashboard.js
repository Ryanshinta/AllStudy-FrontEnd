import NewRoom from "../components/CreateRoom/NewRoom";
import Layout from "../components/Dashboard/Layout";
import TodoList from "../components/TodoList/TodoList";

export default function DashBoard(){
    return(
        <>
            <Layout>
                <TodoList/>
                    <div >
                        <div className="bottom-0 right-0 static">
                            <NewRoom />
                        </div>
                        
                    </div>
            </Layout>
        </>
    )
}
