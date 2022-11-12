import {useState} from 'react';
import FormAction from "./FormAction";
import Input from "./Input";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Formik} from "formik";
import Form from "react-bootstrap/Form";
import {toast, ToastContainer} from "react-toastify";


export default function Signup(){
  const [userRole, setUserRole] = useState("user");
  const [resData, setResData] = useState(null);
  let navigate = useNavigate();

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(8,'Your password is too short.'),
    passwordConfirmation: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')

  });


  const handleSubmit=(e)=>{
    e.preventDefault();
    createAccount(e)
  }

  //handle Signup API Integration here
  const createAccount=(e)=>{
    postSignUpInfo(e)
  }

  async function postSignUpInfo(inputData){
    const response = await axios({
      method:"post",
      url:"localhost:8765/api/users/save",
      data:{
        name:inputData.name,
        email:inputData.email,
        password:inputData.password,
        role:"USER"
      }
    });
    if (response.data !== null) {
      setResData(response.data);
    }

    if (response.data !== null && response.data.status === "fail") {
      showWarningToast(response.data.message);
    }

    if (response.data!== null && response.data.status === "success") {
      navigate("/signin");
    }
  }

  function showWarningToast(inputMessage) {
    toast.warn(inputMessage, {
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

    return(
        <>
        <ToastContainer />
        <Formik
            validationSchema={schema}
            initialValues={{
              email:"",
              password:"",
              name:"",
        }} onSubmit={
          (values, {setSubmitting}) =>{
            console.log(values);
            postSignUpInfo(values);
            setSubmitting(false);
          }
        }>
          {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isInValid,
              errors,
          }) =>(
              <form className="mt-8 space-y-6"
                    noValidate
                    onSubmit={handleSubmit}>
                <div className="">
                    <Form.Group controlId="">
                      <Form.Control placeholder="Name" type="name" className="name" value={values.name} onChange={handleChange} isInvalid={touched.name && errors.name}/>
                      <Form.Control.Feedback type="invalid">
                        Please enter your name
                      </Form.Control.Feedback>
                    </Form.Group>
                  <br/>
                  <Form.Group controlId="signInEmail">
                    <Form.Control placeholder="Email" type="email" className="email" value={values.email} onChange={handleChange} isInvalid={touched.email && errors.email}/>
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid email
                    </Form.Control.Feedback>
                  </Form.Group>
                  <br/>
                  <Form.Group>
                    <Form.Control placeholder="Password" type="password" className="password" value={values.password} onChange={handleChange} isInvalid={touched.password && errors.password}/>
                    <Form.Control.Feedback type="invalid">
                      Please enter your password
                    </Form.Control.Feedback>
                  </Form.Group>
                  <br/>
                  <Form.Group>
                    <Form.Control placeholder="passwordConfirmation" type="password" className="passwordConfirmation" value={values.passwordConfirmation} onChange={handleChange} isInvalid={touched.passwordConfirmation && errors.passwordConfirmation}/>
                    <Form.Control.Feedback type="invalid">
                      Please enter your passwordConfirmation
                    </Form.Control.Feedback>
                  </Form.Group>

                  <FormAction handleSubmit={handleSubmit} text="Signup" />
                </div>
              </form>
          )
          }
        </Formik>
        </>
    )
}
