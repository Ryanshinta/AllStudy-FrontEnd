import * as React from 'react';
import Button from '@mui/material/Button';


function RoomCard(props) {


    function handleRoomJoinClick() {

    }

    return(
        <div
            className="h-60 relative flex flex-col overflow-hidden rounded-2xl bg-white text-gray-600 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex justify-center flex-col space-y-2 p-4 font-bold">
                {props.title}
            </div>

            <div className="p-4">
                {props.userName}
            </div>

            <div className="m-1 flex grow flex-col capitalize bg-slate-300 rounded-xl">
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
