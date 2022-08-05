import Layout from "../components/Dashboard/Layout";
import Button from "@mui/material/Button";

export default function RoomNavigation(){
    return(
        <>
            <Layout>

                <div className="mt-5 mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="relative flex flex-col overflow-hidden rounded-2xl bg-white text-gray-600 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg">
                        <div className="flex justify-center flex-col space-y-2 p-4">
                            Group focus(50min)
                        </div>
                        <div className="mt-4 flex grow flex-col p-4">
                            <p className="text-sm">Join and start studying right away with the community!</p>
                        </div>
                        <div className="flex gap-2 px-4 pb-4">
                            <div className="btn btn-md group w-full bg-primary px-2.5 pr-4 text-white">
                                <Button variant="contained" color="primary" >Join Room</Button>
                            </div>
                        </div>
                    </div>



                    <div className="relative flex flex-col overflow-hidden rounded-2xl bg-white text-gray-600 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg">
                        <div className="flex justify-center flex-col space-y-2 p-4">
                            Group focus(50min)
                        </div>
                        <div className="mt-4 flex grow flex-col p-4">
                            <p className="text-sm">Join and start studying right away with the community!</p>
                        </div>
                        <div className="flex gap-2 px-4 pb-4">
                            <div className="btn btn-md group w-full bg-primary px-2.5 pr-4 text-white">
                                <Button variant="contained" color="primary" >Join Room</Button>
                            </div>
                        </div>
                    </div>

                    <div className="relative flex flex-col overflow-hidden rounded-2xl bg-white text-gray-600 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg">
                        <div className="flex justify-center flex-col space-y-2 p-4">
                            Group focus(50min)
                        </div>
                        <div className="mt-4 flex grow flex-col p-4">
                            <p className="text-sm">Join and start studying right away with the community!</p>
                        </div>
                        <div className="flex gap-2 px-4 pb-4">
                            <div className="btn btn-md group w-full bg-primary px-2.5 pr-4 text-white">
                                <Button variant="contained" color="primary" >Join Room</Button>
                            </div>
                        </div>
                    </div>



                </div>
            </Layout>
        </>
    )
}
