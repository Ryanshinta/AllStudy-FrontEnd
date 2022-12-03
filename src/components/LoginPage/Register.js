import {TextField} from "@mui/material";
import React, {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {Form, Button} from 'semantic-ui-react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import imageCompression from "browser-image-compression";
import FileBase64 from 'react-file-base64';
import {ToastContainer, toast} from "react-toastify";

const Signup = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [pass, setPass] = useState('');
    const [message, setMessage] = useState('');
    const [picture, setPicture] = useState('');
    const [file64String, setFile64String] = useState('');
    const [file64StringWithType, setFile64StringWithType] = useState(null);

    const navigate = useNavigate();
    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const password = useRef({});
    const userEmail = useRef({});
    password.current = watch("password", "");

    function showSuccessMessage(inputMessage) {
        toast.success(inputMessage, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    function showFailMessage(inputMessage) {
        toast.error(inputMessage, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const onSubmit = (data) => {
        console.log(data);
        addUser(data);
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
                    setPicture(result);
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

    const addUser = async (data) => {
        console.log(picture);
        if (picture.length === 0) {
            showFailMessage("Please upload a profile picture");
        } else {
            const response = await axios({
                method: "POST",
                url: "http://localhost:8765/api/users/save",
                data: {
                    email: data.email,
                    phone: data.phone,
                    gender: data.gender,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    password: data.password,
                    profile: picture,
                    role: "USER"
                },
            });
            if (response.data !== null && response.data.status === "fail") {
                showFailMessage("Email Registered");
                console.log("failed")
            }

            if (response.data !== null && response.data.status === "success") {
                console.log("success")
                navigate("/Signin");
            }
        }
    }

    return (
        <>
            <ToastContainer/>
            <div>
                <Form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-6 mb-5 md:grid-cols-2">
                        <Form.Field>
                            <input
                                className="border border-neutral-300 text-neutral-400 text-base rounded focus:ring-blue-500 focus:border-blue-500 block w-full h-fit dark:bg-gray-700 p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder='First Name'
                                type="text"
                                onChange={event => setFirstname(event.target.value)}
                                // value={firstname}
                                {...register("firstName", {required: true, maxLength: 10})}
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
                        <Form.Field>
                            <input
                                className="border border-neutral-300 text-neutral-400 text-base rounded focus:ring-blue-500 focus:border-blue-500 block w-full h-fit dark:bg-gray-700 p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder='Last Name'
                                type="text"
                                onChange={event => setLastname(event.target.value)}
                                // value={lastname}
                                {...register("lastName", {required: true, maxLength: 10})}
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
                        <Form.Field>
                            <select id="gender"
                                    onChange={event => setGender(event.target.value)}
                                    placeholder="gender"
                                    {...register("gender", {required: true})}
                                    className="border border-neutral-300 text-neutral-400 text-base rounded focus:ring-blue-500 focus:border-blue-500 block w-full h-fit dark:bg-gray-700 p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected value="gender">Gender</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </select>
                        </Form.Field>
                        <Form.Field>
                            <input
                                className="border border-neutral-300 text-neutral-400 text-base rounded focus:ring-blue-500 focus:border-blue-500 block w-full h-fit dark:bg-gray-700 p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder='Phone'
                                type="text"
                                onChange={event => setPhone(event.target.value)}
                                // value={phone}
                                {...register("phone", {required: true, maxLength: 10, pattern: /[0-9]{10}/})}
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
                        </Form.Field>
                    </div>
                    <div className="mb-5">
                        <Form.Field>
                            <input
                                className="border border-neutral-300 text-neutral-400 text-base rounded focus:ring-blue-500 focus:border-blue-500 block w-full h-full dark:bg-gray-700 p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder='Email'
                                type="email"
                                onChange={event => setEmail(event.target.value)}
                                // value={email}
                                {...register("email",
                                    {
                                        required: true,
                                        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                    })}
                            />
                        </Form.Field>
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
                                    <span className="font-medium">Please check! </span>Email format and not empty
                                </div>
                            </div>}
                    </div>
                    <div className="mb-5">
                        <Form.Field>
                            <input
                                className="border border-neutral-300 text-neutral-400 text-base rounded focus:ring-blue-500 focus:border-blue-500 block w-full h-full dark:bg-gray-700 p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder='Password'
                                type="password"
                                onChange={event => setPass(event.target.value)}
                                // value={pass}
                                {...register("password", {
                                    required: true,
                                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*#?&]).{8,}$/
                                })}
                            />
                        </Form.Field>
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
                                    <span className="font-medium">Please check! </span>Must contains number, symbols,
                                    upper
                                    & lowercase
                                </div>
                            </div>}
                    </div>
                    <div className="mb-5">
                        <Form.Field>
                            <input
                                className="border border-neutral-300 text-neutral-400 text-base rounded focus:ring-blue-500 focus:border-blue-500 block w-full h-full dark:bg-gray-700 p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder='Confirm Password'
                                type="password"
                                {...register("confirmPassword", {
                                    required: true,
                                    validate: value => value === password.current,
                                    // pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*#?&]).{8,}$/
                                })}
                            />
                        </Form.Field>
                        {errors.confirmPassword && <div className="flex px-2 pt-2 text-sm text-red-700"
                                                        role="alert">
                            <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor"
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
                    <Button type='submit'
                            className="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Signup</Button>
                </Form>
            </div>
        </>
    )
}
export default Signup;