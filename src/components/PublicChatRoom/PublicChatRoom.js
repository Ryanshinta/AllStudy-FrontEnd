import React, {useRef} from "react";
import {Form, Button} from 'semantic-ui-react';
import axios from "axios";
import {useEffect, useState} from "react";
import Moment from 'moment';
import firebase from "../../firebase";


const PublicChatRoom = () => {
    const [roomName, setRoomName] = useState('');
    const [rooms, setRooms] = useState([]);
    const [searchRooms, setSearchRooms] = useState([]);
    const [roomUsers, setRoomUsers] = useState([]);
    const [chat, setChat] = useState('');
    const [chats, setChats] = useState([]);
    const input = useRef(null);
    const endMessage = useRef(null);
    const [exitRoom, setExitRoom] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [joinRoom, setJoinRoom] = useState(false);
    const [showConversation, setShowConversation] = useState(false);

    const newPublicRoom = (name) => {
        const str = name;
        if (str.toString().length === 0) {
            console.log("empty roomname");
        } else {
            firebase.database().ref('rooms/').orderByChild("roomname").equalTo(name).once('value', snapshot => {
                if (snapshot.exists()) {
                    console.log("room existed");
                } else {
                    const newRoom = firebase.database().ref('rooms/').push();
                    newRoom.set({
                        roomname: name,
                        type: "public"
                    });
                }
            });
        }
    }

    const searchPublicRoom = (keyword) => {
        const findRoom = async () => {
            firebase.database().ref('rooms').orderByChild("roomname").startAt(keyword).endAt(keyword + "\uf8ff").on('value', resp => {
                setSearchRooms([]);
                setSearchRooms(snapshotToArray(resp));
            })
        };
        findRoom();
        setShowSearch(true);
    };

    const showJoinRoomMsg = (roomname) => {
        setRoomName(roomname);
        firebase.database().ref('roomusers/').orderByChild("id").equalTo(roomname + localStorage.getItem("UserName")).once('value', snapshot => {
            if (snapshot.exists()) {
                setShowConversation(true);
                setJoinRoom(false);
                enterChatRoom(roomname);
            } else {
                setShowConversation(false);
                setJoinRoom(true);
            }
        });
    }

    const enterChatRoom = (roomname) => {
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
                    status: "online"
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

    const sendMessage = (message) => {
        console.log(message);
        setChat(message);
        const newMessage = firebase.database().ref('chats/').push();
        newMessage.set({
            roomname: roomName,
            username: localStorage.getItem("UserName"),
            date: Moment(new Date()).format('HH:mm'),
            message: message,
            type: "message"
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
        const readPublicRoom = async () => {
            firebase.database().ref('roomusers/').orderByChild('username').equalTo(localStorage.getItem("UserName")).on('value', resp => {
                setRooms([]);
                setRooms(snapshotToArray(resp));
            });
        };
        readPublicRoom();
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


    return (
        <div>
            <div className="container mx-auto">
                <div className="py-6 h-screen">
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
                                            <button onClick={() => enterChatRoom(roomName)} type="button"
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
                                                    newPublicRoom(roomName)
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
                                                        <div className="flex items-bottom justify-between">
                                                            <p className="text-grey-darkest">
                                                                Room Search - {searchRooms.length}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {searchRooms.map((room, index) => {
                                                        return (
                                                            <div key={index}
                                                                 onClick={() => {
                                                                     showJoinRoomMsg(room.roomname)
                                                                 }}
                                                                 className="p-3 flex items-center bg-stone-200 hover:bg-stone-100 cursor-pointer">
                                                                <div>
                                                                    <img className="h-12 w-12 rounded-full"
                                                                         src="https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg"/>
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
                                                                 src="https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg"/>
                                                        </div>
                                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
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
                                                join any public room you wish to meet new study partner. Hope you can
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
                                                                        <div className="rounded py-2 px-3 bg-blue-100">
                                                                            <p className="text-sm mt-1">
                                                                                {chat.message}
                                                                            </p>
                                                                            <p className="text-right text-xs text-stone-400 mt-1">
                                                                                {chat.date}
                                                                            </p>
                                                                        </div>
                                                                    </div> :
                                                                    <div className="flex mb-2">
                                                                        <div className="rounded py-2 px-3 bg-stone-100">
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
                                                        {/*<div className="flex justify-end mb-2">*/}
                                                        {/*    <div className="rounded py-2 px-3 bg-blue-100">*/}
                                                        {/*        <p className="text-sm mt-1">*/}
                                                        {/*            Hi guys.*/}
                                                        {/*        </p>*/}
                                                        {/*        <p className="text-right text-xs text-stone-400 mt-1">*/}
                                                        {/*            12:45 pm*/}
                                                        {/*        </p>*/}
                                                        {/*    </div>*/}
                                                        {/*</div>*/}
                                                    </div>
                                                )
                                            })}
                                            <div ref={endMessage}></div>
                                        </div>

                                        <div className="bg-stone-100 px-4 py-4 flex items-center">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                     width="24"
                                                     height="24">
                                                    <path opacity=".45" fill="#263238"
                                                          d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"></path>
                                                </svg>
                                            </div>
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
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                     width="24"
                                                     height="24">
                                                    <path fill="#263238" fill-opacity=".45"
                                                          d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <span></span>
                                )}
                            </div>

                            <div className="w-1/4 border h-full flex flex-col">
                                <div>
                                    {roomUsers.map((roomUser, index) => {
                                        return (
                                            <div key={index}
                                                 onClick={() => {
                                                     showJoinRoomMsg(roomUser.roomname)
                                                 }}
                                                 className="p-3 flex items-center bg-grey-light hover:bg-stone-100 cursor-pointer">
                                                <div>
                                                    <img className="h-12 w-12 rounded-full"
                                                         src="https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg"/>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PublicChatRoom;
