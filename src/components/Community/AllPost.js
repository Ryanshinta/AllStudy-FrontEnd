import {useEffect, useState} from "react";
import axios from "axios";
import Post from "./Post";

export default function AllPost (prop){
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


    return(
        <>
            {
                allPost !== null ? (
                    allPost?.map((post) => {
                        return (
                            <Post
                                key={post.id}
                                postId={post.id}
                                userId={post.userId}
                                userName={post.userName}
                                content={post.content}
                                image={post.image}
                                likeList={post.like}
                                commentList={post.comment}
                                postDate={post.createdAt}
                            />
                        )
                    })
                ) : (
                    <div>
                    </div>
                )
            }


        </>
    )
}
