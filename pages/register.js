import Image from "next/image";
import { useContext, useRef, useState } from "react";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import axios from 'axios'
import { AuthContext } from "../components/context/AuthContext";
import { useRouter } from 'next/router';
import {PF} from '../url'
import {VURL} from '../vercelurl'

export default function Register() {

  const {dispatch} = useContext(AuthContext)
  const router = useRouter();

  //  Get All infos with use ref hook
  const firstName = useRef()
  const lastName = useRef()
  const middleName = useRef()
  const dob = useRef()
  const stateOfOrigin = useRef()
  const placeOfBirth = useRef()
  const institution = useRef()
  const grade = useRef()
  const email = useRef()
  const password = useRef()
  const confirmPassword = useRef()

  // check passwords state
  const [passwordError, setPasswordError] = useState(false)
  const [submitting, setSubmitiing] = useState(false)

  // sign up logic function
  const signUphandler = async e => {
    e.preventDefault();

    setSubmitiing(true)
    const timeOut = () => {
      setTimeout(() => {
        setPasswordError(false)
      }, 3000)
    }

    if(password.current.value === confirmPassword.current.value){
      // sign up function
      const newUser = {
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        middleName: middleName.current.value,
        dob: dob.current.value,
        stateOfOrigin: stateOfOrigin.current.value,
        placeOfBirth: placeOfBirth.current.value,
        institution: institution.current.value,
        grade: grade.current.value,
        email: email.current.value,
        password: confirmPassword.current.value
      }

      try {
        const res = await axios.post(PF+'api/user/create', newUser)
        console.log(res)
        setSubmitiing(false)
        dispatch({type: "LOGIN_SUCCESS", payload:res.data})
        router.push('/')
      } catch (err) {
        console.log(err)
        setSubmitiing(false)
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
            <Image alt='bg' src={VURL + "registerbg.jpg"} className="opacity-30" layout="fill" objectFit="cover" />
        </div>

        <Topbar />
          <div className="my-40 w-[96%] max-w-[600px] mx-auto shadow-sm z-50 bg-opacity-80 border bg-white rounded-md p-2 md:px-5">
          <h1 className="font-semibold text-xl text-center my-5 text-gray-600">Register for a grant</h1>
          {/* password error message */}
          {passwordError && <p className="bg-red-400 my-2 text-white font-semibold p-2 w-full rounded-sm text-center">passwords doesn't match</p>}
            <form onSubmit={signUphandler} className=" flex flex-col items-center justify-center gap-2 pb-10">
                <input ref={firstName} required type="text" placeholder="First Name" className="focus:ring-0 focus:outline-none bg-transparent border border-gray-300 rounded-md w-full mx-auto block p-1 text-gray-600" />
                <input ref={lastName} required type="text" placeholder="Last Name" className="focus:ring-0 focus:outline-none bg-transparent border border-gray-300 rounded-md w-full  mx-auto block p-1 text-gray-600" />
                <input ref={middleName} required type="text" placeholder="Middle Name" className="focus:ring-0 focus:outline-none bg-transparent border border-gray-300 rounded-md w-full mx-auto block p-1 text-gray-600" />
                <div className="border border-gray-300 rounded-md flex flex-col w-full">
                    <p className="text-xs text-gray-500 p-1">Date of birth</p>
                    <input ref={dob} required type="date" className="focus:ring-0 focus:outline-none bg-transparent  rounded-md w-full mx-auto block p-1 text-gray-600" />
                </div>
                <input ref={stateOfOrigin} required type="text" placeholder="State of Origin" className="focus:ring-0 focus:outline-none bg-transparent border border-gray-300 rounded-md w-full mx-auto block p-1 text-gray-600" />
                <input ref={placeOfBirth} required type="text" placeholder="Place of birth" className="focus:ring-0 focus:outline-none bg-transparent border border-gray-300 rounded-md w-full mx-auto block p-1 text-gray-600" />
                <input ref={institution} required type="text" placeholder="Name of Institutuion Attended" className="focus:ring-0 focus:outline-none bg-transparent border border-gray-300 rounded-md w-full mx-auto block p-1 text-gray-600" />
                <select ref={grade} name="grades" id="" className="focus:ring-0 focus:outline-none bg-transparent border border-gray-300 rounded-md w-full mx-auto block p-1 text-gray-600">
                    <option value="select">Select graduation grade</option>
                    <option value="First Class">First Class</option>
                    <option value="Second Class Upper">Second Class Upper</option>
                    <option value="Second Class Lower">Second Class Lower</option>
                    <option value="Third Class">Third Class</option>
                </select>
                <input ref={email} required type="email" placeholder="email" className="focus:ring-0 focus:outline-none bg-transparent border border-gray-300 rounded-md w-full mx-auto block p-1 text-gray-600" />
                <input ref={password} required type="password" placeholder="Create Password" className="focus:ring-0 focus:outline-none bg-transparent border border-gray-300 rounded-md w-full mx-auto block p-1 text-gray-600" />
                <input ref={confirmPassword} required type="password" placeholder="confirm Password" className="focus:ring-0 focus:outline-none bg-transparent border border-gray-300 rounded-md w-full mx-auto block p-1 text-gray-600" />
                <button type="submit" className="p-2 w-full bg-blue-500 font-semibold text-white hover:border border-gray-500 rounded-md hover:bg-white hover:text-black">{submitting ? 'Registering...' : 'Register'}</button>
            </form>
          </div>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  )
}
