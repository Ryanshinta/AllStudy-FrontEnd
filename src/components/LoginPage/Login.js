import {useState} from 'react';
import * as yup from "yup";
import axios from "axios";
import {loginFields} from "../../constants/formFields";
import { toast, ToastContainer } from "react-toastify";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import {useNavigate} from "react-router-dom";
import {Formik} from "formik";
import Form from "react-bootstrap/Form";

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');


export default function SignIn(){
    const [loginState,setLoginState]=useState(fieldsState);

    const [resData, setResData] = useState(null);

    let navigate = useNavigate();

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
    });

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    async function postSignInInfo(inputData){
        const response = await axios({
            method: "post",
            url: "http://localhost:8765/api/users/signin",
            data: {
                email: inputData.email,
                password: inputData.password,
            },
        });
        if (response.data !== null && response.data.status === "fail") {
            showWarningToast(response.data.message);
        }

        if (response.data !== null && response.data.status === "success"){
            setResData(response.data);

            localStorage.setItem("UserID",response.data.payload.user.id);
            localStorage.setItem("UserName",response.data.payload.user.Name);
            localStorage.setItem("UserEmail",response.data.payload.user.email);
            localStorage.setItem("Token",response.data.payload.user.token);
            navigate("/Dashboard");

        }
    }

    //Handle Login API Integration here
    const authenticateUser = (values) =>{
        //console.log("Login")
        postSignInInfo(values);

    }

    function showWarningToast(inputMessage) {
        toast.warn("Invalid email or password", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        console.log("toast");
    }

    return(
        <Formik
            validationSchema={schema}
            initialValues={{
                email: "",
                password: "",
            }}
            onSubmit={(values, {setSubmitting}) => {
                postSignInInfo(values);
                setSubmitting(false);
            }}
        >

            {
                ({
                     handleSubmit,
                     handleChange,
                     handleBlur,
                     values,
                     touched,
                     isInValid,
                     errors,
                 }) => (
                    <form
                        noValidate
                        className="mt-8 space-y-6"
                        onSubmit={handleSubmit}>
                        <div className="-space-y-px">
                            {/*{*/}
                            {/*    fields.map(field=>*/}
                            {/*        <Input*/}
                            {/*            key={field.id}*/}
                            {/*            handleChange={handleChange}*/}
                            {/*            value={loginState[field.id]}*/}
                            {/*            labelText={field.labelText}*/}
                            {/*            labelFor={field.labelFor}*/}
                            {/*            id={field.id}*/}
                            {/*            name={field.name}*/}
                            {/*            type={field.type}*/}
                            {/*            isRequired={field.isRequired}*/}
                            {/*            placeholder={field.placeholder}*/}
                            {/*        />*/}

                            {/*    )*/}
                            {/*}*/}
                            <Form.Group controlId="signInEmail">
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={values.email}
                                onChange={handleChange}
                                isInvalid={touched.email && errors.email}
                            />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid email
                                </Form.Control.Feedback>
                            </Form.Group>
                            <br/>
                            <Form.Group controlId="signInPassword">
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange}
                                isInvalid={touched.password && errors.password}
                            />
                                <Form.Control.Feedback type="invalid">
                                    Please enter your password
                                </Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <FormExtra/>
                        <FormAction handleSubmit={handleSubmit} text="Login"/>

                    </form>
                )
            }


        </Formik>
    )
}
