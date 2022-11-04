
import React, { useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
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
        if (localStorage.getItem("token") !== null) {
            navigate("/newsfeed");
        }
    });

    return (
        <Container  fluid >
            <Row className="flex h-screen w-screen justify-center items-center">
                <Col className="flex justify-center items-center h-screen bg-center bg-no-repeat bg-cover text-white bg-gradient-to-r from-sky-500 to-indigo-500">
                    <div>
                        <Row>
                            <h3 className="my-3">
                                <BsFillBookFill /> AllStudy
                            </h3>
                        </Row>
                        <Row>
                            <h3 className="my-3">
                                <BsFillCpuFill /> Start your Study today
                            </h3>
                        </Row>
                        <Row>
                            <h3 className="my-3">
                                <BsGithub /> Meet students from all over the world
                            </h3>
                        </Row>
                        <Row>
                            <h3 className="my-3">
                                <BsFillShareFill /> Say goodbye to lack of motivation and become powerful from now!
                            </h3>
                        </Row>
                    </div>
                </Col>
                <Col className="flex justify-center items-center">
                    <div className="w-6/12 text-green-600">
                        <img src={logo} alt="PSN logo" width={120} className="mb-3" />
                        <Row>
                            <h1 className="text-success mb-3">Study now!</h1>
                        </Row>
                        <br />
                        <Row>
                            <h3 className="text-success mb-3">Join AllStudy today</h3>
                        </Row>
                        <br />
                        <Row>
                            <Link to="/signin" className="no-underline text-white"><Button variant="success" className="w-full mb-3">Sign In <RiLoginBoxLine /></Button></Link>
                        </Row>
                        <Row>
                            <Link to="/signup" className="no-underline text-white"><Button variant="success" className="w-full mb-3">Sign Up <BsFillPersonPlusFill /></Button></Link>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
export default HomePage;
