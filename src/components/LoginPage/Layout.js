import React from "react";

const Layout = ({ children }) => {
    return (
        <div className="min-h-full h-screen flex-auto
        px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-sky-200 to-indigo-200">
            <div className="grow">
                <div className="m-5">{children}</div>
            </div>
        </div>
    )
}

export default Layout;
