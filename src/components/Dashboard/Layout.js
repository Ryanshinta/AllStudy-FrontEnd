import React from "react";


import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Background from "./Background";


const Layout = ({ children }) => {
    return (
        <Background>
            <div>
                <div className="flex flex-auto">
                    <SideBar />
                    <div className="grow md:flex-grow">
                        {/* <TopBar/> */}
                        <div className="m-0">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </Background>
    )
}

export default Layout;