import Layout from "../components/Dashboard/Layout";
import Button from "@mui/material/Button";
import React from "react";

export default function RoomNavigation(){

    const PublicRoom = [
        { title: 'Group focus(50min)', Desc: 'Lorem ipsum dolor sit amet, volumus apeirian eos eu, ex tan' +
                'tas tibique copiosae mei. No nam vidit omittam invenire,' +
                ' at corpora persecuti interpretaris sed.' },
        { title: 'Group focus(40min)', Desc: 'Lorem ipsum dolor sit amet, volumus apeirian eos eu, ex tan' +
                'tas tibique copiosae mei. No nam vidit omittam invenire,' +
                ' at corpora persecuti interpretaris sed.'  },
        { title: 'Group focus(30min)', Desc: 'Lorem ipsum dolor sit amet, volumus apeirian eos eu, ex tan' +
                'tas tibique copiosae mei. No nam vidit omittam invenire,' +
                ' at corpora persecuti interpretaris sed.'  },
        { title: 'Group focus(20min)', Desc: 'Lorem ipsum dolor sit amet, volumus apeirian eos eu, ex tan' +
                'tas tibique copiosae mei. No nam vidit omittam invenire,' +
                ' at corpora persecuti interpretaris sed.'  },
    ]

    const PrivateRoom = [
        {   title: 'Private Room1',
            Desc: 'Lorem ipsum dolor sit amet, volumus apeirian eos eu, ex tan' +
                'tas tibique copiosae mei. No nam vidit omittam invenire,' +
                ' at corpora persecuti interpretaris sed.',
            userName: 'User1',
            userAvatar: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60' },


        {   title: 'Private Room2',
            Desc: 'Lorem ipsum dolor sit amet, volumus apeirian eos eu, ex tan' +
                'tas tibique copiosae mei. No nam vidit omittam invenire,' +
                ' at corpora persecuti interpretaris sed.',
            userName: 'User2',
            userAvatar: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'},


        {   title: 'Private Room3',
            Desc: 'Lorem ipsum dolor sit amet, volumus apeirian eos eu, ex tan' +
                'tas tibique copiosae mei. No nam vidit omittam invenire,' +
                ' at corpora persecuti interpretaris sed.',
            userName: 'User3',
        userAvatar: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'},


        { title: 'Private Room4', Desc: 'Lorem ipsum dolor sit amet, volumus apeirian eos eu, ex tan' +
                'tas tibique copiosae mei. No nam vidit omittam invenire,' +
                ' at corpora persecuti interpretaris sed.', userName: 'User4'
            , userAvatar: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'},


    ]

    return(
        <>
            <Layout>
                <section>
                    {/*<div className="mt-8 flex items-center space-x-2 st-onboarding-dashboard-step-1">*/}
                    {/*    <h3 className="text-lg font-bold leading-[24px] text-gray-300">Solo Study Room</h3>*/}
                    {/*</div>*/}
                    {/*<div className="mt-5">*/}
                    {/*    <div className="relative overflow-hidden rounded-2xl bg-white p-4 transition-all duration-300 ease-in-out">*/}
                    {/*        <div className="relative space-y-3">*/}
                    {/*            <div className="flex items-center space-x-2 justify-between">*/}
                    {/*                <div className="text-lg font-bold">Solo Study Room</div>*/}

                    {/*            </div>*/}
                    {/*            <div className="text-sm">*/}
                    {/*                <div><strong className="font-bold">100% focus?</strong> Set the scene with*/}
                    {/*                    atmospheric backgrounds, use timer and goal setting and study in your solo study*/}
                    {/*                    room.*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="mt-8 flex items-center space-x-2 st-onboarding-dashboard-step-2"><h3
                        className="text-lg font-bold leading-[24px] text-gray-300">Study Together Rooms</h3></div>
                    <div className="mt-5 mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {PublicRoom.map((Room, index) => (

                        <div className="relative flex flex-col overflow-hidden rounded-2xl bg-white text-gray-600 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg">
                            <div className="flex justify-center flex-col space-y-2 p-4">
                                {Room.title}
                            </div>
                            <div className="mt-4 flex grow flex-col p-4">
                                <p className="text-sm">{Room.Desc}</p>
                            </div>
                            <div className=" gap-2 px-4 pb-4">
                                <div className="btn btn-md group bg-primary px-2.5 pr-4 text-white right-0">
                                    <Button variant="contained" color="primary" >Join Room</Button>
                                </div>
                            </div>

                    </div>
                ))}
                    </div>
                    <div className="mt-8 flex items-center space-x-2 st-onboarding-dashboard-step-2"><h3
                        className="text-lg font-bold leading-[24px] text-gray-300">Community Rooms</h3></div>


                    <div className="mt-5 mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {PrivateRoom.map((Room, index) => (

                            <div className="relative flex flex-col overflow-hidden rounded-2xl bg-white text-gray-600 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg">
                                <div className="flex justify-center flex-col space-y-2 p-4">
                                    {Room.title}
                                </div>
                                <div className="flex justify-center flex-col space-y-2 p-9">
                                    {Room.userName}
                                </div>

                                <div className="absolute top-20 flex w-full justify-between pr-8">
                                    <div className="flex">
                                        <div
                                            className="h-8 w-8 overflow-hidden rounded-full bg-black ring-2 ring-white">
                                            <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src={Room.userAvatar} alt="Profile Pic"/>

                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <div
                                            className="flex h-fit items-center gap-x-1 rounded-lg bg-white px-2 py-[2px]">

                                            <span className="text-xs"><b>7</b>/15</span></div>
                                    </div>
                                </div>


                                <div className="mt-4 flex grow flex-col p-4">
                                    <p className="text-sm">{Room.Desc}</p>
                                </div>
                                <div className=" gap-2 px-4 pb-4">
                                    <div className="btn btn-md group bg-primary px-2.5 pr-4 text-white right-0">
                                        <Button variant="contained" color="primary" >Join Room</Button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                </section>
            </Layout>
        </>
    )
}
