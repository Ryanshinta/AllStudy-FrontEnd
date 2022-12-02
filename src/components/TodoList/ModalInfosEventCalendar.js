import {useEffect, useState} from "react";
import {Modal, TextField, Button, Alert} from "@mui/material";
import {ListColorsCard} from "./hooks/ListColorsCard";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {BackgroundColorRounded, BoxContainer, SelectColors} from "./stlyes";
import "./hooks/EventApi"
import {createEventCalendar, deleteEventCalendar, updateEventCalendar} from "./hooks/EventApi";
import axios from "axios";




export const ModalInfosEventCalendar = ({
    handleClose,
    open,
    eventInfo,
    isEditCard,}) => {
    const [title, setTitle] = useState('');
    const [cardColor, setCardColor] = useState({
        backgroundColor: '#039be5',
        textColor: '#ffffff',
    });


    useEffect(()=>{
        if (isEditCard){
            console.log(eventInfo)
            setTitle(eventInfo.event.title);
            setCardColor(
                {
                    backgroundColor: eventInfo.event.backgroundColor,
                    textColor: eventInfo.event.textColor,
                });
        }
        // else {
        //     setTitle('');
        //     setCardColor({
        //         backgroundColor: '#039be5',
        //         textColor: '#ffffff'
        //     });
        // }
    },[eventInfo,isEditCard]);

    function handleSelectCardColor(color) {
        setCardColor({
            backgroundColor: color.backgroundColor,
            textColor: color.textColor,
        });
        console.log("change color")
    };

    const handleDeleteEvent = async () => {
        console.log(eventInfo)
        const data = JSON.stringify({
            "id": eventInfo.event.id
        });

        const config = {
            method: 'post',
            url: 'http://localhost:8765/api/deleteEvent',
            headers: {
                'Authorization': localStorage.getItem("Token"),
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(async function (response) {
                console.log(JSON.stringify(response.data));
                toast.success("Delete success!", {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                await timeout(1000);
                window.location.reload()
            })
            .catch(function (error) {
                console.log(error);
            });

    };

    const handleUpdatedEvent = async () => {
        const data = JSON.stringify({
            "id": eventInfo.event.id,
            "title": title === '' ? 'Untitled' : title,
            "start": eventInfo.event.start,
            "end": eventInfo.event.end,
            "backgroundColor": cardColor.backgroundColor,
            "textColor":cardColor.textColor,
        });

        const config = {
            method: 'post',
            url: 'http://localhost:8765/api/updateEvent',
            headers: {
                'Authorization': localStorage.getItem("Token"),
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(async function (response) {
                console.log(JSON.stringify(response.data));
                toast.success("Update success!", {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                await timeout(1000);
                window.location.reload()
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    const handleAddedEvent = async ()=>{
        console.log("Add")
        // try {
        //     await createEventCalendar({
        //         eventCalendar: {
        //             title: title === '' ? 'Untitled' : title,
        //             start: eventInfo.startStr,
        //             end: eventInfo.endStr,
        //             backgroundColor: cardColor.backgroundColor,
        //             textColor: cardColor.textColor,
        //         },
        //     })
        // }catch (err){
        //     toast.error('There was an error updating the event');
        // }

        var data = JSON.stringify({
            "userId": localStorage.getItem("UserID"),
            "title": title === '' ? 'Untitled': title,
            "start": eventInfo.start,
            "end": eventInfo.end,
            "backgroundColor": cardColor.backgroundColor,
            "textColor":cardColor.textColor,
        });

        console.log(data);

        const config = {
            method: 'post',
            url: 'http://localhost:8765/api/insertEvent',
            headers: {
                'Authorization': localStorage.getItem("Token"),
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(async function (response) {
                console.log(JSON.stringify(response.data));

                toast.success("Add Event success!", {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                await timeout(1000);
            })
            .catch(function (error) {
                console.log(error);
            });
        window.location.reload();
    };

    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }
    
    return(
        <Modal open={open} onClose={handleClose}>
            <BoxContainer>
                <TextField label={'Title'} value={title} onChange={(e)=> setTitle(e.target.value)} fullWidth/>

                <SelectColors>
                    {ListColorsCard.map((color,index) =>(
                        <BackgroundColorRounded
                            key={index}
                            selected={false}
                            color={color.backgroundColor}
                            onClick={()=>handleSelectCardColor(color)}
                        >
                            <input
                            type={"radio"}
                            name={"cardColor"}
                            checked={color.backgroundColor === cardColor.backgroundColor}
                            readOnly/>

                        </BackgroundColorRounded>
                    ))}
                </SelectColors>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={isEditCard ? handleUpdatedEvent : handleAddedEvent}
                    sx={{ marginTop: '0.5rem' }}
                >
                    {isEditCard ? 'Update Event' : 'Add Event'}
                </Button>

                {isEditCard && (
                    <Button variant="contained" fullWidth sx={{ marginTop: '0.5rem' }} onClick={handleDeleteEvent}>
                        Delete Event
                    </Button>
                )}
            </BoxContainer>
        </Modal>
    )

}
