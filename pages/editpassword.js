import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../components/context/AuthContext";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import {PF} from '../url'

export default function Editpassword() {

  const {user, dispatch} = useContext(AuthContext)
  const router = useRouter()
    // navigates back to home page if theres no user
    useEffect(() => {
     !user && router.push('/')
    }, [user, router])

    const oldPassword = useRef()
    const newPassword = useRef()
    const confirmPassword = useRef()

    // check passwords state
    const [passwordError, setPasswordError] = useState(false)
    const [oldPasswordError, setOldPasswrdError] = useState(false)
    const [submitting, setSubmitiing] = useState(false)
    const [success, setSuccess] = useState(false)


    const handleSubmit = async e => {

      e.preventDefault();
      setSubmitiing(true)

      const timeOut = () => {
        setTimeout(() => {
          setPasswordError(false)
          setOldPasswrdError(false)
          setSuccess(false)
        }, 3000)
      }  

      if(newPassword.current.value === confirmPassword.current.value){
        const newUser = {
          userID: user._id,
          oldPassword: oldPassword.current.value,
          password: confirmPassword.current.value
        }

        try {
          const res = await axios.put(`${PF}api/user/update/${user._id}`, newUser)
          setSubmitiing(false)
          setPasswordError(false)
          setOldPasswrdError(false)
          setSuccess(true)
          timeOut()
          oldPassword.current.value = ''
          newPassword.current.value = ''
          confirmPassword.current.value = ''
        } catch (err) {
          setSubmitiing(false)
          setOldPasswrdError(true)
        }
      } else {
          setSubmitiing(false)
          setPasswordError(true)
          timeOut()
        }
    }

  return (
    <div className="relative overflow-x-hidden min-h-screen ">
        <div className="h-[100%] -z-10 w-screen absolute ">
            <Image alt='bg' src={PF + "registerbg.jpg"} className="opacity-30" layout="fill" objectFit="cover" />
        </div>
        <Topbar />
          <div className="my-40 w-[96%] max-w-[600px] mx-auto shadow-sm z-50 bg-opacity-80 border bg-white rounded-md p-2 md:px-5">
            <h1 className="font-semibold text-xl text-center my-5 text-gray-600">Change  Password</h1>
            {/* password error message */}
            {passwordError ? (<p className="bg-red-400 my-2 text-white font-semibold p-2 w-full rounded-sm text-center">passwords doesn't match</p>) : (oldPasswordError && (<p className="bg-red-400 my-2 text-white font-semibold p-2 w-full rounded-sm text-center">Enter correct old password</p>))}
            {success && (<p className="bg-green-500 my-2 text-white font-semibold p-2 w-full rounded-sm text-center">password has been successfully changed</p>)}
            <form onSubmit={handleSubmit} className=" flex flex-col items-center justify-center gap-2 pb-10">
                <input ref={oldPassword} required type="password" placeholder="Old Password" className="focus:ring-0 focus:outline-none bg-transparent border border-gray-300 rounded-md w-full  mx-auto block p-1 text-gray-600" />
                <input ref={newPassword} required type="password" placeholder="New Password" className="focus:ring-0 focus:outline-none bg-transparent border border-gray-300 rounded-md w-full  mx-auto block p-1 text-gray-600" />
                <input ref={confirmPassword} required type="password" placeholder="Confirm New Password" className="focus:ring-0 focus:outline-none bg-transparent border border-gray-300 rounded-md w-full  mx-auto block p-1 text-gray-600" />
                <button type="submit" className="p-2 w-full bg-blue-500 font-semibold text-white hover:border border-gray-500 rounded-md hover:bg-white hover:text-black">{ submitting ? 'updating...' : 'Update'}</button>
            </form>
          </div>
          <div className="absolute bottom-0 w-full">
            <Footer />
          </div>
    </div>
  )
}
