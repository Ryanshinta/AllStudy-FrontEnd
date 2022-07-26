import {Link} from 'react-router-dom';

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    return(
        <div className="mb-10 ">
            <div className="flex justify-center">
                <img
                    alt=""
                    className="h-14 w-30"
                    src={require('../../assets/Logo.png')}
                />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extra bold text-gray-900 font-medium">
                {heading}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 mt-5">
            {paragraph} {' '}
            <Link to={linkUrl} className="font-medium text-purple-700 hover:text-purple-400">
                {linkName}
            </Link>
            </p>
            <div className="text-sm text-center">
                <a href="#/ForgotPassword" className="font-medium text-purple-700 hover:text-purple-400">
                    Forgot your password?
                </a>
            </div>
        </div>
    )
}
