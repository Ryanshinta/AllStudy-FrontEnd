import * as React from 'react';
import Button from '@mui/material/Button';


function RoomCard(props) {


    function handleRoomJoinClick() {
        localStorage.setItem("SessionID",props.sessionID);
        window.location.href="/videoRoom/videoRoom.html";
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
                         src="https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg"/>
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
