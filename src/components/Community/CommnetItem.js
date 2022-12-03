import {useEffect, useState} from "react";
import axios from "axios";


function CommentItem(props){

    const [commentPhoto, setCommentPhoto] = useState('');

    async function getCommentUserPhoto() {

        console.log(props.userId)
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
            setCommentPhoto(response.data.payload.profile);
        }
    }

    useEffect(()=>{
        getCommentUserPhoto();
    })
    return (
        <div className="pt-6" key={props.id}>
            {console.log(props)}
            <div className="flex pb-4">
                <a className="mr-4" href="">
                    <img className="rounded-full max-w-none w-12 h-12"
                         src={commentPhoto}/>
                </a>
                <div>
                    <a className="font-semibold text-sm text-gray-700 mr-2"
                       href="#">{props.userName}</a>
                    <span className="text-xs font-thin text-gray-400">{props.date}</span>
                    <div className="mb-1">
                        <p className="text-gray-700 max-h-10 truncate px-3 text-sm">
                            {props.content}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CommentItem
