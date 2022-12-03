import * as React from 'react';
import Button from '@mui/material/Button';
import IosShareIcon from '@mui/icons-material/IosShare';
import HttpsIcon from '@mui/icons-material/Https';
import {Box, ClickAwayListener, IconButton, Tooltip} from "@mui/material";
import {IconBase} from "react-icons";
import {useEffect, useState} from "react";
import axios from "axios";


function RoomCard(props) {
    const [open, setOpen] = useState(false);
    const [profile, setProfile] = useState('');

    const getUserPhoto = async (data) => {
        const response = await axios({
            method: "POST",
            url: "http://localhost:8765/api/users/profilePhoto",
            headers: {
                Authorization: localStorage.getItem("Token"),
            },
            data: {
                id: props.userID
            },
        });

        if (response.data !== null && response.data.status === "fail") {
            console.error("Get user profile photo fail")
        }

        if (response.data !== null && response.data.status === "success") {
            setProfile(response.data.payload.profile);

        }
    }

    useEffect(() => {
        getUserPhoto();
    })
    function handleRoomJoinClick() {
        //localStorage.setItem("SessionID",props.sessionID);
        window.location.href="/videoRoom/videoRoom.html?SessionID="+props.sessionID;
    }

    function handleShareRoom() {
        const url =  window.location.host;
        const path = "/videoRoom/videoRoom.html?SessionID="+props.sessionID;
        navigator.clipboard.writeText("Come and join me together! "+url+path);
        setOpen((prev) => !prev);
    }

    function handleClickAway() {
        setOpen(false);
    }

    return(
        <div
            className="h-60 relative flex flex-col overflow-hidden rounded-2xl bg-white text-gray-600 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex justify-center flex-col space-y-2 p-4 font-bold">
                {props.title}



            </div>

            <div className={"flex"}>
                <a className="ml-4">
                    <img className="rounded-full max-w-none w-5 h-5"
                         src={profile}/>
                </a>
                <div className="ml-2">
                    {props.userName}
                </div>
            </div>


            <div className="m-2 flex grow flex-col capitalize bg-slate-300 rounded-xl">
                <p className="text-sm line-clamp-2 p-2">{props.Desc}</p>
            </div>

            <div className="gap-2 px-4 pb-4">
                {props.sessionID}
                <Tooltip title={"Click to Share"}>
                    <IconButton onClick={handleShareRoom}>
                        <IosShareIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"The Room is private"}>
                    <IconButton>
                        <HttpsIcon/>
                    </IconButton>
                </Tooltip>
            </div>

            <div className="absolute bottom-0 right-0 gap-2 px-4 pb-4">
                <div className="btn btn-md group bg-primary px-2.5 pr-4 text-white ">
                    <Button variant="contained" color="primary"
                            onClick={handleRoomJoinClick}>Join Room</Button>
                </div>
            </div>
        </div>
        )

}
export default RoomCard
