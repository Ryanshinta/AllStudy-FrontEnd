import SideBarIcon from "./SideBarIcon";

export default function SideBar(){


    return(
        <div className="fixed top-0 left-0 h-screen w-32 flex flex-col bg-white dark:bg-gray-900 shadow-lg">
            <SideBarIcon icon={1} text={2}>

            </SideBarIcon>

        </div>
    )
}
