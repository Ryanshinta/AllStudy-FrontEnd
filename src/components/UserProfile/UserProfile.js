import React from "react";
import Button from '@mui/material/Button';


const UserProfile = () =>  {
    return (
    <div className="max-w-screen-xl my-4 mx-12 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-end px-4 pt-4">

        </div>
        <div className="flex flex-col items-center pb-10">
            <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1200px-Gmail_icon_%282020%29.svg.png" alt="Profile Pic"/>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Testing User</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">testingemail123@gmail.com</span>
            <div className="overflow-x-auto relative">
                <br></br>
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="py-3 px-6">
                    Name
                </th>
                <th scope="col" className="py-3 px-6">
                    Email
                </th>
                <th scope="col" className="py-3 px-6">
                    Gender
                </th>
                <th scope="col" className="py-3 px-6">
                    Age
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td className="py-4 px-6">
                    Sliver
                </td>
                <td className="py-4 px-6">
                    Laptop
                </td>
                <td className="py-4 px-6">
                    $2999
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="py-4 px-6">
                    White
                </td>
                <td className="py-4 px-6">
                    Laptop PC
                </td>
                <td className="py-4 px-6">
                    $1999
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td className="py-4 px-6">
                    Black
                </td>
                <td className="py-4 px-6">
                    Accessories
                </td>
                <td className="py-4 px-6">
                    $99
                </td>
            </tr>
        </tbody>
    </table>
</div>
            <div className="flex mt-4 space-x-3 lg:mt-6">
                <a href="#" className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
                <a href="#" className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</a>
            </div>
        </div>
    </div>
    )
}

export default UserProfile;
