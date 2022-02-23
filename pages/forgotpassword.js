import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import {PF} from '../url'

export default function Forgotpassword() {

  const email = useRef()

  const [success, setSuccess] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [submitting, setSubmitiing] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault();

    setSubmitiing(true)

    // removes error message after 3 seconds
    const timeOut = () => {
      setTimeout(() => {
        setSuccess(false)
        setEmailError(false)
      }, 3000)
    }

    const newUser = {
      email: email.current.value,
    }

    try {
      const res = await axios.post(`${PF}api/user/forgotpassword`, newUser)
      setSubmitiing(false)
      setEmailError(false)
      setSuccess(true)
      timeOut()
    } catch (err) {
      setSubmitiing(false)
      setSuccess(false)
      setEmailError(true)
      timeOut()
      console.log(err)
    }

  }
    
  return (
    <div className="relative overflow-x-hidden min-h-screen ">
        <div className="h-[100%] -z-10 w-screen absolute ">
            <Image src={PF + "registerbg.jpg"} className="opacity-30" layout="fill" objectFit="cover" />
        </div>

        <Topbar />
          <div className="my-40 w-[96%] max-w-[600px] mx-auto shadow-sm z-50 bg-opacity-80 border bg-white rounded-md p-2 md:px-5">
          <h1 className="font-semibold text-xl text-center my-5 text-gray-600">email</h1>
          {/* credentials error message */}
          {emailError && <p className="bg-red-400 text-xs md:text-md my-2 text-white font-semibold p-2 w-full rounded-sm text-center">Enter the email you registered with your account</p>}
          {success && <p className="bg-green-500 text-xs md:text-md my-2 text-white font-semibold p-2 w-full rounded-sm text-center">Passsword reset link has been sent to your email</p>}
            <form onSubmit={handleSubmit} className=" flex flex-col items-center justify-center gap-2 pb-10">
                <input ref={email} required type="email" placeholder="Enter your email" className="focus:ring-0 focus:outline-none bg-transparent border border-gray-300 rounded-md w-full mx-auto block p-1 text-gray-600" />
                <button type="submit" className="p-2 w-full bg-blue-500 font-semibold text-white hover:border border-gray-500 rounded-md hover:bg-white my-3 hover:text-black">{submitting ? 'Submitting...' : 'Submit'}</button>
                <Link href="/register">
                    <a><p className="text-xs md:text-sm text-gray-500">Dont have an account?</p></a>
                </Link>
            </form>
          </div>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  )
}
