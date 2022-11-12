import {useDispatch} from "react-redux";
import {useState} from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import {getFollowingPosts} from "../../feature/followingPostSlice";
import imageCompression from "browser-image-compression";

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
                url: "http://localhost:8765/api/insertpost",
                headers: {
                    Authorization: localStorage.getItem("Token"),
                },
                data: {
                    id: null,
                    userId: localStorage.getItem("UserId"),
                    content: inputContent,
                    image: file64StringWithType,
                    createdAt: null,
                    like: null,
                    share: null,
                    comment: null,
                },
            });
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

                        <div className="flex items-center space-x-2 border-b pb-3 mb-2">
                            <div className="w-10 h-10"><img src="https://picsum.photos/200"
                                                            className="w-full h-full rounded-full"
                                                            alt="dp"/></div>
                            <input
                                className="hover:bg-gray-200 focus:bg-gray-300 p-2 focus:outline-none flex-grow bg-gray-100 text-gray-500 text-left w-full">
                            </input>
                        </div>


                        <div className="flex space-x-3 font-thin text-sm text-gray-600 -mb-1">
                            <button
                                className="flex-1 flex items-center h-8 focus:outline-none focus:bg-gray-200 justify-center space-x-2 hover:bg-gray-100 rounded-md">
                                <div><i className="fas fa-images text-green-500"></i></div>
                                <div><p className="font-semibold">Add Photos/Video</p></div>
                            </button>
                            <button
                                className="flex-1 flex items-center h-8 focus:outline-none focus:bg-gray-200 justify-center space-x-2 hover:bg-gray-100 rounded-md">
                                <div><i className="far fa-smile text-yellow-500"></i></div>
                                <div><p className="font-semibold">Send</p></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default NewPost;