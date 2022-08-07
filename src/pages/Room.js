import Layout from "../components/Dashboard/Layout";

export default function Room(){
    return(
        <>
            <Layout>
                <div className="flex flex-col justify-between w-full h-full p-5 mx-4">
                    <div className="flex flex-row justify-between">
                        <h1 className="text-2xl text-white">
                            Room Name
                        </h1>
                    </div>
                    <img src="https://picsum.photos/783/300" className="object-cover w-full h-1/2 rounded-3xl"/>
                    <div className="flex flex-row items-center justify-between w-full h-1/4">
                        <img src="https://picsum.photos/200/101" className="object-cover w-full h-1/2 rounded-3xl"/>
                        <img src="https://picsum.photos/200/102" className="object-cover w-full h-1/2 rounded-3xl"/>
                        <img src="https://picsum.photos/200/103" className="object-cover w-full h-1/2 rounded-3xl"/>
                    </div>
                    <div className="flex flex-row justify-between w-full h-auto px-2 py-3 text-white rounded-2xl bg-black">
                        <div className="flex items-center justify-center w-11 h-10 p-2 border-2 border-stone-600 rounded-2xl">
                            <h1>Share</h1>
                        </div>
                        <div className="flex items-center justify-center w-20 h-10 p-2 border-2 border-stone-600 rounded-2xl">
                            <h1>WebCam</h1>
                        </div>
                        <div className="flex items-center justify-center w-11 h-10 p-2 border-2 border-stone-600 rounded-2xl">
                            <h1>Exit</h1>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
