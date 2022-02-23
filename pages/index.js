import Image from "next/image";
import About from "../components/About";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import {PF} from '../url'

export default function Home() {

  return (
    <div className="min-h-screen overflow-x-hidden ">
      <Hero />
      <div className="relative">
        <div className="h-[100%] -z-10 w-screen absolute -top-10">
          <Image alt='bg' src={PF + "registerbg.jpg"} className="opacity-10" layout="fill" objectFit="cover" />
        </div>
        <About />
        <Footer />
      </div>
    </div>
  )
}
