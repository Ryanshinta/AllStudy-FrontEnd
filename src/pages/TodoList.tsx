
import Layout from "../components/Dashboard/Layout";
import Calendar from "../components/TodoList/CalendarScheduler";
import {useEffect, useState} from "react";
import axios from "axios";
import {mapArrayEventCalendar} from "../components/TodoList/hooks/EventCalendar";


interface IHomeProps {
    listAllEventsCalendar: any;
}


export default function TodoList({ listAllEventsCalendar }: IHomeProps) {
   const [listEventsCalendar, setListEventsCalendar] = useState<any[]>(listAllEventsCalendar);



    function getAllEventsCalendar() {
        const data = JSON.stringify({
            "id": localStorage.getItem("UserID")
        });

        const config = {
            method: 'post',
            url: 'http://localhost:8765/api/getAllEventByUserId',
            headers: {
                'Authorization': localStorage.getItem("Token"),
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                const eventsCalendar = response.data.payload
                const listAllEventsCalendar = mapArrayEventCalendar(eventsCalendar)
                setListEventsCalendar(listAllEventsCalendar)
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    useEffect(()=>{
       getAllEventsCalendar()
    },[])

if (listEventsCalendar === undefined){
    return null
}else {
    return (
        <>
            <Layout>
                <Calendar  eventsCalendar={listEventsCalendar}/>
            </Layout>
        </>
    )
}
}
