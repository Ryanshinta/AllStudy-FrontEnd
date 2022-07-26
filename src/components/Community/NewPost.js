import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {getFollowingPosts} from "../../feature/followingPostSlice";
import imageCompression from "browser-image-compression";
import Button from "@mui/material/Button";
import 'react-toastify/dist/ReactToastify.css';

function NewPost() {
    const dispatch = useDispatch();

    const [userName, setUserName] = useState(
        localStorage.getItem("UserName")
    );

    const [userId, setUserId] = useState(
        localStorage.getItem("UserId")
    );

    const [postContent, setPostContent] = useState("");
    const [postContentCount, setPostContentCount] = useState(0);
    const [disablePostButton, setDisablePostButton] = useState(true);
    const [file, setFile] = useState(null);
    const [file64String, setFile64String] = useState(null);
    const [file64StringWithType, setFile64StringWithType] = useState(null);
    const [profile, setProfile] = useState('');

    const getUserInfo = async (data) => {
        const response = await axios({
            method: "POST",
            url: "http://localhost:8765/api/users/profilePhoto",
            headers: {
                Authorization: localStorage.getItem("Token"),
            },
            data: {
                id: localStorage.getItem("UserID")
            },
        });

        if (response.data !== null && response.data.status === "fail") {
            //console.log("failed");
            console.log(response.data)
            console.error("get User profile photo fail");
        }

        if (response.data !== null && response.data.status === "success") {
            //console.log("success");
            setProfile(response.data.payload.profile);

        }
    }
    useEffect(()=>{
        getUserInfo();
    })

    function showSuccessMessage(inputMessage) {
        toast.success(inputMessage, {
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

    function showFailMessage(inputMessage) {
        toast.error(inputMessage, {
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

    function handleContentChange(e) {
        setPostContent(e.target.value);
        setPostContentCount(e.target.value.length);
        if (postContentCount === 0 || postContentCount > 200) {
            setDisablePostButton(true);
        } else {
            setDisablePostButton(false);
        }
    }

    async function createPost(inputContent) {
        try {
            const response = await axios({
                method: "post",
                url: "http://localhost:8765/api/insertPost",
                headers: {
                    Authorization: localStorage.getItem("Token"),
                },
                data: {
                    id: null,
                    userId: localStorage.getItem("UserID"),
                    userName: localStorage.getItem("UserName"),
                    content: inputContent,
                    image: file64StringWithType,
                    createdAt: null,
                    like: null,
                    share: null,
                    comment: null,
                },
            });
            console.log(response.data)
            if (response.data !== null && response.data.status === "success") {
                showSuccessMessage("Posted successfully!");
                setPostContent("");
                setPostContentCount(0);
                setDisablePostButton(true);
                setFile64String(null);
                setFile64StringWithType(null);
            }

            if (response.data !== null && response.data.status === "fail") {
                showFailMessage("Post failed. Please try again later!");
            }
        } catch (error) {
            showFailMessage("Post failed. Please try again later!");
        }
    }

    function onUploadFileChange(e) {
        setFile64String(null);
        if (e.target.files < 1 || !e.target.validity.valid) {
            return;
        }
        compressImageFile(e);
    }

    function fileToBase64(file, cb) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(null, reader.result);
        };
        reader.onerror = function (error) {
            cb(error, null);
        };
    }

    async function compressImageFile(event) {
        const imageFile = event.target.files[0];

        const options = {
            maxWidthOrHeight: 250,
            useWebWorker: true,
        };
        try {
            const compressedFile = await imageCompression(imageFile, options);
            // input file is compressed in compressedFile, now write further logic here

            fileToBase64(compressedFile, (err, result) => {
                if (result) {
                    setFile(result);
                    //   console.log(file);
                    //   console.log(String(result.split(",")[1]));
                    setFile64StringWithType(result);
                    setFile64String(String(result.split(",")[1]));
                }
            });
        } catch (error) {
            setFile64String(null);
            // console.log(error);
        }
    }

    async function handleCreatePost(e) {
        e.preventDefault();
        await createPost(postContent);
        dispatch(getFollowingPosts());
    }

    return(
        <>
            <ToastContainer />
            <div className="rounded-lg bg-white flex flex-col p-3 px-4 shadow">
                <div className="items-center space-x-2 border-b pb-3 mb-2">
                    <div>
                        <form>
                        <div className="flex items-center space-x-2 border-b pb-3 mb-2">

                            <div className="w-10 h-10"><img src={profile}
                                                            className="w-full h-full rounded-full"
                                                            alt="dp"/></div>

                            <input placeholder="Content here" value={postContent} onChange={handleContentChange}
                                className="hover:bg-gray-200 focus:bg-gray-300 p-2 focus:outline-none flex-grow bg-gray-100 text-gray-500 text-left w-full">
                            </input>
                        </div>
                        <div className="flex space-x-3 font-thin text-sm text-gray-600 -mb-1">
                            <input className={
                                "file:mr-4 file:py-2 file:px-4\n" +
                                "      file:rounded-full file:border-0\n" +
                                "      file:text-sm file:font-semibold\n" +
                                "      file:bg-violet-50 file:text-violet-700\n" +
                                "      hover:file:bg-violet-100"
                            } type="file" id={"file"} accept="image/*" multiple onChange={onUploadFileChange} />
                            <label htmlFor={"file"}></label>

                            {/*<Button className="flex-1 flex items-center h-8 focus:outline-none focus:bg-gray-200 justify-center space-x-2 hover:bg-gray-100 rounded-md">*/}
                            {/*    <div><i className="far fa-smile text-yellow-500"></i></div>*/}
                            {/*    <div><p className="font-semibold">Photo</p></div>*/}
                            {/*</Button>*/}


                            {/*<button*/}
                            {/*    className="flex-1 flex items-center h-8 focus:outline-none focus:bg-gray-200 justify-center space-x-2 hover:bg-gray-100 rounded-md">*/}
                            {/*    <div><i className="far fa-smile text-yellow-500"></i></div>*/}
                            {/*    <div><p className="font-semibold">Send</p></div>*/}
                            {/*</button>*/}
                            <Button onClick={handleCreatePost} disabled={disablePostButton}
                                className="flex-1 flex items-center h-8 focus:outline-none focus:bg-gray-200 justify-center space-x-2 hover:bg-gray-100 rounded-md">
                                <div><i className="far fa-smile text-yellow-500"></i></div>
                                <div><p className="font-semibold">Send</p></div>
                            </Button>
                            <span>Characters: {postContentCount}/200</span>
                        </div>
                        </form>
                        {file64String !== null ? (
                            <img src={file64StringWithType} alt="chosen" />
                        ) : (
                            <span></span>
                        )}

                    </div>
                </div>
            </div>
        </>
    )

}

export default NewPost;
