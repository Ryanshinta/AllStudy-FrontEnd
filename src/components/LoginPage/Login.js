import {useState} from 'react';
import * as yup from "yup";
import axios from "axios";
import {loginFields} from "../../constants/formFields";
import { toast, ToastContainer } from "react-toastify";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import {useNavigate} from "react-router-dom";

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');


export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);



    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = () =>{
        function Login() {
            const [resData, setResData] = useState(null);

            let navigate = useNavigate();

            const schema = yup.object().shape({
                email: yup.string().email().required(),
                password: yup.string().required(),
            })

        async function postSignInInfo(inputData){
            const response = await axios({
                method:"post",
                url: "http://localhost:8765/api/users/signin",
                data:{
                    email: inputData.email,
                    password: inputData.password,
                },
            });

            if (response.data !== null && response.data.status === "fail") {
                showWarningToast(response.data.message);
            }
            if (response.data !== null && response.data.status === "success"){
                setResData(response.data);
            }
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
         }
    }


    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />

                )
            }
        </div>

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit} text="Login"/>

      </form>
    )
}
