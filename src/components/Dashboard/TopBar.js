import {Badge} from "@mui/material";
import {AiOutlineMail} from "react-icons/ai";


const TopBar = () => {
    return(
        <nav className='bg-white border-gray-200 px-2 py-2.5 rounded dark:bg-gray-800'>
            <div className='container flex justify-between items-center mx-auto'>
                <div className='top-0 right-0 clear-right' >

                    <Badge badgeContent={4} color="primary">
                        <AiOutlineMail color="action" size={30}/>
                    </Badge>
                </div>

            </div>
        </nav>
    )
}


export default TopBar;
