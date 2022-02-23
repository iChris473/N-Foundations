import Image from "next/image";
import Link from "next/link";
import {PF} from '../url'


export default function About() {
  return (
    <div className="mt-10 mb-32">
        <h2 className="my-10 text-gray-700 text-2xl font-semibold text-center">ABOUT US</h2>
      <div className="shadow-md rounded-md p-2 border w-[96%] md:w-4/5 max-w-[800px] mx-auto mb-10">
          <div className="flex flex-col p-2 items-center justify-center b">
               <Image src={PF + "foundation.png"} height="100px" width="150px" />
               <div className="my-5">
                   <p className="text-left text-sm md:text-md ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem quas vitae qui eaque similique quasi numquam mollitia obcaecati. Quo, non... 
                   <Link href="/aboutus">
                     <a> <span className="bg-gray-500 m-3 p-[3px] text-xs rounded-md text-white">See more</span>
                     </a>
                   </Link> </p>
               </div>
          </div>
      </div>
    </div>
  )
}
