import React from "react";
import {Link, useLocation} from "react-router-dom";
import {AiFillPieChart, AiOutlineArrowLeft} from "react-icons/ai";
import {SiFuturelearn, SiOpenaccess} from "react-icons/si";
import {BiVideo, BiChat, BiBarChartAlt2, BiUserPlus, BiNotepad, BiCompass, BiLogInCircle, BiLogOutCircle} from "react-icons/bi";
import {BsPeople} from "react-icons/bs";
import {CgProfile} from "react-icons/cg";


export default function SideBar() {

    const location = useLocation();
    const [open, setOpen] = React.useState(false);

    const Menus = [
        { title: 'Dashboard', path: '/', src: <BiBarChartAlt2 /> },
        { title: 'Study Room', path: '/StudyRoom', src: <BiVideo /> },
        { title: 'Chat Room', path: '/Chat', src: <BiChat /> },
        { title: 'Study Partner', path: '/Partner', src: <BiUserPlus /> },
        { title: 'Community', path: '/', src: <BiCompass /> },
        { title: 'To-Do List', path: '/', src: <BiNotepad /> },
        { title: 'My Profile', path: '/Profile', src: <CgProfile />, gap: 'true' },
        { title: 'Sign In', path: '/', src: <BiLogInCircle />},
        { title: 'Sign Out', path: '/', src: <BiLogOutCircle />},
    ]


    return (
        <>
            <div
                className={`${
                    open ? 'w-60' : 'w-fit'
                } hidden sm:block relative h-auto duration-300 bg-gray-100 border-r border-gray-200 dark:border-gray-600 p-5 dark:bg-slate-800`}
            >
                <AiOutlineArrowLeft
                    className={`${
                        !open && 'rotate-180'
                    } absolute text-3xl bg-white fill-slate-800  rounded-full cursor-pointer top-9 -right-4 dark:fill-gray-400 dark:bg-gray-800`}
                    onClick={() => setOpen(!open)}
                />
                <Link to='/'>
                    <div className={`flex ${open && 'gap-x-4'}items-center`}>
                        <img src={require('../../assets/LogoW.png')} className="w-10 pl-2" alt="Logo"></img>
                        {open && <span className='text-xl font-medium whitespace-nowrap dark:text-white space-x-0.5'>&nbsp;&nbsp;&nbsp;&nbsp;AllStudy</span>}
                    </div>
                </Link>
                <ul className="pt-6">
                    {Menus.map((menu, index) => (
                        <Link to={menu.path} key={index}>
                            <li
                                className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700
                        ${menu.gap ? 'mt-16' : 'mt-2'} ${
                                    location.pathname === menu.path &&
                                    'bg-gray-200 dark:bg-gray-700'
                                }`}
                            >
                                <span className='text-2xl'>{menu.src}</span>
                                <span
                                    className={`${
                                        !open && 'hidden'
                                    } origin-left duration-300 hover:block`}
                                >
                                    {menu.title}
                                </span>
                            </li>
                        </Link>
                    ))}

                </ul>

            </div>


        </>
    )
}
