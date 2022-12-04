import TotalLogin from "./DataDisplay/TotalLogin";
import {Box, Grid} from "@mui/material";
import TotalLike from "./DataDisplay/TotalLike";
import TotalFollowing from "./DataDisplay/TotalFollowing";
import TotalFollowers from "./DataDisplay/TotalFollowers";
import PublicOrPrivate from "./DataDisplay/PublicOrPrivate";
import EventChart from "./DataDisplay/EventChart";
import {useEffect, useState} from "react";
import axios from "axios";
import TotalEvent from "./DataDisplay/TotalEvent";
import TotalPost from "./DataDisplay/TotalPost";


export default function ReportPage() {

    const [report, setReport] = useState("");
    const [eventReport, setEventReport] = useState("");

    
    function fetchReportData() {
        const data = JSON.stringify({
            "id": localStorage.getItem("UserID"),
        });

        const config = {
            method: 'post',
            url: 'http://localhost:8765/api/getReport',
            headers: {
                'Authorization': localStorage.getItem("Token"),
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data.payload);
                setReport(response.data.payload)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    
    function fetchEventReport() {
        var data = JSON.stringify({
            "id": localStorage.getItem("UserID"),
        });
        const config = {
            method: 'post',
            url: 'http://localhost:8765/api/getEventReport',
            headers: {
                'Authorization': localStorage.getItem("Token"),
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data.payload);
                setEventReport(response.data.payload)
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    
    
    
    
useEffect(()=>{
    if (report === ""){
        fetchReportData()
        fetchEventReport()
    }
})


    
    return (
        <>
            <div className={"m-12 "}>
                <Box>
                    <Grid container spacing={4}>
                        <Grid xs={2} className={"p-4"}>
                            <TotalLogin
                                totalLogin={report.totalLogin}
                            />
                        </Grid>

                        <Grid xs={2} className={"p-4"}>
                            <TotalLike
                                totalLike={report.totalLike}
                            />
                        </Grid>

                        <Grid xs={2} className={"p-4"}>
                            <TotalFollowing
                                totalFollowing={report.totalFollowing}
                            />
                        </Grid>
                        <Grid xs={2} className={"p-4"}>
                            <TotalFollowers
                                totalFollower={report.totalFollowers}
                            />
                        </Grid>
                        <Grid xs={2} className={"p-4"}>
                            <TotalEvent
                                totalEvent={report.totalEvent}
                            />
                        </Grid>
                        <Grid xs={2} className={"p-4"}>
                            <TotalPost
                                totalPosts={report.totalPost}
                            />
                        </Grid>


                        <Grid xs={5} className={"p-4"}>
                            <PublicOrPrivate
                                totalPublic={report.publicRoomJoin}
                                totalPrivate={report.privateRoomJoin}

                            />
                        </Grid>
                        <Grid xs={7} className={"p-4"}>
                            <EventChart
                                eventData={eventReport}
                            />
                        </Grid>
                    </Grid>
                </Box>


            </div>
        </>
    )
}
