import React from "react";


import SideBar from "./SideBar";
import TopBar from "./TopBar";


const Layout = ({ children }) => {
    return (
        <div>
            <div className="flex flex-auto right-0">
                <SideBar />
                <div className="grow">
                    <TopBar/>
                    <div className="m-5">{children}</div>
                </div>
            </div>
        </div>
    )
}

export default Layout;
