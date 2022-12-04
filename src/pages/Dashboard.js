import Layout from "../components/Dashboard/Layout";
import ReportPage from "../components/Report/ReportPage";

export default function DashBoard() {
    return (
        <>
            <Layout>
                <div>
                    <div>
                        <ReportPage/>
                    </div>
                </div>
            </Layout>
        </>
    )
}
