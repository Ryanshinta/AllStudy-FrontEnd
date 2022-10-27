import React from "react";
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";
import { CheckBox } from "@mui/icons-material";


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
    <div>
<div className="p-2">        
<form>
    <div className="grid gap-6 mb-5 md:grid-cols-2">
        <div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First name</label>
            <TextField type="text" id="first_name"  size="small" placeholder="John" required=""></TextField>
        </div>
        <div>
            <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last name</label>
            <TextField type="text" id="last_name" size="small" placeholder="Doe" required=""></TextField>
        </div>
        <div>
            <label for="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Company</label>
            <TextField type="text" id="company" size="small" placeholder="Flowbite" required=""></TextField>
        </div>  
        <div>
            <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone number</label>
            <TextField type="tel" id="phone" size="small" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required=""></TextField>
        </div>
    </div>
    <div className="mb-5">
        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
        <TextField type="email" id="email" className="text-2xl w-full" size="small" placeholder="john.doe@company.com" required=""></TextField>
    </div> 
    <div className="mb-5">
        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
        <TextField type="password" id="password" className="text-2xl w-full" size="small" placeholder="•••••••••" required=""></TextField>
    </div> 
    <div className="mb-5">
        <label for="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm password</label>
        <TextField type="password" id="confirm_password" className="text-2xl w-full" size="small" placeholder="•••••••••" required=""></TextField>
    </div> 

    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>
</div>
    </div>

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
