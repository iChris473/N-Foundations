import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import {  useRef, useState } from "react";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import Link from "next/link";
import {VURL} from '../vercelurl'
import {PF} from '../url'


export default function Resetpassword() {

    const { query } = useRouter();
    const newPassword = useRef()
    const confirmPassword = useRef()

    // check passwords state

    const [success, setSuccess] = useState(false)
    const [passwordError, setPasswordError] = useState(false)


    const handleSubmit = async e => {

      e.preventDefault();


      if(newPassword.current.value === confirmPassword.current.value){
        const newUser = {
          password: confirmPassword.current.value
        }

        try {
          await axios.put(PF+`api/user/resetpassword?resettoken=${query.resettoken}`, newUser)
          setPasswordError(false)
          setSuccess(true)
          newPassword.current.value = ''
          confirmPassword.current.value = ''
        } catch (err) {
          setPasswordError(true)
          setSuccess(false)
        }
      } else {
        }
    }

  return (
    <div className="relative overflow-x-hidden min-h-screen ">
        <div className="h-[100%] -z-10 w-screen absolute ">
            <Image alt='bg' src={VURL + "registerbg.jpg"} className="opacity-30" layout="fill" objectFit="cover" />
        </div>
        <Topbar />
          <div className="my-40 w-[96%] max-w-[600px] mx-auto shadow-sm z-50 bg-opacity-80 border bg-white rounded-md p-2 md:px-5">
            <h1 className="font-semibold text-xl text-center my-5 text-gray-600">Change  Password</h1>
             {/* password error message */}

             {passwordError && (<p className="bg-red-400 my-2 text-white font-semibold p-2 w-full rounded-sm text-center">passwords doesn't match</p>)}

            {/* success error message */}
            {success && (<p className="bg-green-500 my-2 text-white font-semibold p-2 w-full rounded-sm text-center">password has been successfully changed</p>)}
            <form onSubmit={handleSubmit} className=" flex flex-col items-center justify-center gap-2 pb-10">
                <input ref={newPassword} required type="password" placeholder="New Password" className="focus:ring-0 focus:outline-none bg-transparent border border-gray-300 rounded-md w-full  mx-auto block p-1 text-gray-600" />
                <input ref={confirmPassword} required type="password" placeholder="Confirm New Password" className="focus:ring-0 focus:outline-none bg-transparent border border-gray-300 rounded-md w-full  mx-auto block p-1 text-gray-600" />
                { success ?
                    (
                    <Link href="/signin">
                        <a><button  className="p-2 w-full font-semibold border border-gray-500 rounded-md bg-white text-black">Login</button></a>
                    </Link>
                    ) :
                 (<button type="submit" className="p-2 w-full bg-green-500 text-white font-semibold hover:border border-gray-500 rounded-md">Update</button>)}
            </form>
          </div>
          <div className="absolute bottom-0 w-full">
            <Footer />
          </div>
    </div>
  )
}
