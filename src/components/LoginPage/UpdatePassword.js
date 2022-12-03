import * as yup from "yup";
// import {loginFields} from "../../constants/formFields";
// import { toast, ToastContainer } from "react-toastify";

import React, {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {Form, Button} from 'semantic-ui-react';
import {useNavigate, useSearchParams, useLocation} from "react-router-dom";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";

const UpdatePassword = () => {
    const [email, setEmail] = useState('');
    const location = useLocation()
    const params = new URLSearchParams(location.search)
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
        resetLoginPassword(data);
    }

    async function resetLoginPassword(inputData) {
        console.log(inputData.password);
        console.log(params.get("token"));
        const response = await axios({
            method: "post",
            url: "http://localhost:8765/api/reset_password",
            data: {
                resetPasswordToken: params.get("token"),
                password: inputData.password
            },
        });
        if (response.data !== null && response.data.status === "fail") {
            showFailMessage("It might some errors occur");
            console.log(response.data.message);
        }

        if (response.data !== null && response.data.status === "success") {
            showSuccessMessage("Your password had been reset");
            console.log(response.data.message);
            navigate("/Signin");
        }
    }

    return (
        <>
            <ToastContainer/>
            <div>
                <Form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-5">
                        <Form.Field>
                            <input
                                className="border border-neutral-300 text-neutral-400 text-base rounded focus:ring-blue-500 focus:border-blue-500 block w-full h-full dark:bg-gray-700 p-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder='Password'
                                type="password"
                                onChange={event => setPass(event.target.value)}
                                {...register("password", {
                                    required: true,
                                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*#?&]).{8,}$/
                                })}
                            />
                        </Form.Field>
                        {errors.password &&
                            <div className="flex px-2 pt-2 text-sm text-red-700"
                                 role="alert">
                                <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor"
                                     viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                          clip-rule="evenodd"></path>
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    <span className="font-medium">Please check! </span>Must contains number, symbols, upper
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
                    <Button type='submit'
                            className="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Reset</Button>
                </Form>
            </div>
        </>
    )
}
export default UpdatePassword;
