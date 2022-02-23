import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../components/context/AuthContext";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import {PF} from '../url'

export default function Profile() {

  const {user} = useContext(AuthContext)
  const router = useRouter();

    // navigates back to home page if theres no user
    useEffect(() => {
     !user && router.push('/')
    }, [])

  return (
    <div className="relative overflow-x-hidden min-h-screen ">
        <div className="h-[100%] -z-10 w-screen absolute ">
            <Image src={PF + "registerbg.jpg"} className="opacity-30" layout="fill" objectFit="cover" />
        </div>

        <Topbar />
          <div className="my-40 w-[96%] max-w-[600px] mx-auto shadow-sm z-50 bg-opacity-80 border bg-white rounded-md p-2 md:px-5">
            <h1 className="font-semibold text-xl text-center my-5 text-gray-600">Hi Christian</h1>
            <div className=" flex flex-col items-center justify-center gap-2 pb-10">
                <div className="border border-gray-300 rounded-md w-full mx-auto flex justify-between p-1 !px-3 text-gray-600"> <span className="text-sm">First Name:</span> <p>{user?.firstName}</p> </div>
                <div className="border border-gray-300 rounded-md w-full mx-auto flex justify-between p-1 !px-3 text-gray-600"><span className="text-sm">Last Name:</span> <p>{user?.lastName}</p> </div>
                <div className="border border-gray-300 rounded-md w-full mx-auto flex justify-between p-1 !px-3 text-gray-600"> <span className="text-sm">Middle Name:</span> <p>{user?.middleName}</p> </div>
                <div className="border border-gray-300 rounded-md w-full mx-auto flex justify-between p-1 !px-3 text-gray-600"> <span className="text-sm">Date of birth:</span> <p>{user?.dob}</p></div>
                <div className="border border-gray-300 rounded-md w-full mx-auto flex justify-between p-1 !px-3 text-gray-600"><span className="text-sm">State of Origin:</span> <p>{user?.stateOfOrigin}</p></div>
                <div className="border border-gray-300 rounded-md w-full mx-auto flex justify-between p-1 !px-3 text-gray-600"><span className="text-sm">Place of Birth:</span> <p>{user?.placeOfBirth}</p></div>
                <div className="border border-gray-300 rounded-md w-full mx-auto flex justify-between p-1 !px-3 text-gray-600"><span className="text-sm">Institution Attended:</span> <p>{user?.institution}</p></div>
                <div className="border border-gray-300 rounded-md w-full mx-auto flex justify-between p-1 !px-3 text-gray-600"><span className="text-sm">Grade:</span> <p>{user?.grade}</p></div>
                <Link href="/editprofile">
                      <a className="w-full"><button className="p-2 w-full bg-blue-500 font-semibold text-white hover:border border-gray-500 rounded-md hover:bg-white hover:text-black">Edit Profile</button></a>
                </Link>
            </div>
          </div>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  )
}
