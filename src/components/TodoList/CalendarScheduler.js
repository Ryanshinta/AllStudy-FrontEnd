import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import {useDisclosure} from "./hooks/useDisclosure";
import {useState} from "react";
import {ModalInfosEventCalendar} from "./ModalInfosEventCalendar";
import {toast} from "react-toastify";
import {updateEventCalendar} from "./hooks/EventApi";
import {IEventCalendar} from "./hooks/EventCalendar";


type CalendarSchedulerProps = {
    eventsCalendar: IEventCalendar[];
}

export default function Calendar(eventsCalendar:CalendarSchedulerProps){
    // console.log("eventsCalendar")
    console.log(eventsCalendar.eventsCalendar.map(initEvent));

    function initEvent(eventsCalendar){
        return[{
            title: eventsCalendar.title,
            start: eventsCalendar.start,
            end: eventsCalendar.end,
            titleEx: null
        }]
    }

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
        try {
            const eventCalendarUpdated = {
                eventCalendar: {
                    id: changeInfo.event.id,
                    title: changeInfo.event.title,
                    start: changeInfo.event.startStr,
                    end: changeInfo.event.endStr,
                    backgroundColor: changeInfo.event.backgroundColor,
                    textColor: changeInfo.event.textColor,
                },
            };

            await updateEventCalendar(eventCalendarUpdated);
        } catch (err) {
            toast.error('There was an error updating the event');
        }
    };

    let cal = FullCalendar

    return(
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
    )
}
