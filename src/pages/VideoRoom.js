import {useNavigate, useParams} from "react-router-dom";
import "../components/VideoRoom/openvidu/openvidu-webcomponent-2.24.0"
import "../components/VideoRoom/openvidu/openvidu-webcomponent-2.24.0.css"
import "../components/VideoRoom/openvidu/openvidu-browser-2.24.0"
import {useEffect} from "react";
import axios from "axios";



function VideoRoom(e) {
    const params = useParams();
    const sessionId = params.sessionId;
    const navigate = useNavigate();

    useEffect(() =>{
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
                navigate("/community")
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
        joinSession()
    },[]);



    async function joinSession() {
        console.warn('SESSION ID', sessionId);

        const promiseResults = await Promise.all([getToken(sessionId), getToken(sessionId)]);

        console.warn(promiseResults);

        const tokens = {webcam: promiseResults[0], screen: promiseResults[1]};

        console.warn('tokens ', tokens);

        const webComponent = document.querySelector('openvidu-webcomponent');

        webComponent.style.display = 'block';
        webComponent.tokens = tokens;
    }




    /*
   *    Connection with Backend Server
   *
    */

    async function getToken(sessionId) {
        const id = await createSession(sessionId);
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

    function createSession(sessionId) {
        console.log("createSession ",sessionId)
        const data = JSON.stringify({
            "customSessionId": sessionId
        });

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




        return (
                <openvidu-webcomponent style={{height:"100%"}}></openvidu-webcomponent>
        )

}
export default VideoRoom
