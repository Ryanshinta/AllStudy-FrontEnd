import Layout from "../components/Dashboard/Layout";
import {RiSendPlane2Fill} from "react-icons/ri";
import {useEffect, useState} from "react";
import NewPost from "../components/Community/NewPost";
import {useDispatch, useSelector} from "react-redux";
import {getFollowingPosts} from "../feature/followingPostSlice";
import Post from "../components/Community/Post";
import {getAllPost} from "../feature/allPostSlice";
import axios from "axios";


export default function Community() {

    const dispatch = useDispatch();
    const storeFollowingPost = useSelector((state)=> state.followingPostReducer.followingPosts);

    const storeAllPost = useSelector((state) => state.allPostReducer.allPost);

    useEffect(()=>{
        dispatch(getFollowingPosts());
    },[]);

    // useEffect(()=>{
    //     dispatch(getAllPost());
    // },[]);


    // const [allPost, setAllPost] = useState();
    //
    //
    // async function getAllPosts() {
    //
    //     const response = await axios({
    //         method: "GET",
    //         url: "http://localhost:8765/api/getAllPost",
    //         headers: {
    //             Authorization: localStorage.getItem("Token"),
    //         },
    //     });
    //     console.log(response.data.payload);
    //     if (response.data !== null && response.data.status === "success") {
    //         setAllPost(response.data.payload);
    //     }
    // }
    //
    // useEffect(()=>{
    //     getAllPosts()
    // },[]);


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

                                {

                                    storeFollowingPost !== null ? (
                                        storeFollowingPost?.map((post) => {
                                            return (
                                                <Post
                                                    key={post.post.id}
                                                    postId={post.post.id}
                                                    userId={post.user.id}
                                                    userName={post.post.userName}
                                                    content={post.post.content}
                                                    image={post.post.image}
                                                    likeList={post.post.like}
                                                    commentList={post.post.comment}
                                                    postDate={post.post.createdAt}
                                                />
                                            )
                                        })
                                    ) : (
                                        <div>

                                        </div>
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
