import {useEffect, useState} from "react";
import {Modal, TextField,Button} from "@mui/material";
import {ListColorsCard} from "./hooks/ListColorsCard";
import {toast} from "react-toastify";
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
            setTitle(eventInfo.events.title);
            setCardColor(
                {
                    backgroundColor: eventInfo.event.backgroundColor,
                    textColor: eventInfo.event.textColor,
                });
        }else {
            setTitle('');
            setCardColor({
                backgroundColor: '#039be5',
                textColor: '#ffffff'
            });
        }
    },[eventInfo,isEditCard]);

    function handleSelectCardColor(color) {
        setCardColor({
            backgroundColor: color.backgroundColor,
            textColor: color.textColor,
        });
    };

    const handleDeleteEvent = async () => {
        try {
            await deleteEventCalendar(eventInfo.event.id);
            eventInfo.event.remove();
        } catch (error) {
            toast.error('There was an error deleting the event');
        } finally {
            setTitle('');
            handleClose();
        }
    };

    const handleUpdatedEvent = async () => {
        try {

            const eventCalendarUpdated = {
                eventCalendar: {
                    _id: eventInfo.event.id,
                    title: title !== '' ? title : 'Untitled',
                    start: eventInfo.event.startStr,
                    end: eventInfo.event.endStr,
                    backgroundColor: cardColor.backgroundColor,
                    textColor: cardColor.textColor,
                },
            };

            const currentEvent = await getEventById(eventInfo.event.id);

            if (currentEvent) {
                currentEvent.setProp('title', title !== '' ? title : 'Untitled');
                currentEvent.setProp('backgroundColor', cardColor.backgroundColor);
                currentEvent.setProp('textColor', cardColor.textColor);
            }

            await updateEventCalendar(eventCalendarUpdated);
        } catch (error) {
            toast.error('There was an error updating the event');
        } finally {
            setTitle('');
            handleClose();
        }
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
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                //return response.data
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    
    
    
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
