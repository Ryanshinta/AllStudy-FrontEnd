import React from "react";
import {TextField} from "@mui/material";
import {CheckBox} from "@mui/icons-material";
import axios from "axios";
import {useRef, useState, useEffect} from "react";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Form, Button} from 'semantic-ui-react';
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import ReactDOM from 'react-dom/client';
import imageCompression from "browser-image-compression";

const UserProfile = () => {
    let response = "";
    const [UserInfo, setUserInfo] = useState([]);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const [profile, setProfile] = useState('');
    const [follower, setFollower] = useState('');
    const [following, setFollowing] = useState('');
    const [confirmMessage, setConfirmMessage] = useState(false);
    const [file64String, setFile64String] = useState('');
    const [file64StringWithType, setFile64StringWithType] = useState(null);

    const navigate = useNavigate();
    const {register: userProfile, handleSubmit, watch, formState: {errors}} = useForm();
    const password = useRef({});
    const userEmail = useRef({});
    password.current = watch("password", "");

    const getUserInfo = async (data) => {
        response = await axios({
            method: "POST",
            url: "http://localhost:8765/api/users/profile",
            headers: {
                Authorization: localStorage.getItem("Token"),
            },
            data: {
                email: localStorage.getItem("UserEmail")
            },
        });

        if (response.data !== null && response.data.status === "fail") {
            console.log("failed");
        }

        if (response.data !== null && response.data.status === "success") {
            console.log(localStorage.getItem("UserEmail"));
            console.log(localStorage.getItem("UserPassword"));
            console.log("success");
            console.log(response.data.payload);
            setUserInfo(response.data.payload);
            setFirstname(response.data.payload.firstName);
            setLastname(response.data.payload.lastName);
            setProfile(response.data.payload.profile);
            setEmail(response.data.payload.email);
            setGender(response.data.payload.gender);
            setPhone(response.data.payload.phone);
            setPass(localStorage.getItem("UserPassword"));
            setFollower(response.data.payload.follower);
            setFollowing(response.data.payload.following);
        }
    }

    function onUploadFileChange(e) {
        setFile64String(null);
        if (e.target.files < 1 || !e.target.validity.valid) {
            return;
        }
        compressImageFile(e);
    }

    function fileToBase64(file, cb) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(null, reader.result);
        };
        reader.onerror = function (error) {
            cb(error, null);
        };
    }

    async function compressImageFile(event) {
        const imageFile = event.target.files[0];

        const options = {
            maxWidthOrHeight: 250,
            useWebWorker: true,
        };
        try {
            const compressedFile = await imageCompression(imageFile, options);
            // input file is compressed in compressedFile, now write further logic here

            fileToBase64(compressedFile, (err, result) => {
                if (result) {
                    setProfile(result);
                    //   console.log(file);
                    //   console.log(String(result.split(",")[1]));
                    setFile64StringWithType(result);
                    setFile64String(String(result.split(",")[1]));
                }
            });
        } catch (error) {
            setFile64String(null);
            // console.log(error);
        }
    }

    const onSubmit = (data) => {
        console.log("on submit clicked");

        const info = {
            "firstName": firstname,
            "lastName": lastname,
            "gender": gender,
            "phone": phone,
            "email": email,
            "password": pass,
            "following": following,
            "follower": follower,
            "username": firstname + " " + lastname,
            "role": "USER",
            "profile": profile
        };
        setConfirmMessage(false);
        console.log(info);
        // console.log(data.firstName);
        // console.log(follower);
        // console.log(data);
        // let fol = follower;
        // let fwing = following;
        // console.log(data);
        // console.log(fol)
        // console.log(fwing);
        updateUserInfo(info);
        // addUser(data);
    }

    const updateUserInfo = async (info) => {
        const response = await axios({
            method: "PUT",
            url: "http://localhost:8765/api/users/update",
            headers: {
                Authorization: localStorage.getItem("Token"),
            },
            data: info,
        });
        if (response.data !== null && response.data.status === "fail") {
            console.log(response.data.message);
            console.log("failed");
        }

        if (response.data !== null && response.data.status === "success") {
            console.log("success");
            // navigate("/Signin");
        }
    }

    const showConfirmMessage = () => {
        setConfirmMessage(true);
    }

    const closeConfirmMessage = () => {
        setConfirmMessage(false);
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
// <div className="max-w-screen-xl my-4 mx-12 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div>
            {confirmMessage === true ? (
                <div
                    className="flex justify-center items-center visible overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 p-4 w-full md:inset-0 h-modal md:h-full">
                    <div className="relative w-full max-w-md h-full md:h-auto">
                        <div className="relative bg-cyan-800 rounded-lg shadow dark:bg-gray-700">
                            <button type="button"
                                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                    onClick={closeConfirmMessage}>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor"
                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clip-rule="evenodd"></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                            <div className="p-6 text-center">
                                <h3 className="mb-5 text-lg font-normal text-gray-50 dark:text-gray-400">
                                    Are you sure you want to update your profile?</h3>
                                <button
                                    onClick={() => onSubmit()}
                                    type="button"
                                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                    Confirm
                                </button>
                                <button onClick={closeConfirmMessage} type="button"
                                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <span></span>
            )}
            <div className="flex flex-col items-center pb-10">
                <img
                    // className="w-fit h-fit max-h-80 items-center"
                    className="mb-3 w-24 h-24 rounded-full shadow-lg"
                     src={profile}
                     alt="Profile Pic"/>
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{UserInfo.username}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{UserInfo.email}</span>
                <div className="overflow-x-auto relative">
                    <br></br>
                    <div>
                        <div className="p-2">
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid gap-6 mb-5 md:grid-cols-2">
                                    <div>
                                        <label for="first_name"
                                               class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First
                                            name</label>
                                        <Form.Field>
                                            <input
                                                name="firstName"
                                                id="firstName"
                                                className="border border-neutral-300 text-neutral-800 text-base rounded focus:ring-blue-500 focus:border-blue-500 block w-full h-fit dark:bg-gray-700 p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                // placeholder={firstname}
                                                value={firstname}
                                                type="text"
                                                onChangeCapture={event => setFirstname(event.target.value)}
                                                {...userProfile("firstName", {maxLength: 10})}
                                            />
                                            {errors.firstName && <div className="flex px-2 pt-2 text-sm text-red-700"
                                                                      role="alert">
                                                <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3"
                                                     fill="currentColor"
                                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                          clip-rule="evenodd"></path>
                                                </svg>
                                                <span className="sr-only">Info</span>
                                                <div>
                                                    <span className="font-medium">Please check! </span>Required
                                                </div>
                                            </div>}
                                        </Form.Field>
                                    </div>
                                    <div>
                                        <label for="last_name"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last
                                            name</label>
                                        <Form.Field>
                                            <input
                                                className="border border-neutral-300 text-neutral-800 text-base rounded focus:ring-blue-500 focus:border-blue-500 block w-full h-fit dark:bg-gray-700 p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                // placeholder={lastname}
                                                value={lastname}
                                                type="text"
                                                on={event => setLastname(event.target.value)}
                                                // value={lastname}
                                                {...userProfile("lastName", {maxLength: 10})}
                                            />
                                            {errors.lastName && <div className="flex px-2 pt-2 text-sm text-red-700"
                                                                     role="alert">
                                                <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3"
                                                     fill="currentColor"
                                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                          clip-rule="evenodd"></path>
                                                </svg>
                                                <span className="sr-only">Info</span>
                                                <div>
                                                    <span className="font-medium">Please check! </span>Required
                                                </div>
                                            </div>}
                                        </Form.Field>
                                    </div>
                                    <div>
                                        <label for="gender"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Gender</label>
                                        <Form.Field>
                                            <select id="gender"
                                                    onChangeCapture={event => setGender(event.target.value)}
                                                // placeholder="gender"
                                                    {...userProfile("gender", {required: true})}
                                                    className="border border-neutral-300 text-neutral-800 text-base rounded focus:ring-blue-500 focus:border-blue-500 block w-full h-fit dark:bg-gray-700 p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                <option selected value={gender}>{gender}</option>
                                                <option value="Female">Female</option>
                                                <option value="Male">Male</option>
                                            </select>
                                        </Form.Field>
                                    </div>
                                    <div>
                                        <label for="phone"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone
                                            number</label>
                                        <Form.Field>
                                            <input
                                                className="border border-neutral-300 text-neutral-800 text-base rounded focus:ring-blue-500 focus:border-blue-500 block w-full h-fit dark:bg-gray-700 p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                // placeholder={phone}
                                                value={phone}
                                                type="text"
                                                onChangeCapture={event => setPhone(event.target.value)}
                                                // value={phone}
                                                {...userProfile("phone", {
                                                    maxLength: 10,
                                                    pattern: /[0-9]{10}/
                                                })}
                                            />
                                            {errors.phone && <div className="flex px-2 pt-2 text-sm text-red-700"
                                                                  role="alert">
                                                <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3"
                                                     fill="currentColor"
                                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                          clip-rule="evenodd"></path>
                                                </svg>
                                                <span className="sr-only">Info</span>
                                                <div>
                                                    <span className="font-medium">Please check! </span>Required
                                                </div>
                                            </div>}
                                        </Form.Field></div>
                                </div>
                                <div className="mb-5">
                                    <label for="email"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email
                                        address</label>
                                    <Form.Field>
                                        <input
                                            className="border border-neutral-300 text-neutral-800 text-base rounded focus:ring-blue-500 focus:border-blue-500 block w-full h-full dark:bg-gray-700 p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            // placeholder={email}
                                            value={email}
                                            type="email"
                                            onChangeCapture={event => setEmail(event.target.value)}
                                            // value={email}
                                            {...userProfile("email",
                                                {
                                                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                                })}
                                        />
                                        {errors.email &&
                                            <div className="flex px-2 pt-2 text-sm text-red-700"
                                                 role="alert">
                                                <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3"
                                                     fill="currentColor"
                                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                          clip-rule="evenodd"></path>
                                                </svg>
                                                <span className="sr-only">Info</span>
                                                <div>
                                                    <span className="font-medium">Please check! </span>Email format and
                                                    not empty
                                                </div>
                                            </div>}
                                    </Form.Field>
                                </div>
                                <div className="mb-5">
                                    <label for="password"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                                    <Form.Field>
                                        <input
                                            className="border border-neutral-300 text-neutral-800 text-base rounded focus:ring-blue-500 focus:border-blue-500 block w-full h-full dark:bg-gray-700 p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            // placeholder={pass}
                                            value={pass}
                                            type="password"
                                            onChangeCapture={event => setPass(event.target.value)}
                                            // value={pass}
                                            {...userProfile("password", {
                                                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*#?&]).{8,}$/
                                            })}
                                        />
                                        {errors.password &&
                                            <div className="flex px-2 pt-2 text-sm text-red-700"
                                                 role="alert">
                                                <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3"
                                                     fill="currentColor"
                                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                          clip-rule="evenodd"></path>
                                                </svg>
                                                <span className="sr-only">Info</span>
                                                <div>
                                                    <span className="font-medium">Please check! </span>Must contains
                                                    number,
                                                    symbols, upper
                                                    & lowercase
                                                </div>
                                            </div>}
                                    </Form.Field></div>
                                <div className="mb-5">
                                    <label for="confirm_password"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm
                                        password</label>
                                    <Form.Field>
                                        <input
                                            className="border border-neutral-300 text-neutral-800 text-base rounded focus:ring-blue-500 focus:border-blue-500 block w-full h-full dark:bg-gray-700 p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            // placeholder={pass}
                                            value={pass}
                                            type="password"
                                            {...userProfile("confirmPassword", {
                                                validate: value => value === password.current,
                                                // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*#?&]).{8,}$/
                                            })}
                                        />
                                        {errors.confirmPassword && <div className="flex px-2 pt-2 text-sm text-red-700"
                                                                        role="alert">
                                            <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3"
                                                 fill="currentColor"
                                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd"
                                                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                      clip-rule="evenodd"></path>
                                            </svg>
                                            <span className="sr-only">Info</span>
                                            <div>
                                                <span className="font-medium">Please check! </span>Must match with above
                                            </div>
                                        </div>}
                                    </Form.Field>
                                </div>
                                <div className="mb-5">
                                    <Form.Field>
                                        <label className="block mb-2 text-lg text-gray-900 dark:text-white"
                                               htmlFor="file_input">Upload Profile Picture</label>
                                        <div className="flex space-x-3 font-thin text-sm text-gray-600 -mb-1">
                                            <input className={
                                                "file:mr-4 file:py-2 file:px-4\n" +
                                                "      file:rounded-full file:border-0\n" +
                                                "      file:text-sm file:font-semibold\n" +
                                                "      file:bg-violet-50 file:text-violet-700\n" +
                                                "      hover:file:bg-violet-100"
                                            } type="file" id={"file"} accept="image/*" onChange={onUploadFileChange}/>
                                            <label htmlFor={"file"}></label>
                                        </div>
                                    </Form.Field>
                                </div>
                                <div className="flex mt-4 space-x-3 lg:mt-2">
                                    <input
                                        value="Update"
                                        type='button'
                                        onClick={() => {
                                            showConfirmMessage();
                                        }}
                                        className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        Info></input>
                                    <Button
                                        className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Back</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // </div>
    )
}

export default UserProfile;
