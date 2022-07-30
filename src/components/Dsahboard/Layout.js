import React from "react";


import SideBar from "./SideBar";


const Layout = ({ children }) => {
    return (
        <div className="container">
            <div className="flex flex-auto">
                <SideBar />
                <div className="grow">
                    <div className="m-5">{children}</div>
                </div>
            </div>
        </div>
    )
}

export default Layout;
