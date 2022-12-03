import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {useDisclosure} from "./hooks/useDisclosure";
import {useState} from "react";
import {ModalInfosEventCalendar} from "./ModalInfosEventCalendar";
import {toast, ToastContainer} from "react-toastify";
import {updateEventCalendar} from "./hooks/EventApi";
import {IEventCalendar} from "./hooks/EventCalendar";
import axios from "axios";


type CalendarSchedulerProps = {
    eventsCalendar: IEventCalendar[];
}

export default function Calendar(eventsCalendar:CalendarSchedulerProps){
    // console.log("eventsCalendar")
    console.log(eventsCalendar);

    // function initEvent(eventsCalendar){
    //     return[{
    //         title: eventsCalendar.title,
    //         start: eventsCalendar.start,
    //         end: eventsCalendar.end,
    //         titleEx: null
    //     }]
    // }

    const [eventInfos, setEventInfos] = useState(null);
    const [isEditCard, setIsEditCard] = useState(false);

    const weekends = {
        weekendsVisible: true,
        currentEvents: [],
    };

    const modalInfosEvent = useDisclosure(false)

    const handleAddEventSelectAndOpenModal = (selectInfo: any) => {
        setIsEditCard(false);
        setEventInfos(selectInfo);
        modalInfosEvent.handleOpen();
    };

    const handleEditEventSelectAndOpenModal = (clickInfo: any) => {
        setIsEditCard(true);
        setEventInfos(clickInfo);
        modalInfosEvent.handleOpen();
    };

    const handleUpdateEventSelect = async (changeInfo: any) => {
        const data = JSON.stringify({
            "id": changeInfo.event.id,
            "title": changeInfo.event.title,
            "start": changeInfo.event.start,
            "end": changeInfo.event.end,
            "backgroundColor": changeInfo.backgroundColor,
            "textColor":changeInfo.textColor,
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

    let cal = FullCalendar

    return(
        <>
        <ToastContainer />
        <div className={"dark:bg-gray-400 h-1/2 justify-self-center"}>
            <ModalInfosEventCalendar
                open={modalInfosEvent.isOpen}
                handleClose={modalInfosEvent.handleClose}
                eventInfo={eventInfos}
                isEditCard={isEditCard}
            />
        <FullCalendar
            plugins={[timeGridPlugin,dayGridPlugin,interactionPlugin]}
            initialView={"timeGridWeek"}
            headerToolbar={{
                left:"prev,next today",
                center:"title",
                right:"dayGridMonth,timeGridWeek,timeGridDay",
            }}
            locale={"en"}
            weekends={weekends.weekendsVisible}
            select={handleAddEventSelectAndOpenModal}
            eventClick={handleEditEventSelectAndOpenModal}
            eventChange={handleUpdateEventSelect}
            initialEvents={eventsCalendar.eventsCalendar}
            longPressDelay={1000}
            eventLongPressDelay={1000}
            selectLongPressDelay={1000}
            selectable={true}
            dayMaxEvents={true}
            allDaySlot={false}
            editable={true}
            firstDay={1}
            height={800}
            nowIndicator={true}
            //events={eventsCalendar}
        />
        </div>
        </>
    )
}
