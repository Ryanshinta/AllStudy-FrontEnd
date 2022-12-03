import {useEffect, useState} from "react";
import axios from "axios";
import Post from "./Post";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function MyPost (prop){
    const [allPost, setAllPost] = useState();

    async function getAllPosts() {

        const response = await axios({
            method: "POST",
            url: "http://localhost:8765/api/myPost",
            headers: {
                Authorization: localStorage.getItem("Token"),
            },
            data:{
                id:localStorage.getItem("UserID")
            }
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
                        return (<>
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
                                deleteAble={true}
                            />
                            </>
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
