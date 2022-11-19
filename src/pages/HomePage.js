
import React, { useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
//import  "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";



import {
    BsFillBookFill,
    BsGithub,
    BsFillShareFill,
    BsFillPersonPlusFill,
    BsFillCpuFill
} from "react-icons/bs";

import {RiLoginBoxLine} from "react-icons/ri";

//import styles from "../styles/HomePage.module.css";

import logo from "../assets/Logo.png";

function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("Token") !== null) {
            navigate("/Community");
        }
    });

    return (
        <Container  fluid >
            <Row className="flex h-screen w-screen items-center">
                <Col className="flex justify-center w-1/2 items-center h-screen bg-center bg-no-repeat bg-cover text-white bg-gradient-to-r from-sky-500 to-indigo-500">
                    <div>
                        <Row>
                            <h3 className="m-10 text-3xl font-semibold">
                                <BsFillBookFill size={40}/> AllStudy
                            </h3>
                        </Row>
                        <Row>
                            <h3 className="m-10 text-3xl font-semibold">
                                <BsFillCpuFill size={40}/> Start your Study today
                            </h3>
                        </Row>
                        <Row>
                            <h3 className="m-10 text-3xl font-semibold">
                                <BsGithub size={40}/> Meet students from all over the world
                            </h3>
                        </Row>
                        <Row>
                            <h3 className="m-10 text-3xl font-semibold">
                                <BsFillShareFill size={40}/> Say goodbye to lack of motivation and become powerful from now!
                            </h3>
                        </Row>
                    </div>
                </Col>
                <Col className="flex justify-center w-1/2 items-center">
                    <div className="w-6/12 text-green-600">
                        <img src={logo} alt="PSN logo" width={120} className="mb-3" />
                        <Row>
                            <h1 className="text-5xl mb-3 font-semibold">Study now!</h1>
                        </Row>
                        <br />
                        <Row>
                            <h3 className="text-3xl mb-3 font-medium">Join AllStudy today</h3>
                        </Row>
                        <br />
                        <Row>
                            <Link to="/signin" className="no-underline text-white">
                                <Button variant="success" className="w-1/2 text-xl text-white bg-green-600 hover:bg-gray-100 border hover:text-black border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg px-5 py-2.5 text-center inline-flex flex justify-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
                                    Sign In
                                    <RiLoginBoxLine size={20} className="mx-2 my-1"/>
                                </Button></Link>
                        </Row>
                        <Row>
                            <Link to="/signup" className="no-underline text-white content-center">
                                <Button variant="success" className="w-1/2 text-white bg-green-600 hover:bg-gray-100 border hover:text-black border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-xl px-5 py-2.5 text-center inline-flex flex justify-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
                                    Sign Up
                                    <BsFillPersonPlusFill size={20} className="mx-2 my-1"/>
                                </Button></Link>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
export default HomePage;
