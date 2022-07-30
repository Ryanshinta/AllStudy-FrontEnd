import React from "react";

const Layout = ({ children }) => {
    return (
        <div className="min-h-full h-screen flex items-center justify-center py-12
        px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-sky-200 to-indigo-200">
            {children}
        </div>
    )
}

export default Layout;
