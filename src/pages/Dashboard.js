import Layout from "../components/Dashboard/Layout";
import TodoList from "../components/TodoList/TodoList";

export default function DashBoard(){
    return(
        <>
            <Layout>
                <TodoList/>
            </Layout>
        </>
    )
}
