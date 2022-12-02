import axios from "axios";

export async function deleteEventCalendar(param) {
    const data = JSON.stringify({
        "id": localStorage.getItem("UserID")
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
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

}


export function getEventById(id) {
    const data = JSON.stringify({
        "id": id
    });

    const config = {
        method: 'post',
        url: 'http://localhost:8765/api/getEventById',
        headers: {
            'Authorization': localStorage.getItem("Token"),
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });

}

export async function updateEventCalendar(eventCalendarUpdated) {

    const data = JSON.stringify({
        "id": localStorage.getItem("Token"),
        "title": eventCalendarUpdated.eventCalendar.title,
        "start": eventCalendarUpdated.eventCalendar.start,
        "end": eventCalendarUpdated.eventCalendar.end
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
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            return response.data
        })
        .catch(function (error) {
            console.log(error);
        });

}

export async function createEventCalendar(eventCalendar) {
    var data = JSON.stringify({
        "userId": localStorage.getItem("UserID"),
        "title": eventCalendar.eventCalendar.title,
        "start": eventCalendar.eventCalendar.start,
        "end": eventCalendar.eventCalendar.end,
        "backgroundColor": cardColor.backgroundColor,
        "textColor":cardColor.textColor,
    });

    var config = {
        method: 'post',
        url: 'http://localhost:8765/api/insertEvent',
        headers: {
            'Authorization': localStorage.getItem("Token"),
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            return response.data
        })
        .catch(function (error) {
            console.log(error);
        });
}

// export function getAllEventsCalendar() {
//     var data = JSON.stringify({
//         "id": localStorage.getItem("UserID")
//     });
//
//     var config = {
//         method: 'post',
//         url: 'http://localhost:8765/api/getAllEventByUserId',
//         headers: {
//             'Authorization': localStorage.getItem("Token"),
//             'Content-Type': 'application/json'
//         },
//         data : data
//     };
//
//     axios(config)
//         .then(function (response) {
//             console.log(response.data);
//             return response.data;
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
//
// }
