import {useDispatch} from "react-redux";
import {useState} from "react";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import {addComment, addLike} from "../../feature/followingPostSlice";
import {RiSendPlane2Fill} from "react-icons/ri";

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

    const [postId, setPostId] = useState(props.postId);

    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo("en-US");

    function handleLikeClick(e){
        if (!props.likeList.includes(currentUserId)){
            setLikeState(true);
            dispatch(addLike({postId: postId, userId: currentUserId}));
        }else {
            setLikeState(false);
            dispatch(addLike({postId: postId, userId: currentUserId}));
        }
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

    function sendComment(e){
        dispatch(
            addComment({
                postId: postId,
                newComment:{
                    userId: localStorage.getItem("UserID"),
                    userName: localStorage.getItem("UserName"),
                    content: commentContent,
                },
            })
        );
        setCommentContent("");
    }



    return (
        <div className="w-full shadow h-auto bg-white rounded-md m-2">
            <div className="flex items-center space-x-2 p-2.5 px-4">
                <div className="w-10 h-10"><img src="https://picsum.photos/200"
                                                className="w-full h-full rounded-full"
                                                alt="dp"/></div>
                <div className="flex-grow flex flex-col"><p
                    className="font-semibold text-sm text-gray-700">{props.userName}
                </p><span
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

                    {props.commentList.map((commentItem) => (
                        <div className="pt-6" key={commentItem.id}>
                            {console.log(commentItem)}
                            <div className="flex pb-4">
                                <a className="mr-4" href="">
                                    <img className="rounded-full max-w-none w-12 h-12"
                                         src="https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg"/>
                                </a>
                                <div>
                                    <a className="font-semibold text-sm text-gray-700 mr-2"
                                       href="#">{commentItem.userName}</a>
                                    <span className="text-xs font-thin text-gray-400">{commentItem.date}</span>
                                    <div className="mb-1">
                                        <p className="text-gray-700 max-h-10 truncate px-3 text-sm">
                                            {commentItem.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            ):(
                <span></span>
            )}

        </div>
    )
}

export default Post;