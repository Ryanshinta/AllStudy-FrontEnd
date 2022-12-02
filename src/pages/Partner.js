import Layout from "../components/Dashboard/Layout";
import StudyPartner from "../components/StudyPartner/StudyPartner";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Partner(){

    // const [allPendingRequest, setAllPendingRequest] = useState();
    //
    // async function getAllPendingRequest(){
    //     const response = await axios({
    //         method:"POST",
    //         url:"http://localhost:8765/api/partner/pendingRequest",
    //     });
    //     console.log(response.data.payload);
    //     if(response.data !== null && response.data.status === "success"){
    //         setAllPendingRequest(response.data.payload);
    //     }
    // }
    //
    // useEffect(() => {
    //     getAllPendingRequest()
    // }, []);

    return(
        <>
            <Layout>
                <div className="mx-5">
                <StudyPartner/>
                </div>
            </Layout>
        </>
    )
}
