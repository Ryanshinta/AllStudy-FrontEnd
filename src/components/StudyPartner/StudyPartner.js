import React, {useEffect, useState} from "react";
import {Form, Button} from 'semantic-ui-react';
import {TextField} from "@mui/material";
import {CheckBox} from "@mui/icons-material";
import axios from "axios";


const StudyPartner = () => {
    let arrRequests = [];
    let arrSuggestPartners = [];
    let arrFollowers = [];
    let arrFollowings = [];
    const [followers, setFollowers] = useState(arrFollowers);
    const [followings, setFollowings] = useState(arrFollowings);
    const [suggestPartners, setSuggestPartner] = useState(arrSuggestPartners);
    const [requests, setRequest] = useState(arrRequests);
    const [popup, setPopup] = useState(false);
    const [userInfo, setUserInfo] = useState('');

    const getPendingRequest = async (data) => {
        const response = await axios({
            method: "POST",
            url: "http://localhost:8765/api/partner/pendingRequest",
            headers: {
                Authorization: localStorage.getItem("Token"),
            },
            data: {
                receiveEmail: localStorage.getItem("UserEmail")
            }
        });

        if (response.data !== null && response.data.status === "fail") {
            console.log("failed");
        }

        if (response.data !== null && response.data.status === "success") {
            console.log("success");
            arrRequests = response.data.payload;
            setRequest(arrRequests);
            console.log(arrRequests);
        }
    }

    const getFollower = async (loginEmail) => {
        const response = await axios({
            method: "POST",
            url: "http://localhost:8765/api/users/getFollower",
            headers: {
                Authorization: localStorage.getItem("Token"),
            },
            data: {
                email: localStorage.getItem("UserEmail")
            }
        });

        if (response.data !== null && response.data.status === "fail") {
            console.log("failed");
        }

        if (response.data !== null && response.data.status === "success") {
            console.log("success");
            arrFollowers = response.data.payload;
            setFollowers(arrFollowers);
            console.log(response.data.payload);
        }
    }

    const getFollowing = async (loginEmail) => {
        const response = await axios({
            method: "POST",
            url: "http://localhost:8765/api/users/getFollowing",
            headers: {
                Authorization: localStorage.getItem("Token"),
            },
            data: {
                email: localStorage.getItem("UserEmail")
            }
        });

        if (response.data !== null && response.data.status === "fail") {
            console.log("failed");
        }

        if (response.data !== null && response.data.status === "success") {
            console.log("success");
            arrFollowings = response.data.payload;
            setFollowings(arrFollowings);
            console.log(response.data.payload);
        }
    }

    const getSuggestPartner = async (data) => {
        const response = await axios({
            method: "POST",
            url: "http://localhost:8765/api/partner/suggestPartner",
            headers: {
                Authorization: localStorage.getItem("Token"),
            },
            data: {
                email: localStorage.getItem("UserEmail")
            }
        });

        if (response.data !== null && response.data.status === "fail") {
            console.log("failed");
        }

        if (response.data !== null && response.data.status === "success") {
            console.log("success");
            arrSuggestPartners = response.data.payload;
            setSuggestPartner(arrSuggestPartners);
            console.log(arrSuggestPartners);
        }
    }

    const getUserInfo = async (requestor) => {
        const response = await axios({
            method: "POST",
            url: "http://localhost:8765/api/users/profile",
            headers: {
                Authorization: localStorage.getItem("Token"),
            },
            // headers: {
            //     Authorization: localStorage.getItem("Token"),
            // },
            data: {
                email: requestor
            },
        });

        if (response.data !== null && response.data.status === "fail") {
            console.log("failed");
        }

        if (response.data !== null && response.data.status === "success") {
            console.log("successful get request user");
            setUserInfo(response.data.payload);
        }
        // onSubmit(response.data);
    }

    const addNewRequest = async (receiver) => {
        const response = await axios({
            method: "POST",
            url: "http://localhost:8765/api/partner/request",
            headers: {
                Authorization: localStorage.getItem("Token"),
            },
            data: {
                requestEmail: localStorage.getItem("UserEmail"),
                receiveEmail: receiver,
                status: "pending"
            },
        });

        if (response.data !== null && response.data.status === "fail") {
            console.log("failed");
        }

        if (response.data !== null && response.data.status === "success") {
            console.log("successful add request user");
            getSuggestPartner();
        }
        // onSubmit(response.data);
    }

    const approvedRequest = async (requestId) => {
        const response = await axios({
            method: "POST",
            url: "http://localhost:8765/api/partner/approvedRequest",
            headers: {
                Authorization: localStorage.getItem("Token"),
            },
            data: {
                id: requestId
            },
        });

        if (response.data != null && response.data.status === "success") {
            console.log("approved request");
            getPendingRequest();
            getFollower();
        }
    }

    const deleteRequest = async (requestId) => {
        const response = await axios({
            method: "POST",
            url: "http://localhost:8765/api/partner/deleteRequest",
            headers: {
                Authorization: localStorage.getItem("Token"),
            },
            data: {
                id: requestId
            },
        });

        if (response.data != null && response.data.status === "success") {
            console.log("deleted request");
            getPendingRequest();
        }
    }

    useEffect(() => {
        getPendingRequest();
        getSuggestPartner();
        getFollower();
        getFollowing();
    }, []);

    function closePopup() {
        setPopup(false);
    }

    function handleViewClick(requestEmail) {
        setPopup(true);
        getUserInfo(requestEmail)
    }


    return (
        <div>
            <div className="container mx-auto">
                <div className="py-6 h-screen">
                    <div>
                        {popup === true ? (
                            <div id="staticModal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true"
                                 className="flex justify-center items-center visible overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 p-4 w-full md:inset-0 h-modal md:h-full">
                                <div className="relative w-full max-w-2xl h-full md:h-auto">
                                    <div
                                        className="border-solid border-2 border-gray-300 drop-shadow-2xl relative bg-stone-100 rounded-lg shadow dark:bg-gray-700">
                                        <div className="p-4">
                                            <img className="mb-6 w-24 h-24 rounded-full shadow-lg mx-auto max-w-lg"
                                                 src={userInfo.profile}
                                                 alt="Profile Pic"/>
                                            <Form onSubmit="">
                                                <div className="grid gap-6 mb-5 md:grid-cols-2">
                                                    <div>
                                                        <label for="first_name"
                                                               class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First
                                                            name</label>
                                                        <Form.Field>
                                                            <input
                                                                readOnly={true}
                                                                name="firstName"
                                                                id="firstName"
                                                                className="border border-neutral-300 text-neutral-800 text-base rounded focus:ring-blue-500 focus:border-blue-500 block w-full h-fit dark:bg-gray-700 p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                // placeholder={firstname}
                                                                on
                                                                value={userInfo.firstName}
                                                                type="text"
                                                            />
                                                        </Form.Field>
                                                    </div>
                                                    <div>
                                                        <label for="last_name"
                                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last
                                                            name</label>
                                                        <Form.Field>
                                                            <input
                                                                readOnly={true}
                                                                className="border border-neutral-300 text-neutral-800 text-base rounded focus:ring-blue-500 focus:border-blue-500 block w-full h-fit dark:bg-gray-700 p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                // placeholder={lastname}
                                                                value={userInfo.lastName}
                                                                type="text"
                                                            />
                                                        </Form.Field>
                                                    </div>
                                                    <div>
                                                        <label for="gender"
                                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Gender</label>
                                                        <Form.Field>
                                                            <input
                                                                readOnly={true}
                                                                className="border border-neutral-300 text-neutral-800 text-base rounded focus:ring-blue-500 focus:border-blue-500 block w-full h-fit dark:bg-gray-700 p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                // placeholder={lastname}
                                                                value={userInfo.gender}
                                                                type="text"
                                                            />
                                                        </Form.Field>
                                                    </div>
                                                    <div>
                                                        <label for="phone"
                                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone
                                                            number</label>
                                                        <Form.Field>
                                                            <input
                                                                readOnly={true}
                                                                className="border border-neutral-300 text-neutral-800 text-base rounded focus:ring-blue-500 focus:border-blue-500 block w-full h-fit dark:bg-gray-700 p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                value={userInfo.phone}
                                                                type="text"
                                                            />
                                                        </Form.Field></div>
                                                </div>
                                                <div className="mb-5">
                                                    <label for="email"
                                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email
                                                        address</label>
                                                    <Form.Field>
                                                        <input
                                                            readOnly={true}
                                                            className="border border-neutral-300 text-neutral-800 text-base rounded focus:ring-blue-500 focus:border-blue-500 block w-full h-full dark:bg-gray-700 p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            // placeholder={email}
                                                            value={userInfo.email}
                                                            type="email"
                                                        />
                                                    </Form.Field>
                                                </div>
                                                <div className="flex mt-4 space-x-3 lg:mt-2">
                                                    <Button
                                                        onClick={closePopup}
                                                        className="mx-auto max-w-lg content-end inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Back</Button>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <span></span>
                        )}
                    </div>
                    <div className="flex border border-grey rounded shadow-lg h-full dark:bg-stone-200">
                        <div className="w-3/4 flex flex-col">
                            <div className="py-2 px-2 bg-grey-lightest">
                                <input type="text" className="w-full px-2 py-2 text-sm bg-stone-100"
                                       placeholder="Search or find a new study partner"/>
                            </div>

                            <div className="w-full flex flex-row overflow-auto">
                                <div className="w-1/2 border flex flex-col overflow-auto">
                                    <div className="bg-grey-lighter flex-1 overflow-auto">
                                        <div
                                            className="py-2 px-3 bg-stone-100 flex flex-row justify-between items-center">
                                            <div>
                                                <p className="text-grey-darkest">REQUEST RECEIVED
                                                    - {requests.length}</p>
                                            </div>
                                        </div>
                                        {requests.map((request, index) => {
                                            return (
                                                <div key={index}
                                                     className="p-3 flex items-center bg-grey-light cursor-pointer">
                                                    <div>
                                                        <img className="h-12 w-12 rounded-full"
                                                             src={request.profile}/>
                                                    </div>
                                                    <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                                        <div className="flex items-bottom justify-between">
                                                            <p className="text-grey-darkest">
                                                                {request.username}
                                                            </p>
                                                            <div>
                                                                <Button
                                                                    className="content-end inline-flex items-center mx-1 py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                    onClick={() => handleViewClick(request.requestEmail)}>
                                                                    View</Button>
                                                                <Button
                                                                    className="content-end inline-flex items-center mx-1 py-2 px-4 focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                                    onClick={async () => {
                                                                        await approvedRequest(request.id);
                                                                    }}>Accept</Button>
                                                                <Button
                                                                    className="content-end inline-flex items-center mx-1 py-2 px-4 focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                                                    onClick={async () => {
                                                                        await deleteRequest(request.id);
                                                                    }}>Remove</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div>
                                <div className="w-1/2 border flex flex-col">
                                    <div
                                        className="py-2 px-3 bg-stone-100 flex flex-row justify-between items-center">
                                        <div>
                                            <p className="text-grey-darkest">SUGGESTION STUDY PARTNER
                                                - {suggestPartners.length}</p>
                                        </div>
                                    </div>

                                    <div className="bg-grey-lighter flex-1 overflow-auto">

                                        {suggestPartners.map((suggestPartner, index) => {
                                            return (
                                                <div
                                                    className="bg-white p-3 flex items-center hover:bg-stone-100 cursor-pointer">
                                                    <div>
                                                        <img className="h-12 w-12 rounded-full"
                                                             src={suggestPartner.profile}/>
                                                    </div>
                                                    <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                                        <div className="flex items-bottom justify-between">
                                                            <p className="text-grey-darkest">
                                                                {suggestPartner.username}
                                                            </p>
                                                            <div>
                                                                <Button
                                                                    className="content-end inline-flex items-center mx-1 py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                                    onClick={() => handleViewClick(suggestPartner.email)}>
                                                                    View</Button>
                                                                <Button
                                                                    className="content-end inline-flex items-center mx-1 py-2 px-4 focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                                    onClick={async () => {
                                                                        await addNewRequest(suggestPartner.email);
                                                                    }}>Follow</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-1/4 border flex flex-col">

                            <div
                                className="py-2 px-3 bg-stone-100 flex flex-row justify-between items-center">
                                <div>
                                    <p className="text-grey-darkest">STUDY PARTNER (FOLLOWER) - {followers.length}</p>
                                </div>
                            </div>
                            <div className="bg-grey-lighter flex-1 overflow-auto">
                                {followers.map((follower, index) => {
                                    return (
                                        <div key={index}
                                             className="px-3 flex items-center bg-grey-light cursor-pointer">
                                            <div>
                                                <img className="h-8 w-8 rounded-full"
                                                     src={follower.profile}/>
                                            </div>
                                            <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                                <div className="flex items-bottom justify-between">
                                                    <p className="text-grey-darkest">
                                                        {follower.username}
                                                    </p>
                                                    <p className="text-xs text-grey-darkest">
                                                        12:45 pm
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div
                                className="py-2 px-3 bg-stone-100 flex flex-row justify-between items-center">
                                <div>
                                    <p className="text-grey-darkest">STUDY PARTNER (FOLLOWING) - {followings.length}</p>
                                </div>
                            </div>

                            <div className="bg-grey-lighter flex-1 overflow-auto">
                                {followings.map((following, index) => {
                                    return (
                                        <div key={index}
                                             className="px-3 flex items-center bg-grey-light cursor-pointer">
                                            <div>
                                                <img className="h-8 w-8 rounded-full"
                                                     src={following.profile}/>
                                            </div>
                                            <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                                <div className="flex items-bottom justify-between">
                                                    <p className="text-grey-darkest">
                                                        {following.username}
                                                    </p>
                                                    <p className="text-xs text-grey-darkest">
                                                        12:45 pm
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
    )
}

export default StudyPartner;
