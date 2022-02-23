import {ArrowLeftIcon, ArrowRightIcon, UserGroupIcon} from "@heroicons/react/outline"
import Image from "next/image"
import { useState } from "react"
import Topbar from "./Topbar";
import {PF} from '../url'

export default function Hero() {

  const imagesURL = ["bg.jpg", "bg2.jpg", "bg3.jpg", "bg4.jpg", "bg5.jpg"];
  const [imgName, setImgName] = useState(imagesURL[0])

  const handleLeftSlide = () => {
    const newImg = imagesURL.indexOf(imgName);
    (newImg == 0) ? setImgName(imagesURL[imagesURL.length - 1]) : setImgName(imagesURL[newImg - 1]);
  }

  const handleRightSlide = () => {
    const newImg = imagesURL.indexOf(imgName);
    (newImg == imagesURL.length - 1) ? setImgName(imagesURL[0]) : setImgName(imagesURL[newImg + 1]);
  }

  return (
    <div className="relative">
      {/* Topbar */}
      <Topbar />
      {/* slider */}
      <div className="relative">
            <ArrowLeftIcon onClick={handleLeftSlide} className="cursor-pointer h-6 md:h-8 text-gray-500 absolute left-0 top-[50%] z-20 bg-white md:ml-2 rounded-lg" />
            <ArrowRightIcon onClick={handleRightSlide}  className="h-6 md:h-8 text-gray-500 absolute right-0 top-[50%] z-20 bg-white ml-2 rounded-lg cursor-pointer md:mr-2" />
          <div className="h-screen w-screen relative ">
              <Image src={PF + imgName} className="opacity-80" layout="fill" objectFit="cover" />
          </div>
      </div>
      <div className="absolute top-[40%] shadow-sm z-10 border bg-white bg-opacity-60 rounded-md p-2 m-2 md:left-[20%] w-[95%] md:w-1/2">
        <h2 className="text-2xl font-semibold mb-5 mt-2">NDUBUISI FOUNDATIONS</h2>
        <p className="text-sm md:text-md md:mb-2 pt-2">Empowering young Africans to find their purpose in life and helping to live thier best life in a very difficult economy Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus quis cumque corrupti quae, atque sint? Quae cupiditate mollitia quaerat repellat maiores unde quibusdam excepturi architecto obcaecati officia. Quo, deleniti natus.</p>
      </div>
    </div>
  )
}
