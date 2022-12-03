import Layout from "../components/Dashboard/Layout";
import Button from "@mui/material/Button";
import React, {useEffect, useState} from "react";
import NewRoom from "../components/VideoRoom/NewRoom";
import {Box, ClickAwayListener, Grid} from "@mui/material";
import RoomCard from "../components/VideoRoom/RoomCard";
import {useNavigate} from "react-router-dom";
import axios from "axios";


// function HandleJoinRoom(sessionID) {
//     window.location.href="/videoRoom/videoRoom.html?SessionID="+sessionID;
// }

export default function RoomNavigation() {
    const PublicRoom = [
        {
            title: 'Group focus A', Desc: 'Public Room A for All the user use',SessionId:"PublicA"
        },
        {
            title: 'Group focus B', Desc: 'Public Room B for All the user use',SessionId:"PublicB"
        },
        {
            title: 'Group focus C', Desc: 'Public Room C for All the user use',SessionId:"PublicC"
        },
    ]

    const [allRoom, setAllRoom] = useState();

    async function getAllRoom() {
        const config = {
            method: 'get',
            url: 'http://localhost:8765/api/getAllStudyRoom',
            headers: {
                Authorization: localStorage.getItem("Token"),
            }
        };

        axios(config)
            .then(function (response) {
                console.log(response.data.payload);
                setAllRoom(response.data.payload);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    useEffect(() => {
        getAllRoom();
    }, [])

    function handleRoomJoinClick() {
        //let navigate =  useNavigate()
        console.log("test")
    }



    return (
        <>
            <Layout>
                <div className={"m-5"}>
                    <div className="mt-8 flex items-center space-x-2 st-onboarding-dashboard-step-2"><h3
                        className="text-lg font-bold leading-[24px] text-gray-300">  AllStudy Rooms</h3>


                    </div>
                    <div className="mt-5 mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {PublicRoom.map((Room, index) => (

                            <div
                                className="relative flex flex-col overflow-hidden rounded-2xl bg-white text-gray-600 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg"
                            key={index}>
                                <div className="flex justify-center flex-col space-y-2 p-4">
                                    {Room.title}
                                </div>
                                <div className="mt-4 flex grow flex-col p-4">
                                    <p className="text-sm">{Room.Desc}</p>
                                </div>
                                <div className=" gap-2 px-4 pb-4">
                                    <div className="btn btn-md group bg-primary px-2.5 pr-4 text-white right-0">
                                        <Button variant="contained" color="primary" onClick={()=>{
                                            window.location.href="/videoRoom/videoRoom.html?SessionID="+Room.SessionId;
                                        }} >Join Room</Button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>


                    <div className="mt-8 flex items-center space-x-2 st-onboarding-dashboard-step-2">
                        <h3 className="text-lg font-bold leading-[24px] text-gray-300">
                            Community Rooms
                        </h3>
                        <NewRoom/>
                    </div>


                    <div className="mt-5 mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3" >

                        {
                            allRoom !== null ?(
                                allRoom?.map((room)=>{

                                    return(
                                        <div key={room.sessionID}>
                                        <RoomCard
                                            title={room.roomName}
                                            userName={room.userName}
                                            userID={room.userID}
                                            Desc={room.roomDesc}
                                            sessionID={room.sessionID}
                                        />
                                        </div>
                                        )

                                })
                            ):(
                                <div></div>
                            )
                        }
                    </div>


                </div>
            </Layout>
        </>
    )
}
