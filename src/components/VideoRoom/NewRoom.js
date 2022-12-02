import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Checkbox, FormControlLabel, RadioGroup} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";



function NewRoom(){

    const [open, setOpen] = React.useState(false);
    const [disableSessionId, setDisableSessionId] = useState(false);
    const [inputRoomName, setInputRoomName] = useState();
    const [inputSessionId, setInputSessionId] = useState();
    const [inputDesc, setInputDesc] = useState();
    const [password, setPassword] = useState();


    function handleDisableSessionBtn(){
        setDisableSessionId(!disableSessionId)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleCreate = () => {
        if (disableSessionId){
            createSession("",true)
        }else {
            createSession("",false)
        }

    };

    function createSession(sessionId,random) {
        let data;
        if (random){
             data = {
                 "roomName": inputRoomName,
                 "roomDesc": inputDesc,
                 "password": password,
             }
        }else {
             data = JSON.stringify({
                 "sessionId":inputSessionId,
                 "roomName": inputRoomName,
                 "roomDesc": inputDesc,
            });
            console.log("createSession ",sessionId)
        }

        const config = {
            method: 'post',
            url: 'http://localhost:8765/api/session',
            headers: {
                'Content-Type': 'application/json',
                Authorization:localStorage.getItem("Token"),
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
                return response.data
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    function handleRoomNameChange(e) {
        setInputRoomName(e.target.value);
    }

    function handleSessionIdChange(e) {
        setInputSessionId(e.target.value);
    }

    function handleDescChange(e) {
        setInputDesc(e.target.value);
    }

    function disablePassword() {
        return false;
    }

    function handlePasswordChange() {
        return undefined;
    }

    return(
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Create New Room
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Room</DialogTitle>
                <DialogContent>
                    {/*<DialogContentText>*/}
                    {/*    To subscribe to this website, please enter your email address here. We*/}
                    {/*    will send updates occasionally.*/}
                    {/*</DialogContentText>*/}
                    <TextField
                        id="name"
                        label="Room name"
                        fullWidth
                        variant="standard"
                        onChange={handleRoomNameChange}
                        value={inputRoomName}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        fullWidth
                        variant="standard"
                        disabled={disablePassword()}
                        onChange={handlePasswordChange()}
                        value={inputSessionId}

                    />
                    <TextField
                        id="sessionId"
                        label="Session ID"
                        fullWidth
                        variant="standard"
                        disabled={disableSessionId}
                        onChange={handleSessionIdChange}
                        value={inputSessionId}

                    />
                    <FormControlLabel control={<Checkbox />} label="Random SessionID" onChange={handleDisableSessionBtn} />

                    <TextField
                        id="description"
                        label="Description"
                        fullWidth
                        variant={"filled"}
                        multiline={true}
                        rows={3}
                        onChange={handleDescChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreate}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default NewRoom;
