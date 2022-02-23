import Image from "next/image"
import Link from "next/link"
import {CogIcon} from "@heroicons/react/solid"
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/AuthContext";
import { useRouter } from "next/router";
import Dropdown from "./Dropdown";
import {VURL} from '../vercelurl'

export default function Topbar() {

    const {user, dispatch} = useContext(AuthContext)
    const router = useRouter();
    const [openDropdown, setOpenDropdown] = useState(false)
    
    const handleSignOut = () => {
        dispatch({type: "LOGIN_SUCCESS", payload:null})
        router.push('/')

    }
    
    
  return (
      <div>
          <div className="bg-gray-300 bg-opacity-60 p-5 border-b border-gray-200 absolute top-0 w-full z-50">
              <div className="flex flex-col md:flex-row items-end md:items-center md:justify-between">
                  <div className="flex pr-[20%] items-center justify-center gap-2 bg-green-500s">
                      <Link href="/">
                          <a>
                              <Image alt="logo" src={VURL + "foundation.png"} height="50px" width="70px" />
                          </a>
                      </Link>
                      <Link href="/">
                          <a>
                              <p className="text-xl text-gray-800 font-bold font-serif">ND FOUNDATIONS</p>
                          </a>
                      </Link>
                  </div>
                  {user ?  
                      (<div className="flex items-center justify-center gap-2 bg-blue-500s ">
                        <p onClick={handleSignOut} className="text-md border cursor-pointer border-white p-1 rounded-md font-serif font-bold text-black">SIGN OUT</p>
                        <Link href="/profile">
                            <a>
                                <p className="text-md border cursor-pointer border-white p-1 rounded-md font-serif font-bold text-black">PROFILE</p>
                            </a>
                        </Link>
                        <div className="relative">
                          <CogIcon onClick={() => setOpenDropdown(!openDropdown)} className="h-6 text-black cursor-pointer" />
                          {openDropdown && <Dropdown />}
                        </div>
                  </div>) :
                  (<div className="flex items-center justify-center gap-2 bg-blue-500s ">
                  <Link href="/signin">
                      <a>
                      <p className="text-md border cursor-pointer border-white p-1 rounded-md font-serif font-bold text-black">SIGN IN</p>
                      </a>
                  </Link>
                  <Link href="/register">
                      <a>
                          <p className="text-md border cursor-pointer border-white p-1 rounded-md font-serif font-bold text-black">REGISTER</p>
                      </a>
                  </Link>
                  </div>)
                  }
              </div>
          </div>
      </div>
  )
}
