import React from "react";


import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Background from "./Background";
import TodoList from "../../pages/TodoList";


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
                        <div className={"fixed top-100 right-3"}>
                            <TodoList/>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </Background>
        </div>
    )
}

export default Layout;
