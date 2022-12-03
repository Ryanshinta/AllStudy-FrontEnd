import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import {addComment, addLove} from "../../feature/followingPostSlice";
import {RiSendPlane2Fill} from "react-icons/ri";
import axios from "axios";
import CommentItem from "./CommnetItem";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {IconButton, Tooltip} from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import * as React from "react";

function Post(props) {

    const dispatch = useDispatch();
    const [likeState, setLikeState] = useState(false);
    const [commentState, setCommentState] = useState(false);
    const [commentContent, setCommentContent] = useState("");
    const [sendButtonDisable, setSendButtonDisable] = useState(false);
    const [currentUserId,setCurrentUserId] = useState(
        localStorage.getItem("UserID")
    );
    const [currentUserName,setCurrentUserName] = useState(
        localStorage.getItem("UserName")
    );
    const [profile, setProfile] = useState('');
    const [postId, setPostId] = useState(props.postId);
    const [commentPhoto, setCommentPhoto] = useState('');




    const getUserPhoto = async (data) => {
        const response = await axios({
            method: "POST",
            url: "http://localhost:8765/api/users/profilePhoto",
            headers: {
                Authorization: localStorage.getItem("Token"),
            },
            data: {
                id: props.userId
            },
        });

        if (response.data !== null && response.data.status === "fail") {
            console.error("Get user profile photo fail")
        }

        if (response.data !== null && response.data.status === "success") {
            setProfile(response.data.payload.profile);

        }
    }

    useEffect(()=>{
        getUserPhoto();
    })

    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");

    function handleLikeClick(e){
        //todo
    }

    function handleCommentClick(e){
        setCommentState(!commentState)
    }

    function handleCommentContentChange(e){
        e.preventDefault();
        setCommentContent(e.target.value);

        if (commentContent.length - 1 > 0 && commentContent.length - 1 <=100){
            setSendButtonDisable(false);
        }else {
            setSendButtonDisable(true);
        }
    }

    async function sendComment(e) {
        const response = await axios({
            method: "post",
            url: "http://localhost:8765/api/insertComment",
            headers: {
                Authorization: localStorage.getItem("Token"),
            },
            data: {
                commentEntity: {
                    userId: localStorage.getItem("UserID"),
                    userName: localStorage.getItem("UserName"),
                    content: commentContent,
                },
                postId: {
                    id: postId,
                },
            },
        });
        console.log(response);
        setCommentContent("");
    }


    function handleDeletePostClick() {
        const data = JSON.stringify({
            "id": props.postId
        });

        const config = {
            method: 'POST',
            url: 'http://localhost:8765/api/deletePostById',
            headers: {
                Authorization: localStorage.getItem("Token"),
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="w-full shadow h-auto bg-white rounded-md">
            <div className="flex items-center space-x-2 p-2.5 px-4">
                <div className="w-10 h-10"><img src={profile}
                                                className="w-full h-full rounded-full"
                                                alt="dp"/></div>
                <div className="flex-grow flex flex-col"><p
                    className="font-semibold text-sm text-gray-700">{props.userName} {props.deleteAble ?
                    <Tooltip title={"Click to Delete"}>
                        <IconButton onClick={handleDeletePostClick}>
                            <DeleteForeverIcon  />
                        </IconButton>
                    </Tooltip>: <div></div>}
                </p>
                    <span
                    className="text-xs font-thin text-gray-400">{timeAgo.format(new Date(props.postDate).getTime())}</span>
                </div>
            </div>
            <div className="mb-1"><p
                className="text-gray-700 max-h-10 truncate px-3 text-sm">{props.content}</p></div>

            {props.image !== null ? (
                <div className="w-full h-76 max-h-80 justify-content-center align-items-center mb-3">
                    <img
                    src={props.image} alt="postimage"
                    className="w-fit h-fit max-h-80 items-center"/>
                </div>
            ):(
                <span></span>
            )}

            <div className="w-full flex flex-col space-y-2 p-2 px-4">
                <div
                    className="flex items-center justify-between pb-2 border-b border-gray-300 text-gray-500 text-sm">
                    <div className="flex items-center">
                        <button className="flex items-center focus:outline-none flex items-center justify-center w-4 h-4 rounded-full bg-primary" onClick={handleLikeClick}>
                                Like
                            <div className="ml-1"><p>
                                {props.likeList.length > 0 ? props.likeList.length : null}
                            </p></div>
                        </button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button onClick={handleCommentClick}>{props.commentList.length > 0 ? props.commentList.length : null} Comments</button>
                    </div>
                </div>
            </div>
            {/* comment input*/}
            {commentState === true ?(
                <>
                    <div>
                        <div className="relative">
                            <input placeholder="Write a comment..."
                                   className="pt-2 pb-2 pl-3 w-full h-11 bg-slate-100 rounded-lg font-medium pr-20"
                                   value={commentContent}
                            onChange={handleCommentContentChange}/>
                            <button className="flex absolute right-3 top-2/4 -mt-3 items-center" disabled={sendButtonDisable} onClick={sendComment}>
                                <RiSendPlane2Fill/>
                            </button>
                        </div>
                    </div>

                    {props.commentList.map((comment) => (

                        <CommentItem
                            key={comment.id}
                            id={comment.id}
                            userId={comment.userId}
                            userName={comment.userName}
                            content={comment.content}
                        />
                    ))}
                </>
            ):(
                <span></span>
            )}

        </div>
    )
}

export default Post;
