import React from "react";


import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Background from "./Background";


const Layout = ({ children }) => {
    return (
        <div>
        <Background>
        <div className='dark:bg-gray-800'>
            <div className="flex flex-auto right-0">

                    <SideBar />
                <div className="grow md:flex-grow">
                    <div className="m-5">
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
