import React from "react";
import Button from '@mui/material/Button';
import {TextField} from "@mui/material";
import { CheckBox } from "@mui/icons-material";


const StudyPartner = () =>  {
    return (
        <div>
                <div className="container mx-auto" >
                    <div className="py-6 h-screen">
                        <div className="flex border border-grey rounded shadow-lg h-full dark:bg-stone-200">
                            <div className="w-3/4 flex flex-col h-full">
                            <div className="py-2 px-2 bg-grey-lightest">
                                    <input type="text" className="w-full px-2 py-2 text-sm bg-stone-100" placeholder="Search or find a new study partner"/>
                                </div>
                            <div className="w-full flex flex-row">
                            <div className="w-1/2 border flex flex-col">        
                                <div className="bg-grey-lighter flex-1 overflow-auto">
                                <div className="py-2 px-3 bg-stone-100 flex flex-row justify-between items-center">
                                    <div>
                                        <p className="text-grey-darkest">STUDY PARTNER REQUEST - 5</p>
                                    </div>
                                </div>
                                    <div className="p-3 flex items-center bg-grey-light cursor-pointer">
                                        <div>
                                            <img className="h-12 w-12 rounded-full"
                                                 src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"/>
                                        </div>
                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                            <div className="flex items-bottom justify-between">
                                                <p className="text-grey-darkest">
                                                    New Movie! Expendables 4
                                                </p>
                                                <div>
                                                <a href="#" className="content-end inline-flex items-center mx-1 py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View Profile</a>
                                                <a href="#" className="content-end inline-flex items-center mx-1 py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Accept</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white p-3 flex items-center hover:bg-stone-100 cursor-pointer">
                                        <div>
                                            <img className="h-12 w-12 rounded-full"
                                                 src="https://www.biography.com/.image/t_share/MTE5NDg0MDU1MTIyMTE4MTU5/arnold-schwarzenegger-9476355-1-402.jpg"/>
                                        </div>
                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                            <div className="flex items-bottom justify-between">
                                                <p className="text-grey-darkest">
                                                    Arnold Schwarzenegger
                                                </p>
                                                <div>
                                                <a href="#" className="content-end inline-flex items-center mx-1 py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View Profile</a>
                                                <a href="#" className="content-end inline-flex items-center mx-1 py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Accept</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white p-3 flex items-center hover:bg-stone-100 cursor-pointer">
                                        <div>
                                            <img className="h-12 w-12 rounded-full"
                                                 src="https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg"/>
                                        </div>
                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                            <div className="flex items-bottom justify-between">
                                                <p className="text-grey-darkest">
                                                    Russell Crowe
                                                </p>
                                                <div>
                                                <a href="#" className="content-end inline-flex items-center mx-1 py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View Profile</a>
                                                <a href="#" className="content-end inline-flex items-center mx-1 py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Accept</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white p-3 flex items-center hover:bg-stone-100 cursor-pointer">
                                        <div>
                                            <img className="h-12 w-12 rounded-full"
                                                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpYTzuO0zLW7yadaq4jpOz2SbsX90okb24Z9GtEvK6Z9x2zS5"/>
                                        </div>
                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                            <div className="flex items-bottom justify-between">
                                                <p className="text-grey-darkest">
                                                    Tom Cruise
                                                </p>
                                                <div>
                                                <a href="#" className="content-end inline-flex items-center mx-1 py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View Profile</a>
                                                <a href="#" className="content-end inline-flex items-center mx-1 py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Accept</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white p-3 flex items-center hover:bg-stone-100 cursor-pointer">
                                        <div>
                                            <img className="h-12 w-12 rounded-full"
                                                 src="https://www.biography.com/.image/t_share/MTE5NTU2MzE2MjE4MTY0NzQ3/harrison-ford-9298701-1-sized.jpg"/>
                                        </div>
                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                            <div className="flex items-bottom justify-between">
                                                <p className="text-grey-darkest">
                                                    Harrison Ford
                                                </p>
                                                <div>
                                                <a href="#" className="content-end inline-flex items-center mx-1 py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View Profile</a>
                                                <a href="#" className="content-end inline-flex items-center mx-1 py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Accept</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <div className="w-1/2 border flex flex-col">
                                <div className="bg-grey-lighter flex-1 overflow-auto">
                                <div className="py-2 px-3 bg-stone-100 flex flex-row justify-between items-center">
                                    <div>
                                        <p className="text-grey-darkest">STUDY PARTNER APPLICATION - 4</p>
                                    </div>
                                </div>
                                    <div className="bg-white p-3 flex items-center hover:bg-stone-100 cursor-pointer">
                                        <div>
                                            <img className="h-12 w-12 rounded-full"
                                                 src="https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg"/>
                                        </div>
                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                            <div className="flex items-bottom justify-between">
                                                <p className="text-grey-darkest">
                                                    Russell Crowe
                                                </p>
                                                <p className="text-xs text-grey-darkest">
                                                    12:45 pm
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white p-3 flex items-center hover:bg-stone-100 cursor-pointer">
                                        <div>
                                            <img className="h-12 w-12 rounded-full"
                                                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpYTzuO0zLW7yadaq4jpOz2SbsX90okb24Z9GtEvK6Z9x2zS5"/>
                                        </div>
                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                            <div className="flex items-bottom justify-between">
                                                <p className="text-grey-darkest">
                                                    Tom Cruise
                                                </p>
                                                <p className="text-xs text-grey-darkest">
                                                    12:45 pm
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white p-3 flex items-center hover:bg-stone-100 cursor-pointer">
                                        <div>
                                            <img className="h-12 w-12 rounded-full"
                                                 src="https://www.biography.com/.image/t_share/MTE5NTU2MzE2MjE4MTY0NzQ3/harrison-ford-9298701-1-sized.jpg"/>
                                        </div>
                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                            <div className="flex items-bottom justify-between">
                                                <p className="text-grey-darkest">
                                                    Harrison Ford
                                                </p>
                                                <p className="text-xs text-grey-darkest">
                                                    12:45 pm
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                </div>
                            </div>
        
        
                            <div className="w-1/4 border flex flex-col">

                            <div className="py-2 px-3 bg-stone-100 flex flex-row justify-between items-center">
                                    <div>
                                        <p className="text-grey-darkest">STUDY PARTNER ONLINE - 10</p>
                                    </div>
                                </div>

                                <div className="bg-grey-lighter flex-1 overflow-auto">
                                <div className="px-3 flex items-center bg-grey-light cursor-pointer">
                                        <div>
                                            <img className="h-8 w-8 rounded-full"
                                                 src="https://64.media.tumblr.com/69a671c9b7d6ba05566d303c7f8b64aa/3e36901baab23038-d0/s540x810/368919b24f0328825a8d91555f7a1cb31e9af740.jpg"/>
                                        </div>
                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                            <div className="flex items-bottom justify-between">
                                                <p className="text-grey-darkest">
                                                    New Movie! Expendables 4
                                                </p>
                                                <p className="text-xs text-grey-darkest">
                                                    12:45 pm
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-3 flex items-center bg-grey-light cursor-pointer">
                                        <div>
                                            <img className="h-8 w-8 rounded-full"
                                                 src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"/>
                                        </div>
                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                            <div className="flex items-bottom justify-between">
                                                <p className="text-grey-darkest">
                                                    New Movie! Expendables 4
                                                </p>
                                                <p className="text-xs text-grey-darkest">
                                                    12:45 pm
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white px-3 flex items-center hover:bg-stone-100 cursor-pointer">
                                        <div>
                                            <img className="h-8 w-8 rounded-full"
                                                 src="https://www.biography.com/.image/t_share/MTE5NDg0MDU1MTIyMTE4MTU5/arnold-schwarzenegger-9476355-1-402.jpg"/>
                                        </div>
                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                            <div className="flex items-bottom justify-between">
                                                <p className="text-grey-darkest">
                                                    Arnold Schwarzenegger
                                                </p>
                                                <p className="text-xs text-grey-darkest">
                                                    12:45 pm
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white px-3 flex items-center hover:bg-stone-100 cursor-pointer">
                                        <div>
                                            <img className="h-8 w-8 rounded-full"
                                                 src="https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg"/>
                                        </div>
                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                            <div className="flex items-bottom justify-between">
                                                <p className="text-grey-darkest">
                                                    Russell Crowe
                                                </p>
                                                <p className="text-xs text-grey-darkest">
                                                    12:45 pm
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white px-3 flex items-center hover:bg-stone-100 cursor-pointer">
                                        <div>
                                            <img className="h-8 w-8 rounded-full"
                                                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpYTzuO0zLW7yadaq4jpOz2SbsX90okb24Z9GtEvK6Z9x2zS5"/>
                                        </div>
                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                            <div className="flex items-bottom justify-between">
                                                <p className="text-grey-darkest">
                                                    Tom Cruise
                                                </p>
                                                <p className="text-xs text-grey-darkest">
                                                    12:45 pm
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white px-3 flex items-center hover:bg-stone-100 cursor-pointer">
                                        <div>
                                            <img className="h-8 w-8 rounded-full"
                                                 src="https://www.biography.com/.image/t_share/MTE5NTU2MzE2MjE4MTY0NzQ3/harrison-ford-9298701-1-sized.jpg"/>
                                        </div>
                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                            <div className="flex items-bottom justify-between">
                                                <p className="text-grey-darkest">
                                                    Harrison Ford
                                                </p>
                                                <p className="text-xs text-grey-darkest">
                                                    12:45 pm
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
        
                            <div className="py-2 px-3 bg-stone-100 flex flex-row justify-between items-center">
                                    <div>
                                        <p className="text-grey-darkest">STUDY PARTNER ONLINE - 10</p>
                                    </div>
                                </div>
        
                                <div className="bg-grey-lighter flex-1 overflow-auto">
                                    <div className="px-3 flex items-center bg-grey-light cursor-pointer">
                                        <div>
                                            <img className="h-8 w-8 rounded-full"
                                                 src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg"/>
                                        </div>
                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                            <div className="flex items-bottom justify-between">
                                                <p className="text-grey-darkest">
                                                    New Movie! Expendables 4
                                                </p>
                                                <p className="text-xs text-grey-darkest">
                                                    12:45 pm
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white px-3 flex items-center hover:bg-stone-100 cursor-pointer">
                                        <div>
                                            <img className="h-8 w-8 rounded-full"
                                                 src="https://www.biography.com/.image/t_share/MTE5NDg0MDU1MTIyMTE4MTU5/arnold-schwarzenegger-9476355-1-402.jpg"/>
                                        </div>
                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                            <div className="flex items-bottom justify-between">
                                                <p className="text-grey-darkest">
                                                    Arnold Schwarzenegger
                                                </p>
                                                <p className="text-xs text-grey-darkest">
                                                    12:45 pm
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white px-3 flex items-center hover:bg-stone-100 cursor-pointer">
                                        <div>
                                            <img className="h-8 w-8 rounded-full"
                                                 src="https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg"/>
                                        </div>
                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                            <div className="flex items-bottom justify-between">
                                                <p className="text-grey-darkest">
                                                    Russell Crowe
                                                </p>
                                                <p className="text-xs text-grey-darkest">
                                                    12:45 pm
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white px-3 flex items-center hover:bg-stone-100 cursor-pointer">
                                        <div>
                                            <img className="h-8 w-8 rounded-full"
                                                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpYTzuO0zLW7yadaq4jpOz2SbsX90okb24Z9GtEvK6Z9x2zS5"/>
                                        </div>
                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                            <div className="flex items-bottom justify-between">
                                                <p className="text-grey-darkest">
                                                    Tom Cruise
                                                </p>
                                                <p className="text-xs text-grey-darkest">
                                                    12:45 pm
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white px-3 flex items-center hover:bg-stone-100 cursor-pointer">
                                        <div>
                                            <img className="h-8 w-8 rounded-full"
                                                 src="https://www.biography.com/.image/t_share/MTE5NTU2MzE2MjE4MTY0NzQ3/harrison-ford-9298701-1-sized.jpg"/>
                                        </div>
                                        <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
                                            <div className="flex items-bottom justify-between">
                                                <p className="text-grey-darkest">
                                                    Harrison Ford
                                                </p>
                                                <p className="text-xs text-grey-darkest">
                                                    12:45 pm
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default StudyPartner;
