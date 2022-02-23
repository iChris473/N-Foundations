import { MailIcon, PencilAltIcon } from "@heroicons/react/solid";
import Link from "next/link";



export default function Dropdown() {
  return (
    <div className="">
      <div className="absolute bg-gray-100 w-[200px] bg-opacity-90  rounded-md z-50 top-10 p-3 right-1 space-y-3">
        <Link href="/editpassword">
            <a className="flex items-center space-x-3 hover:bg-opacity-50 hover:bg-gray-300 rounded-md p-2 w-full"><span><PencilAltIcon className="h-7 text-green-500" /></span><p className="font-semibold text-gray-800 text-sm sm:text-md">Change Password</p></a>
        </Link>
        <Link href="/editemail">
            <a className="flex items-center space-x-3 hover:bg-opacity-50 hover:bg-gray-300 rounded-md p-2 w-full"><span><MailIcon className="h-7 text-green-500" /></span><p className="font-semibold text-gray-800 text-sm sm:text-md">Change Email</p></a>
        </Link>
      </div>
    </div>
  )
}
