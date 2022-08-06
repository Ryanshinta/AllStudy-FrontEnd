import Layout from "../components/Dashboard/Layout";


export default function Community() {
    return (
        <>
            <Layout>
                <div className="w-full h-full items-center">
                    <div className="w-full h-full grid grid-cols-7 justify-center">
                        <div className="col-span-2 flex justify-start ml-2">

                        </div>
                        <div className="col-span-3 h-full">
                            <div className="mt-6 w-full h-full pb-5 items-center">
                                <div className="rounded-lg bg-white flex flex-col p-3 px-4 shadow">
                                    <div className="items-center space-x-2 border-b pb-3 mb-2">
                                        <div>
                                            <div className="flex items-center space-x-2 border-b pb-3 mb-2">
                                                <div className="w-10 h-10"><img src="https://picsum.photos/200"
                                                                                className="w-full h-full rounded-full"
                                                                                alt="dp"/></div>
                                                <button
                                                    className="hover:bg-gray-200 focus:bg-gray-300 focus:outline-none flex-grow bg-gray-100 text-gray-500 text-left rounded-full w-full">What's
                                                    on your mind?
                                                </button>
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
                                <div className="mt-4 w-full h-full">
                                    <div className="grid grid-cols-1 gap-2">
                                        <div className="w-full shadow h-auto bg-white rounded-md">
                                            <div className="flex items-center space-x-2 p-2.5 px-4">
                                                <div className="w-10 h-10"><img src="https://picsum.photos/200"
                                                                                className="w-full h-full rounded-full"
                                                                                alt="dp"/></div>
                                                <div className="flex-grow flex flex-col"><p
                                                    className="font-semibold text-sm text-gray-700">User name
                                                </p><span
                                                    className="text-xs font-thin text-gray-400">6/8/2022 9:50</span>
                                                </div>
                                            </div>
                                            <div className="mb-1"><p
                                                className="text-gray-700 max-h-10 truncate px-3 text-sm">This is post
                                                caption</p></div>
                                            <div className="w-full h-76 max-h-80"><img
                                                src="https://picsum.photos/1920/1080" alt="postimage"
                                                className="w-full h-76 max-h-80"/></div>
                                            <div className="w-full flex flex-col space-y-2 p-2 px-4">
                                                <div
                                                    className="flex items-center justify-between pb-2 border-b border-gray-300 text-gray-500 text-sm">
                                                    <div className="flex items-center">
                                                        <button className="flex items-center">
                                                            <button
                                                                className="focus:outline-none flex items-center justify-center w-4 h-4 rounded-full bg-primary">
                                                                Like
                                                            </button>
                                                            <div className="ml-1"><p>129</p></div>
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <button>5 Comments</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full shadow h-auto bg-white rounded-md">
                                            <div className="flex items-center space-x-2 p-2.5 px-4">
                                                <div className="w-10 h-10"><img src="https://picsum.photos/200"
                                                                                className="w-full h-full rounded-full"
                                                                                alt="dp"/></div>
                                                <div className="flex-grow flex flex-col"><p
                                                    className="font-semibold text-sm text-gray-700">User name
                                                </p><span
                                                    className="text-xs font-thin text-gray-400">6/8/2022 9:50</span>
                                                </div>
                                            </div>
                                            <div className="mb-1"><p
                                                className="text-gray-700 max-h-10 truncate px-3 text-sm">This is post
                                                caption</p></div>
                                            <div className="w-full h-76 max-h-80"><img
                                                src="https://picsum.photos/1920/1080" alt="postimage"
                                                className="w-full h-76 max-h-80"/></div>
                                            <div className="w-full flex flex-col space-y-2 p-2 px-4">
                                                <div
                                                    className="flex items-center justify-between pb-2 border-b border-gray-300 text-gray-500 text-sm">
                                                    <div className="flex items-center">
                                                        <button className="flex items-center">
                                                            <button
                                                                className="focus:outline-none flex items-center justify-center w-4 h-4 rounded-full bg-primary">
                                                                Like
                                                            </button>
                                                            <div className="ml-1"><p>129</p></div>
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <button>5 Comments</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full shadow h-auto bg-white rounded-md">
                                            <div className="flex items-center space-x-2 p-2.5 px-4">
                                                <div className="w-10 h-10"><img src="https://picsum.photos/200"
                                                                                className="w-full h-full rounded-full"
                                                                                alt="dp"/></div>
                                                <div className="flex-grow flex flex-col"><p
                                                    className="font-semibold text-sm text-gray-700">User name
                                                </p><span
                                                    className="text-xs font-thin text-gray-400">6/8/2022 9:50</span>
                                                </div>
                                            </div>
                                            <div className="mb-1"><p
                                                className="text-gray-700 max-h-10 truncate px-3 text-sm">This is post
                                                caption</p></div>
                                            <div className="w-full h-76 max-h-80"><img
                                                src="https://picsum.photos/1920/1060" alt="postimage"
                                                className="w-full h-76 max-h-80"/></div>
                                            <div className="w-full flex flex-col space-y-2 p-2 px-4">
                                                <div
                                                    className="flex items-center justify-between pb-2 border-b border-gray-300 text-gray-500 text-sm">
                                                    <div className="flex items-center">
                                                        <button className="flex items-center">
                                                            <button
                                                                className="focus:outline-none flex items-center justify-center w-4 h-4 rounded-full bg-primary">
                                                                Like
                                                            </button>
                                                            <div className="ml-1"><p>129</p></div>
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <button>5 Comments</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
