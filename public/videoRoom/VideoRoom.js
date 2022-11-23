import axios from "axios";

$(document).ready(async ()=>{
    const webComponent = document.querySelector('openvidu-webcomponent');
    console.log(webComponent);
    webComponent.addEventListener('onSessionCreated', (event) =>{
        const session = event.detail;
        session.on('connectionCreated', (e) => {
            console.log("connectionCreated", e);
        });

        session.on('streamDestroyed', (e) => {
            console.log("streamDestroyed", e);
        });

        session.on('streamCreated', (e) => {
            console.log("streamCreated", e);
        });

        session.on('sessionDisconnected', (event) => {
            console.warn("sessionDisconnected event");
            webComponent.style.display = 'none';
        });

        session.on('exception', (exception) => {
            console.error(exception);
        });
    });

    webComponent.addEventListener('onJoinButtonClicked', (event) => { });
    webComponent.addEventListener('onToolbarLeaveButtonClicked', (event) => { });
    webComponent.addEventListener('onToolbarCameraButtonClicked', (event) => { });
    webComponent.addEventListener('onToolbarMicrophoneButtonClicked', (event) => { });
    webComponent.addEventListener('onToolbarScreenshareButtonClicked', (event) => { });
    webComponent.addEventListener('onToolbarParticipantsPanelButtonClicked', (event) => { });
    webComponent.addEventListener('onToolbarChatPanelButtonClicked', (event) => { });
    webComponent.addEventListener('onToolbarFullscreenButtonClicked', (event) => { });
    webComponent.addEventListener('onParticipantCreated', (event) => { });

    // joinSession();
})

async function joinSession() {
    const sessionId = localStorage.getItem("SessionID");

    console.warn('SESSION ID', sessionId);

    const promiseResults = await Promise.all([getToken(sessionId), getToken(sessionId)]);

    console.warn('promiseResults', promiseResults);

    const tokens = {webcam: promiseResults[0].token, screen: promiseResults[1].token};

    const webComponent = document.querySelector('openvidu-webcomponent');

    const main = document.getElementById("main");
    main.style.display = 'none';

    webComponent.style.display = 'block';

    webComponent.tokens = tokens;
}


/*
 *    Connection with Backend Server
 *
  */

async function getToken(sessionId) {
    //const id = await createSession(sessionId);
    return createToken(sessionId);

}

async function createToken(sessionId) {
    console.log("Start createToken " + sessionId)
    const config = {
        method: 'post',
        url: 'http://localhost:8765/api/sessions/' + sessionId + '/connections',
        headers: {
            'Content-Type': 'application/json',
            Authorization:localStorage.getItem("Token"),
        }
    };
    const res = await axios(config)
    return res.data
}

// async function getToken(sessionId) {
//     const id = await createSession(sessionId);
//     return createToken(sessionId);
//
// }
//
// async function createToken(sessionId) {
//     console.log("Start createToken " + sessionId)
//     const config = {
//         method: 'post',
//         url: 'http://localhost:4443/openvidu/api/sessions/' + sessionId + '/connection',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + 'MY_SECRET'),
//         }
//     };
//     const res = await axios(config)
//     console.log(res)
//     return res.data
// }
//
// function createSession(sessionId) {
//
//     var data = {
//         customSessionId: sessionId
//     }
//
//     const config = {
//         method: 'post',
//         url: 'http://localhost:4443/openvidu/api/sessions',
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + 'MY_SECRET'),
//         },
//         data: data
//     };
//     axios(config)
//         .then(function (response) {
//             console.log(response.data);
//             return response.data
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
//
// }
