import React, {useRef} from "react";
import {Form, Button} from 'semantic-ui-react';
import axios from "axios";
import {useEffect, useState} from "react";
import Moment from 'moment';
import {useNavigate} from "react-router-dom";
import firebase from "../../firebase";
import {ToastContainer, toast} from "react-toastify";
import imageCompression from "browser-image-compression";
import {BiTrash} from "react-icons/bi";


const PublicChatRoom = () => {
    const navigate = useNavigate();
    const [roomName, setRoomName] = useState('');
    const [rooms, setRooms] = useState([]);
    const [searchRooms, setSearchRooms] = useState([]);
    const [roomUsers, setRoomUsers] = useState([]);
    const [chat, setChat] = useState('');
    const [chats, setChats] = useState([]);
    const [msgID, setMsgID] = useState([]);
    const input = useRef(null);
    const endMessage = useRef(null);
    const [exitRoom, setExitRoom] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [joinRoom, setJoinRoom] = useState(false);
    const [showConversation, setShowConversation] = useState(false);
    const [groupIconRequest, setGroupIconRequest] = useState(false);
    const [showDeleteMsg, setShowDeleteMsg] = useState(false);
    const [file64String, setFile64String] = useState('');
    const [file64StringWithType, setFile64StringWithType] = useState(null);
    const [profile, setProfile] = useState('');

    const uploadGroupIcon = (name) => {
        setGroupIconRequest(true);
        console.log("hello");
    }

    const closeConfirmDelete = () => {
      setShowDeleteMsg(false);
    }

    const closeGroupIconRequest = () => {
        setGroupIconRequest(false);
    }

    const deleteMessage = (id) => {
        setShowDeleteMsg(true)
        setMsgID(id);
    }

    const confirmDeleteMsg = (id) => {
        firebase.database().ref('chats/').orderByChild("id").equalTo(id).once('value', snapshot => {
            if (snapshot.exists()) {
                snapshot.forEach(function (child) {
                    child.ref.remove();
                });
            } else {
                console.log("no found");
            }
        });
        setShowDeleteMsg(false);
    }

    const newPublicRoom = (name) => {
        const str = name;
        if (str.toString().length === 0 || profile.length === 0) {
            showFailMessage("Roomname or icon cannot be empty!");
        } else {
            firebase.database().ref('rooms/').orderByChild("roomname").equalTo(name).once('value', snapshot => {
                if (snapshot.exists()) {
                    showFailMessage("Room Existed!");
                } else {
                    showSuccessMessage(name + " created successfully!");
                    const newRoom = firebase.database().ref('rooms/').push();
                    newRoom.set({
                        roomname: name,
                        type: "public",
                        icon: profile
                    });
                }
            });
            firebase.database().ref('roomusers/').orderByChild("id").equalTo(name + localStorage.getItem("UserName")).once('value', snapshot => {
                if (snapshot.exists()) {
                    console.log("roomuser existed");
                } else {
                    const newRoomUser = firebase.database().ref('roomusers/').push();
                    newRoomUser.set({
                        id: name + localStorage.getItem("UserName"),
                        roomname: name,
                        username: localStorage.getItem("UserName"),
                        status: "online",
                        icon: profile,
                        profile: localStorage.getItem("UserProfile")
                    });
                }
            });
        }
        setGroupIconRequest(false);
    }

    function onUploadFileChange(e) {
        setFile64String(null);
        if (e.target.files < 1 || !e.target.validity.valid) {
            return;
        }
        compressImageFile(e);
    }

    function fileToBase64(file, cb) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(null, reader.result);
        };
        reader.onerror = function (error) {
            cb(error, null);
        };
    }

    async function compressImageFile(event) {
        const imageFile = event.target.files[0];

        const options = {
            maxWidthOrHeight: 250,
            useWebWorker: true,
        };
        try {
            const compressedFile = await imageCompression(imageFile, options);
            // input file is compressed in compressedFile, now write further logic here

            fileToBase64(compressedFile, (err, result) => {
                if (result) {
                    setProfile(result);
                    //   console.log(file);
                    //   console.log(String(result.split(",")[1]));
                    setFile64StringWithType(result);
                    setFile64String(String(result.split(",")[1]));
                }
            });
        } catch (error) {
            setFile64String(null);
            // console.log(error);
        }
    }

    function showSuccessMessage(inputMessage) {
        toast.success(inputMessage, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    function showFailMessage(inputMessage) {
        toast.error(inputMessage, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const searchPublicRoom = (keyword) => {
        if (keyword.toString().length === 0) {
            console.log("no room found");
        } else {
            const findRoom = async () => {
                firebase.database().ref('rooms').orderByChild("roomname").startAt(keyword).endAt(keyword + "\uf8ff").on('value', resp => {
                    setSearchRooms([]);
                    setSearchRooms(snapshotToArray(resp));
                })
            };
            findRoom();
            setShowSearch(true);
        }
    };

    const showJoinRoomMsg = (roomname, roomicon) => {
        setRoomName(roomname);
        setProfile(roomicon);
        firebase.database().ref('roomusers/').orderByChild("id").equalTo(roomname + localStorage.getItem("UserName")).once('value', snapshot => {
            if (snapshot.exists()) {
                setShowConversation(true);
                setJoinRoom(false);
                enterChatRoom(roomname, roomicon);
            } else {
                setShowConversation(false);
                setJoinRoom(true);
            }
        });
    }

    const enterChatRoom = (roomname, roomicon) => {
        allRoomUsers(roomname);
        if (exitRoom.length === 0) {
            console.log("no room is exit");
        } else {
            const newMessage = firebase.database().ref('chats/').push();
            newMessage.set({
                roomname: exitRoom,
                username: localStorage.getItem("UserName"),
                date: Moment(new Date()).format('HH:mm'),
                message: localStorage.getItem("UserName") + " leave the room",
                type: "exit"
            });
        }
        firebase.database().ref('roomusers/').orderByChild("id").equalTo(roomname + localStorage.getItem("UserName")).once('value', snapshot => {
            if (snapshot.exists()) {
                console.log("roomuser existed");
            } else {
                const newRoomUser = firebase.database().ref('roomusers/').push();
                newRoomUser.set({
                    id: roomname + localStorage.getItem("UserName"),
                    roomname: roomname,
                    username: localStorage.getItem("UserName"),
                    status: "online",
                    icon: roomicon,
                    profile: localStorage.getItem("UserProfile")
                });
            }
        });

        setExitRoom(roomName);
        setRoomName(roomname);
        const newMessage = firebase.database().ref('chats/').push();

        newMessage.set({
            roomname: roomname,
            username: localStorage.getItem("UserName"),
            date: Moment(new Date()).format('HH:mm'),
            message: localStorage.getItem("UserName") + " enter the room",
            type: "join"
        });
        setShowConversation(true);
        readMessages(roomname);
        endMessage.current?.scrollIntoView({behavior: 'smooth'});
        closeJoinMsg();
    }

    const leaveRoom = (roomname, username) => {
        console.log(roomname);
        console.log(username);
        const id = roomname + username;
        firebase.database().ref('roomusers/').orderByChild("id").equalTo(id).once('value', snapshot => {
            if (snapshot.exists()) {
                snapshot.forEach(function (child) {
                    child.ref.remove();
                });
            } else {
                console.log("no found");
            }
        });
        // firebase.database().ref('roomusers/').orderByChild("id").equalTo(id).once('value', snapshot => {
        //     snapshot.key.remove();
        // });
    }

    const sendMessage = (message) => {
        console.log(message);
        setChat(message);
        const newMessage = firebase.database().ref('chats/').push();
        newMessage.set({
            roomname: roomName,
            username: localStorage.getItem("UserName"),
            date: Moment(new Date()).format('HH:mm'),
            message: message,
            type: "message",
            id: Date.now().toString() + roomName
        });
        input.current.value = "";
        readMessages(roomName);
    }

    const readMessages = (roomname) => {
        const readAllChats = async () => {
            firebase.database().ref('chats/').orderByChild('roomname').equalTo(roomname).on('value', resp => {
                setChats([]);
                setChats(snapshotToArray(resp));
            });
        };
        readAllChats(roomname);
        endMessage.current?.scrollIntoView({behavior: 'smooth'});
    };

    const allRoomUsers = (roomname) => {
        const readRoomUser = async () => {
            firebase.database().ref('roomusers/').orderByChild('roomname').equalTo(roomname).on('value', resp => {
                setRoomUsers([]);
                setRoomUsers(snapshotToArray(resp));
            });
        };
        readRoomUser();
    };

    useEffect(() => {
        if(localStorage.getItem("Token") === null){
            navigate("/");
        }else {
        const readPublicRoom = async () => {
            firebase.database().ref('roomusers/').orderByChild('username').equalTo(localStorage.getItem("UserName")).on('value', resp => {
                setRooms([]);
                setRooms(snapshotToArray(resp));
            });
        };
        readPublicRoom();}
    }, []);

    const snapshotToArray = (snapshot) => {
        const arrRooms = [];

        snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            item.key = childSnapshot.key;
            arrRooms.push(item);
        });

        return arrRooms;
    }

    const closeJoinMsg = () => {
        setJoinRoom(false)
    }

    const closeSearch = () => {
        setShowSearch(false)
    }


    return (
        <>
            <ToastContainer/>
            <div>
                <div className="container mx-auto">
                    <div className="py-6 h-screen">
                        <div>
                            {showDeleteMsg === true ? (
                                <div
                                    className="flex justify-center items-center visible overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 p-4 w-full md:inset-0 h-modal md:h-full">
                                    <div className="relative w-full max-w-md h-full md:h-auto">
                                        <div className="relative bg-cyan-800 rounded-lg shadow dark:bg-gray-700">
                                            <button type="button"
                                                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                                    onClick={closeConfirmDelete}>
                                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor"
                                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                          clip-rule="evenodd"></path>
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                            <div className="p-6 text-center">
                                                <h3 className="mb-5 text-lg font-normal text-gray-50 dark:text-gray-400">
                                                    Confirm to delete this message ? </h3>
                                                <button onClick={() => confirmDeleteMsg(msgID)} type="button"
                                                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                                    Confirm
                                                </button>
                                                <button onClick={closeConfirmDelete} type="button"
                                                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <span></span>
                            )}
                        </div>
                        <div>
                            {groupIconRequest === true ? (
                                <div
                                    className="flex justify-center items-center visible overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 p-4 w-full md:inset-0 h-modal md:h-full">
                                    <div className="relative w-full max-w-md h-full md:h-auto">
                                        <div className="relative bg-cyan-800 rounded-lg shadow dark:bg-gray-700">
                                            <button type="button"
                                                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                                    onClick={closeGroupIconRequest}>
                                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor"
                                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                          clip-rule="evenodd"></path>
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                            <div className="p-6 text-center">
                                                <h3 className="mb-5 text-lg font-normal text-gray-50 dark:text-gray-400">
                                                    Please upload a group icon for chat room</h3>
                                                <div className="mb-4">
                                                    <input className={
                                                        "file:mr-4 file:py-2 file:px-4\n" +
                                                        "      file:rounded-full file:border-0\n" +
                                                        "      file:text-sm file:font-semibold\n" +
                                                        "      file:bg-violet-50 file:text-violet-700\n" +
                                                        "      hover:file:bg-violet-100"
                                                    } type="file" id={"file"} accept="image/*"
                                                           onChange={onUploadFileChange}/>
                                                    <label htmlFor={"file"}></label>
                                                </div>
                                                <button onClick={() => newPublicRoom(roomName)} type="button"
                                                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                                    Create
                                                </button>
                                                <button onClick={closeJoinMsg} type="button"
                                                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <span></span>
                            )}
                        </div>
                        <div>
                            {joinRoom === true ? (
                                <div
                                    className="flex justify-center items-center visible overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 p-4 w-full md:inset-0 h-modal md:h-full">
                                    <div className="relative w-full max-w-md h-full md:h-auto">
                                        <div className="relative bg-cyan-800 rounded-lg shadow dark:bg-gray-700">
                                            <button type="button"
                                                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                                    onClick={closeJoinMsg}>
                                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor"
                                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                          clip-rule="evenodd"></path>
                                                </svg>
                                                <span className="sr-only">Close modal</span>
                                            </button>
                                            <div className="p-6 text-center">
                                                <h3 className="mb-5 text-lg font-normal text-gray-50 dark:text-gray-400">
                                                    Are you sure you want to join {roomName}?</h3>
                                                <button onClick={() => enterChatRoom(roomName, profile)} type="button"
                                                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                                    Join
                                                </button>
                                                <button onClick={closeJoinMsg} type="button"
                                                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <span></span>
                            )}
                        </div>
                        <div className="flex border border-grey rounded shadow-lg h-full dark:bg-stone-200">
                            <div className="w-full flex flex-row overflow-auto">
                                <div className="w-1/4 border h-full flex flex-col">
                                    <div className="w-full flex flex-col overflow-auto">
                                        <div className="bg-grey-lighter flex-1 overflow-auto">
                                            <div
                                                className="p-3 flex items-center bg-grey-light cursor-pointer">
                                                <label htmlFor="search"
                                                       className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                                <div className="w-full relative">
                                                    <input
                                                        placeholder="Enter a Room Name"
                                                        className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        onChange={event => setRoomName(event.target.value)}
                                                    />
                                                    <Button
                                                        onClick={() => {
                                                            searchPublicRoom(roomName)
                                                        }}
                                                        className="absolute text-white block right-20 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        Search
                                                    </Button>
                                                    <Button onClick={() => {
                                                        uploadGroupIcon(roomName)
                                                    }}
                                                            className="absolute text-white right-2.5 block bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        Add
                                                    </Button>
                                                </div>
                                            </div>
                                            <div>
                                                {showSearch === true ? (
                                                    <div>
                                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                                            <div className="flex relative items-bottom justify-between">
                                                                <p className="text-grey-darkest">
                                                                    Room Search - {searchRooms.length}
                                                                </p>
                                                                <Button
                                                                    onClick={() => {
                                                                        closeSearch()
                                                                    }}
                                                                    className="text-white mr-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                                    Clear
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        {searchRooms.map((room, index) => {
                                                            return (
                                                                <div key={index}
                                                                     onClick={() => {
                                                                         showJoinRoomMsg(room.roomname, room.icon)
                                                                     }}
                                                                     className="p-3 flex items-center bg-stone-200 hover:bg-stone-100 cursor-pointer">
                                                                    <div>
                                                                        <img className="h-12 w-12 rounded-full"
                                                                             src={room.icon}/>
                                                                    </div>
                                                                    <div
                                                                        className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                                                        <div
                                                                            className="flex items-bottom justify-between">
                                                                            <p className="text-grey-darkest">
                                                                                {room.roomname}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                ) : (
                                                    <span></span>
                                                )}
                                            </div>
                                            <div>
                                                <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                                    <div className="flex items-bottom justify-between">
                                                        <p className="text-grey-darkest">
                                                            Room Joined - {rooms.length}
                                                        </p>
                                                    </div>
                                                </div>
                                                {rooms.map((room, index) => {
                                                    return (
                                                        <div key={index}
                                                             onClick={() => {
                                                                 showJoinRoomMsg(room.roomname)
                                                             }}
                                                             className="p-3 flex items-center bg-grey-light hover:bg-stone-100 cursor-pointer">
                                                            <div>
                                                                <img className="h-12 w-12 rounded-full"
                                                                     src={room.icon}/>
                                                            </div>
                                                            <div
                                                                className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                                                <div className="flex items-bottom justify-between">
                                                                    <p className="text-grey-darkest">
                                                                        {room.roomname}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-1/2 border">
                                    {showConversation === false ? (
                                        <div
                                            className="flex justify-center items-center overflow-y-auto overflow-x top-0 right-0 left-0 z-50 p-4 w-full md:inset-0 h-modal md:h-full">
                                            <div
                                                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Yo
                                                    ! Welcome to AllStudy Platform !</h5>
                                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                                    This is a public chat room that allow users to communicate. You can
                                                    join any public room you wish to meet new study partner. Hope you
                                                    can
                                                    have a great conversation.
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <span></span>
                                    )}
                                    {showConversation === true ? (
                                        <div className="h-full flex flex-col">
                                            <div className="flex-1 h-full overflow-auto">
                                                <div className="flex justify-center pt-3 pb-2 px-3">
                                                    <div
                                                        className="rounded py-2 px-4 bg-blue-100 dark:bg-white">
                                                        <p className="text-sm uppercase">
                                                            {roomName}
                                                        </p>
                                                    </div>
                                                </div>
                                                {chats.map((chat, index) => {
                                                    return (
                                                        <div key={index} className="py-2 px-3">
                                                            {chat.type === "join" || chat.type === "exit" ?
                                                                <div className="flex justify-center mb-4">
                                                                    <div className="rounded py-2 px-4 bg-blue-100">
                                                                    <span className="text-xs">
                                                                        {chat.message}
                                                                    </span>
                                                                        <span
                                                                            className="text-right text-xs text-stone-400 mt-1">
                                                                        {chat.date}
                                                                    </span>
                                                                    </div>
                                                                </div> :
                                                                <div>
                                                                    {chat.username === localStorage.getItem("UserName") ?
                                                                        <div className="flex justify-end mb-2">
                                                                            <div
                                                                                className="rounded py-2 px-3 bg-blue-100">
                                                                                <div className="text-stone-400"
                                                                                     onClick={() => {
                                                                                         deleteMessage(chat.id)
                                                                                     }}
                                                                                ><BiTrash></BiTrash></div>
                                                                                <p className="text-sm mt-1">
                                                                                    {chat.message}
                                                                                </p>
                                                                                <p className="text-right text-xs text-stone-400 mt-1">
                                                                                    {chat.date}
                                                                                </p>
                                                                            </div>
                                                                        </div> :
                                                                        <div className="flex mb-2">
                                                                            <div
                                                                                className="rounded py-2 px-3 bg-stone-100">
                                                                                <p className="text-sm text-blue-500">
                                                                                    {chat.username}
                                                                                </p>
                                                                                <p className="text-sm mt-1">
                                                                                    {chat.message}
                                                                                </p>
                                                                                <p className="text-right text-xs text-stone-400 mt-1">
                                                                                    {chat.date}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            }
                                                        </div>
                                                    )
                                                })}
                                                <div ref={endMessage}></div>
                                            </div>

                                            <div className="bg-stone-100 px-4 py-4 flex items-center">
                                                <div className="flex-1 mx-4">
                                                    <input
                                                        ref={input}
                                                        className="w-full border rounded px-2 py-2"
                                                        type="text"
                                                        onChange={event => setChat(event.target.value)}
                                                    />
                                                </div>
                                                <div className="mr-2">
                                                    <Button type='submit'
                                                            id="send"
                                                            onClick={() => {
                                                                sendMessage(chat)
                                                            }}
                                                            className="w-fit focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Send</Button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <span></span>
                                    )}
                                </div>

                                <div className="w-1/4 border h-full flex flex-col">
                                    {showConversation === true ? (
                                        <div>
                                            <div className="justify-between ml-5 mt-2">
                                                <button type="button"
                                                        onClick={() => {
                                                            leaveRoom(roomName, localStorage.getItem("UserName"))
                                                        }}
                                                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Leave
                                                    Room
                                                </button>
                                                <button type="button"
                                                        onClick={() => {
                                                            navigator.clipboard.writeText("Click on this link:  " + window.location.href + "\nAnd join us with this room name: " + roomName)
                                                        }}
                                                        className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-white focus:outline-none bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Share
                                                    Room
                                                </button>

                                            </div>
                                            <div
                                                className="py-2 px-3 bg-stone-100 flex flex-row justify-between items-center">
                                                <div>
                                                    <p>Room Users - {roomUsers.length}</p>
                                                </div>
                                            </div>
                                            {roomUsers.map((roomUser, index) => {
                                                return (
                                                    <div key={index}
                                                        // onClick={() => {
                                                        //     showJoinRoomMsg(roomUser.roomname)
                                                        // }}
                                                         className="p-3 flex items-center bg-grey-light hover:bg-stone-100 cursor-pointer">
                                                        <div>
                                                            <img className="h-12 w-12 rounded-full"
                                                                 src={roomUser.profile}/>
                                                        </div>
                                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                                            <div className="flex items-bottom justify-between">
                                                                <p className="text-grey-darkest">
                                                                    {roomUser.username}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        <span></span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PublicChatRoom;
