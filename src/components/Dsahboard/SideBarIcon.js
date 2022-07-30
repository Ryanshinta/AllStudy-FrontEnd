





export default function SideBarIcon({
    icon,
    text})
{
    return (
        <div className="sidebarIcon group">
            {icon}
            <span className="">
                {text}
            </span>
        </div>
    )
}
