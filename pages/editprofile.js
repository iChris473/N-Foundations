import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../components/context/AuthContext";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import {PF} from '../url'


export default function Editprofile() {

  const {user, dispatch} = useContext(AuthContext)
  const router = useRouter();
  const [submitting, setSubmitiing] = useState(false)
  const [success, setSuccess] = useState(false)

    // navigates back to home page if theres no user
    useEffect(() => {
     !user && router.push('/')
    }, [])

  //  Get All infos with use ref hook
  const firstName = useRef()
  const lastName = useRef()
  const middleName = useRef()
  const dob = useRef()
  const stateOfOrigin = useRef()
  const placeOfBirth = useRef()
  const institution = useRef()
  const grade = useRef()

  const handleSubmit = async e => {
    e.preventDefault()

    let userid = user._id

    setSubmitiing(true)

    const timeOut = () => {
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    }  

    const newUser = {
      userID: user._id
    }

    firstName.current.value && (newUser.firstName = firstName.current.value) 
    lastName.current.value && (newUser.lastName = lastName.current.value) 
    middleName.current.value && (newUser.middleName = middleName.current.value) 
    dob.current.value && (newUser.dob = dob.current.value) 
    stateOfOrigin.current.value && (newUser.stateOfOrigin = stateOfOrigin.current.value) 
    placeOfBirth.current.value && (newUser.placeOfBirth = placeOfBirth.current.value) 
    institution.current.value && (newUser.institution = institution.current.value) 
    grade.current.value && (newUser.grade = grade.current.value) 
    console.log(newUser)
    try {
      const res = await axios.put(`${PF}api/user/update/${user._id}`, newUser)
      setSubmitiing(false)
      setSuccess(true)
      timeOut()
      // sign in user and set updated user to local storage
      const thisUser = await axios.get(`${PF}api/user/get/${userid}`)
      dispatch({type: "LOGIN_SUCCESS", payload:thisUser.data})
      
    } catch (err) {
      setSubmitiing(false)
    }

  }

  return (
    <div className="relative overflow-x-hidden min-h-screen ">
        <div className="h-[100%] -z-10 w-screen absolute ">
            <Image src={PF + "registerbg.jpg"} className="opacity-30" layout="fill" objectFit="cover" />
        </div>

        <Topbar />
          <div className="my-40 w-[96%] max-w-[600px] mx-auto shadow-sm z-50 bg-opacity-80 border bg-white rounded-md p-2 md:px-5">
            <h1 className="font-semibold text-xl text-center my-5 text-gray-600">Edit Account</h1>
            {success && (<p className="bg-green-500 my-2 text-white font-semibold p-2 w-full rounded-sm text-center">Account Updated</p>)}
            <form onSubmit={handleSubmit} className=" flex flex-col items-center justify-center gap-2 pb-10">
                <input ref={firstName} type="text" placeholder={user?.firstName} className="focus:ring-0 focus:outline-none bg-transparent border border-gray-300 rounded-md w-full mx-auto block p-1 text-gray-600" />
                <input ref={lastName} type="text" placeholder={user?.lastName} className="focus:ring-0 focus:outline-none bg-transparent border border-gray-300 rounded-md w-full  mx-auto block p-1 text-gray-600" />
                <input ref={middleName} type="text" placeholder={user?.middleName} className="focus:ring-0 focus:outline-none bg-transparent border border-gray-300 rounded-md w-full mx-auto block p-1 text-gray-600" />
                <div className="border border-gray-300 rounded-md flex flex-col w-full">
                    <p className="text-xs text-gray-500 p-1">Date of birth</p>
                    <input ref={dob} type="date" defaultValue={user?.dob} className="focus:ring-0 focus:outline-none bg-transparent  rounded-md w-full mx-auto block p-1 text-gray-600" />
                </div>
                <input ref={stateOfOrigin} type="text" placeholder={user?.stateOfOrigin} className="focus:ring-0 focus:outline-none bg-transparent border border-gray-300 rounded-md w-full mx-auto block p-1 text-gray-600" />
                <input ref={placeOfBirth} type="text" placeholder={user?.placeOfBirth} className="focus:ring-0 focus:outline-none bg-transparent border border-gray-300 rounded-md w-full mx-auto block p-1 text-gray-600" />
                <input ref={institution} type="text" placeholder={user?.institution} className="focus:ring-0 focus:outline-none bg-transparent border border-gray-300 rounded-md w-full mx-auto block p-1 text-gray-600" />
                <select ref={grade} name="grades" id="" className="focus:ring-0 focus:outline-none bg-transparent border border-gray-300 rounded-md w-full mx-auto block p-1 text-gray-600">
                    <option value={user.grade}>{user.grade}</option>
                    <option value="First Class">First Class</option>
                    <option value="Second Class Upper">Second Class Upper</option>
                    <option value="Second Class Lower">Second Class Lower</option>
                    <option value="Third Class">Third Class</option>
                </select>
                <button 
                // disabled={!firstName && !lastName && !middleName && !dob && !stateOfOrigin && !placeOfBirth && !institution && !grade}
                type="submit" className="p-2 w-full bg-blue-500 font-semibold text-white hover:border border-gray-500 rounded-md hover:bg-white hover:text-black disabled:bg-gray-300">{submitting ? 'Making Changes...' : 'Update'}</button>
            </form>
          </div>
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  )
}
