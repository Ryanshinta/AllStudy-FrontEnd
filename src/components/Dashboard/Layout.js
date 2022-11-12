import React from "react";


import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Background from "./Background";


const Layout = ({ children }) => {
    return (
        <div>
        <Background>
        <div className='dark:bg-gray-800'>
            <div className="flex flex-auto">

                <div className="fixed">
                    <SideBar />
                </div>

                <div className="grow md:flex-grow">
                    {/* <TopBar/> */}
                    <div className="m-0">
                        {children}
                    </div>
                </div>
            </div>
        </div>
        </Background>
        </div>
    )
}

export default Layout;
