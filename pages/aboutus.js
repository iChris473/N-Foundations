import Image from "next/image";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import {VURL} from '../vercelurl'


export default function Aboutus() {

  return (
      <div className="relative min-h-screen">
        <div className="h-[100%] -z-10 w-screen absolute ">
            <Image alt="bg" src={VURL + "registerbg.jpg"} className="opacity-20" layout="fill" objectFit="cover" />
        </div>
          <Topbar />
          <div className="py-32">
              <h2 className="py-10 text-gray-700 text-2xl font-semibold text-center">ABOUT US</h2>
              <div className="shadow-md rounded-md p-2 border w-[96%] md:w-4/5 max-w-[800px] mx-auto mb-10">
                  <div className="flex flex-col p-2 items-center justify-center b">
                      <Image alt="logo" src={PF + "foundation.png"} height="100px" width="150px" />
                      <div className="my-5">
                          <p className="text-left text-sm md:text-md space">Lorem ipsum dolor sit amet, consectetur adipisicing elit.Sapiente recusandae in architecto, dolores animi odio ipsa, voluptatem qui praesentium rem, saepe non libero aliquam doloremque nulla veritatis aut?Ea qui accusamus laborum aliquam?Consequuntur deserunt praesentium eum sint, optio labore similique accusantium maxime!Accusantium aspernatur animi voluptatum cum fugiat pariatur provident ratione!Perspiciatis quod magni non at, iure ratione tempora numquam harum eos quaerat eius explicabo enim eligendi qui et exercitationem minus, natus dolorem vero temporibus ex!Pariatur a amet incidunt laudantium, animi, dolore quibusdam ullam minus cumque ad sapiente.Aperiam itaque voluptate ipsam repudiandae voluptatum, obcaecati eum sequi dolorem.
                          </p>
                      </div>
                  </div>
              </div>
          </div>
            <Footer />
        </div>
  )
}
