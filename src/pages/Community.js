import Layout from "../components/Dashboard/Layout";
import {RiSendPlane2Fill} from "react-icons/ri";
import {useEffect, useState} from "react";
import NewPost from "../components/Community/NewPost";
import {useDispatch, useSelector} from "react-redux";
import {getFollowingPosts} from "../feature/followingPostSlice";
import Post from "../components/Community/Post";
import {getAllPost} from "../feature/allPostSlice";
import axios from "axios";
import {SwipeableDrawer, Tab, Tabs} from "@mui/material";
import AllPost from "../components/Community/AllPost";
import FollowingPost from "../components/Community/FollowingPost";
import MyPost from "../components/Community/MyPost";


export default function Community() {

    // const dispatch = useDispatch();
    // const storeFollowingPost = useSelector((state)=> state.followingPostReducer.followingPosts);
    //
    // const storeAllPost = useSelector((state) => state.allPostReducer.allPost);
    //
    // useEffect(()=>{
    //     dispatch(getFollowingPosts());
    // },[]);

    // useEffect(()=>{
    //     dispatch(getAllPost());
    // },[]);

    const [value, setValue] = useState(0);
    const [allPost, setAllPost] = useState();


    async function getAllPosts() {

        const response = await axios({
            method: "GET",
            url: "http://localhost:8765/api/getAllPost",
            headers: {
                Authorization: localStorage.getItem("Token"),
            },
        });
        console.log(response.data.payload);
        if (response.data.status === "success") {
            setAllPost(response.data.payload);
            //console.log(allPost);
        }
    }

    useEffect(()=>{
        getAllPosts()
    },[]);


    return (
        <>
            <Layout>
                <div className="w-full h-full items-center">
                    <div className="w-full h-full grid grid-cols-7 justify-center">
                        <div className="col-span-2 flex justify-start ml-2">

                        </div>
                        <div className="col-span-3 h-full">
                            <div className="mt-6 w-full h-full pb-5 items-center">
                                <NewPost/>

                                {/* post start */}
                                <div className={"bg-white rounded-md m-3 flex justify-center" }>
                                <Tabs aria-label={"full width tabs example"} textColor={"inherit"} value={value}>
                                    <Tab label={"All Post"} onClick={()=>{setValue(0)}}/>
                                     <Tab label={"Following"}onClick={()=>{setValue(1)}}/>
                                     <Tab label={"My Post"}onClick={()=>{setValue(2)}}/>
                                </Tabs>

                                </div>
                                {
                                    value === 0 ?(
                                        <AllPost/>
                                    ):value === 1 ?(
                                        <FollowingPost/>
                                    ):(
                                        <MyPost/>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
